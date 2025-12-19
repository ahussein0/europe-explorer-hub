import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import EuropeMap from '@/components/EuropeMap';
import GuessInput from '@/components/GuessInput';
import GuessList from '@/components/GuessList';
import StatsModal from '@/components/StatsModal';
import HelpModal from '@/components/HelpModal';
import GameComplete from '@/components/GameComplete';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const { 
    gameState, 
    stats, 
    makeGuess, 
    shareResult,
    maxGuesses 
  } = useGameState();

  const correctGuessedCountries = gameState.guesses
    .filter(g => g.isOnPath)
    .map(g => g.country);

  return (
    <>
      <Helmet>
        <title>EuroJourny - Daily European Geography Game</title>
        <meta name="description" content="Guess the path between European countries in this daily geography puzzle game. Test your knowledge of European borders!" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header 
          onStatsClick={() => setShowStats(true)} 
          onHelpClick={() => setShowHelp(true)} 
        />

        <main className="flex-1 flex flex-col items-center px-4 py-6">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="game-title mb-2">your journy today is...</h1>
            <p className="game-subtitle">
              to go from <span className="origin-highlight">{gameState.origin.name}</span> to{' '}
              <span className="destination-highlight">{gameState.destination.name}</span>
            </p>
          </div>

          <div className="w-full max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <EuropeMap
              originCountry={gameState.origin.code}
              destinationCountry={gameState.destination.code}
              correctCountries={correctGuessedCountries.map(name => {
                const country = gameState.correctPath.find(c => c === name);
                return country ? name.substring(0, 2).toUpperCase() : '';
              })}
            />
          </div>

          {!gameState.gameOver ? (
            <div className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <GuessInput
                onGuess={makeGuess}
                disabled={gameState.gameOver}
                guessNumber={gameState.guesses.length + 1}
                maxGuesses={maxGuesses}
              />
              <GuessList guesses={gameState.guesses} />
            </div>
          ) : (
            <GameComplete
              won={gameState.won}
              guessCount={gameState.guesses.length}
              maxGuesses={maxGuesses}
              origin={gameState.origin.name}
              destination={gameState.destination.name}
              onShare={shareResult}
            />
          )}

          {!gameState.gameOver && gameState.guesses.length > 0 && (
            <p className="mt-4 text-sm text-muted-foreground">
              Find all countries on the path to win!
            </p>
          )}
        </main>

        <StatsModal
          isOpen={showStats}
          onClose={() => setShowStats(false)}
          stats={stats}
        />

        <HelpModal
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </div>
    </>
  );
};

export default Index;
