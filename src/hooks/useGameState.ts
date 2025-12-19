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
  optimalPath: string[];
}

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

const MAX_GUESSES = 7;
const MAX_DAILY_GAMES = 2;

const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

const getDailyPlays = (): { date: string; gamesPlayed: number; gameSeeds: number[] } => {
  try {
    const saved = localStorage.getItem('eurojourneyDailyPlays');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.date === getTodayKey()) {
        return data;
      }
    }
  } catch (e) {
    console.error('Failed to load daily plays', e);
  }
  return { date: getTodayKey(), gamesPlayed: 0, gameSeeds: [] };
};

const saveDailyPlays = (data: { date: string; gamesPlayed: number; gameSeeds: number[] }) => {
  try {
    localStorage.setItem('eurojourneyDailyPlays', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save daily plays', e);
  }
};

// Simple BFS to find if a country is on ANY shortest path and get one optimal path
const findShortestPaths = (origin: string, destination: string): { countriesOnPath: Set<string>; optimalPath: string[] } => {
  const countriesOnPath = new Set<string>();
  let optimalPath: string[] = [];
  
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
        if (optimalPath.length === 0) {
          optimalPath = [...path];
        }
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
  
  return { countriesOnPath, optimalPath };
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
  const [dailyPlays, setDailyPlays] = useState(getDailyPlays);
  const [gameState, setGameState] = useState<GameState>(() => {
    const plays = getDailyPlays();
    const gameSeed = plays.gamesPlayed;
    const journey = getDailyJourney(gameSeed);
    const { countriesOnPath, optimalPath } = findShortestPaths(journey.origin.name, journey.destination.name);
    return {
      origin: journey.origin,
      destination: journey.destination,
      guesses: [],
      gameOver: false,
      won: false,
      correctPath: Array.from(countriesOnPath),
      optimalPath
    };
  });

  const [stats, setStats] = useState<Stats>(loadStats);

  const canPlayMore = dailyPlays.gamesPlayed < MAX_DAILY_GAMES;
  const gamesRemaining = MAX_DAILY_GAMES - dailyPlays.gamesPlayed;

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
      // Update daily plays count
      setDailyPlays(prev => {
        const newPlays = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          gameSeeds: [...prev.gameSeeds, prev.gamesPlayed]
        };
        saveDailyPlays(newPlays);
        return newPlays;
      });

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
    if (!canPlayMore) return;
    
    const newSeed = dailyPlays.gamesPlayed;
    const journey = getDailyJourney(newSeed);
    const { countriesOnPath, optimalPath } = findShortestPaths(journey.origin.name, journey.destination.name);
    setGameState({
      origin: journey.origin,
      destination: journey.destination,
      guesses: [],
      gameOver: false,
      won: false,
      correctPath: Array.from(countriesOnPath),
      optimalPath
    });
  }, [canPlayMore, dailyPlays.gamesPlayed]);

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
    maxGuesses: MAX_GUESSES,
    canPlayMore,
    gamesRemaining,
    maxDailyGames: MAX_DAILY_GAMES
  };
};
