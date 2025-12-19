import { useState, useEffect, useCallback } from 'react';
import { getDailyJourney, findCountryByName, Country, europeCountries } from '@/data/europeCountries';
import { Guess } from '@/components/GuessList';

interface GameState {
  origin: Country;
  destination: Country;
  guesses: Guess[];
  gameOver: boolean;
  won: boolean;
  correctPath: string[];
}

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

const MAX_GUESSES = 7;

// Simple BFS to find if a country is on ANY shortest path
const findShortestPaths = (origin: string, destination: string): Set<string> => {
  const countriesOnPath = new Set<string>();
  
  // BFS from origin
  const queue: { country: string; path: string[] }[] = [{ country: origin, path: [origin] }];
  const visited = new Set<string>();
  let shortestLength = Infinity;
  
  while (queue.length > 0) {
    const { country, path } = queue.shift()!;
    
    if (path.length > shortestLength) continue;
    
    if (country === destination) {
      if (path.length <= shortestLength) {
        shortestLength = path.length;
        path.forEach(c => countriesOnPath.add(c));
      }
      continue;
    }
    
    if (visited.has(country) && path.length > 1) continue;
    visited.add(country);
    
    const countryData = europeCountries.find(c => c.name === country);
    if (!countryData) continue;
    
    for (const neighbor of countryData.neighbors) {
      if (!path.includes(neighbor)) {
        queue.push({ country: neighbor, path: [...path, neighbor] });
      }
    }
  }
  
  return countriesOnPath;
};

const loadStats = (): Stats => {
  try {
    const saved = localStorage.getItem('eurojourneyStats');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load stats', e);
  }
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0, 0, 0]
  };
};

const saveStats = (stats: Stats) => {
  try {
    localStorage.setItem('eurojourneyStats', JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const journey = getDailyJourney();
    const pathCountries = findShortestPaths(journey.origin.name, journey.destination.name);
    return {
      origin: journey.origin,
      destination: journey.destination,
      guesses: [],
      gameOver: false,
      won: false,
      correctPath: Array.from(pathCountries)
    };
  });

  const [stats, setStats] = useState<Stats>(loadStats);

  const makeGuess = useCallback((countryName: string) => {
    if (gameState.gameOver) return;

    const country = findCountryByName(countryName);
    if (!country) return;

    // Check if already guessed
    if (gameState.guesses.some(g => g.country.toLowerCase() === countryName.toLowerCase())) {
      return;
    }

    const isOnPath = gameState.correctPath.includes(country.name);
    const newGuess: Guess = {
      country: country.name,
      isCorrect: country.name === gameState.destination.name,
      isOnPath
    };

    const newGuesses = [...gameState.guesses, newGuess];
    
    // Check if all path countries have been found
    const guessedPathCountries = newGuesses
      .filter(g => g.isOnPath)
      .map(g => g.country);
    
    const allPathFound = gameState.correctPath.every(c => 
      guessedPathCountries.includes(c)
    );
    
    const gameOver = allPathFound || newGuesses.length >= MAX_GUESSES;
    const won = allPathFound;

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      gameOver,
      won
    }));

    if (gameOver) {
      setStats(prev => {
        const newStats = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: won ? prev.gamesWon + 1 : prev.gamesWon,
          currentStreak: won ? prev.currentStreak + 1 : 0,
          maxStreak: won ? Math.max(prev.maxStreak, prev.currentStreak + 1) : prev.maxStreak,
          guessDistribution: [...prev.guessDistribution]
        };
        if (won) {
          newStats.guessDistribution[newGuesses.length - 1]++;
        }
        saveStats(newStats);
        return newStats;
      });
    }
  }, [gameState]);

  const resetGame = useCallback(() => {
    const journey = getDailyJourney();
    const pathCountries = findShortestPaths(journey.origin.name, journey.destination.name);
    setGameState({
      origin: journey.origin,
      destination: journey.destination,
      guesses: [],
      gameOver: false,
      won: false,
      correctPath: Array.from(pathCountries)
    });
  }, []);

  const shareResult = useCallback(() => {
    const { guesses, won, origin, destination } = gameState;
    const emoji = guesses.map(g => g.isOnPath ? '🟩' : '🟥').join('');
    const text = `EuroJourny ${new Date().toLocaleDateString()}\n${origin.name} → ${destination.name}\n${emoji}\n${won ? `Found in ${guesses.length}/7!` : 'Failed 7/7'}`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [gameState]);

  return {
    gameState,
    stats,
    makeGuess,
    resetGame,
    shareResult,
    maxGuesses: MAX_GUESSES
  };
};
