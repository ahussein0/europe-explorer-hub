import React from 'react';
import { Trophy, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface GameCompleteProps {
  won: boolean;
  guessCount: number;
  maxGuesses: number;
  origin: string;
  destination: string;
  onPlayAgain?: () => void;
  onShare: () => void;
}

const GameComplete: React.FC<GameCompleteProps> = ({
  won,
  guessCount,
  maxGuesses,
  origin,
  destination,
  onPlayAgain,
  onShare
}) => {
  useEffect(() => {
    if (won) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e69f50', '#5eb8a0', '#d4a853']
      });
    }
  }, [won]);

  return (
    <div className="w-full max-w-md mx-auto text-center py-8 animate-bounce-in">
      <div className="mb-6">
        {won ? (
          <>
            <Trophy className="w-16 h-16 mx-auto text-gold mb-4" />
            <h2 className="font-display text-3xl mb-2">Congratulations!</h2>
            <p className="text-muted-foreground">
              You found the path in <span className="font-bold text-primary">{guessCount}</span> guess{guessCount !== 1 ? 'es' : ''}!
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">🗺️</span>
            </div>
            <h2 className="font-display text-3xl mb-2">Journey Incomplete</h2>
            <p className="text-muted-foreground">
              The path from {origin} to {destination} wasn't found this time.
            </p>
          </>
        )}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-primary-foreground transition-all"
          style={{ 
            background: 'var(--gradient-button)',
            boxShadow: 'var(--shadow-button)'
          }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
        {onPlayAgain && (
          <button
            onClick={onPlayAgain}
            className="flex items-center gap-2 px-5 py-3 rounded-lg font-medium border border-border bg-card hover:bg-muted transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default GameComplete;
