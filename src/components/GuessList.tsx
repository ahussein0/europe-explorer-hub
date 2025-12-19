import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

export interface Guess {
  country: string;
  isCorrect: boolean;
  isOnPath: boolean;
  direction?: string;
}

interface GuessListProps {
  guesses: Guess[];
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  if (guesses.length === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-2 mt-6">
      {guesses.map((guess, index) => (
        <div
          key={index}
          className={`guess-row ${guess.isOnPath ? 'guess-correct' : 'guess-wrong'}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex-shrink-0">
            {guess.isOnPath ? (
              <CheckCircle className="w-5 h-5 text-accent" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive/70" />
            )}
          </div>
          <span className="flex-1 font-medium">{guess.country}</span>
          {guess.isOnPath && (
            <span className="text-sm text-accent flex items-center gap-1">
              On the path <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default GuessList;
