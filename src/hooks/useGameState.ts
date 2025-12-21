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
  // Reliable BFS shortest path (single optimal route). Treat borders as undirected.
  if (origin === destination) {
    return { countriesOnPath: new Set([origin]), optimalPath: [origin] };
  }

  const queue: string[] = [origin];
  const visited = new Set<string>([origin]);
  const prev = new Map<string, string | null>();
  prev.set(origin, null);

  const getNeighborsUndirected = (name: string): string[] => {
    const direct = europeCountries.find((c) => c.name === name)?.neighbors ?? [];
    const reverse = europeCountries
      .filter((c) => c.neighbors.includes(name))
      .map((c) => c.name);
    return Array.from(new Set([...direct, ...reverse]));
  };

  while (queue.length) {
    const current = queue.shift()!;
    if (current === destination) break;

    for (const neighbor of getNeighborsUndirected(current)) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      prev.set(neighbor, current);
      queue.push(neighbor);
    }
  }

  // Reconstruct path
  if (!prev.has(destination)) {
    return { countriesOnPath: new Set(), optimalPath: [] };
  }

  const optimalPath: string[] = [];
  let node: string | null = destination;
  while (node) {
    optimalPath.push(node);
    node = prev.get(node) ?? null;
  }
  optimalPath.reverse();

  return { countriesOnPath: new Set(optimalPath), optimalPath };
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

    const isOnPath = gameState.optimalPath.length > 0
      ? gameState.optimalPath.includes(country.name)
      : false;
    const newGuess: Guess = {
      country: country.name,
      isCorrect: country.name === gameState.destination.name,
      isOnPath
    };

    const newGuesses = [...gameState.guesses, newGuess];

    // Player wins when they've guessed every country on the optimal route,
    // excluding the origin (which is shown to them already).
    const countriesNeededToGuess = gameState.optimalPath.filter(
      (c) => c !== gameState.origin.name
    );

    const guessedCountries = new Set(newGuesses.map((g) => g.country));

    const allPathFound =
      countriesNeededToGuess.length > 0 &&
      countriesNeededToGuess.every((c) => guessedCountries.has(c));

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
