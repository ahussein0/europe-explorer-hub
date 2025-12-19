import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getCountryNames } from '@/data/europeCountries';

interface GuessInputProps {
  onGuess: (country: string) => void;
  disabled?: boolean;
  guessNumber: number;
  maxGuesses: number;
}

const GuessInput: React.FC<GuessInputProps> = ({ 
  onGuess, 
  disabled = false, 
  guessNumber, 
  maxGuesses 
}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const countryNames = useMemo(() => getCountryNames(), []);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = countryNames.filter(name =>
        name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedIndex(-1);
  }, [value, countryNames]);

  const handleSubmit = (countryName?: string) => {
    const guessValue = countryName || value;
    if (guessValue.trim()) {
      onGuess(guessValue.trim());
      setValue('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex]);
      } else {
        handleSubmit();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => value && suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Enter a country..."
            disabled={disabled}
            className="guess-input"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 w-full mt-1 bg-card rounded-lg shadow-soft border border-border overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion}
                  onClick={() => handleSubmit(suggestion)}
                  className={`px-4 py-2 cursor-pointer transition-colors ${
                    index === selectedIndex 
                      ? 'bg-muted text-foreground' 
                      : 'hover:bg-muted/50'
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <button
          onClick={() => handleSubmit()}
          disabled={disabled || !value.trim()}
          className="px-6 py-3 rounded-lg font-medium text-primary-foreground transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            background: 'var(--gradient-button)',
            boxShadow: disabled ? 'none' : 'var(--shadow-button)'
          }}
        >
          Guess ({guessNumber} / {maxGuesses})
        </button>
      </div>
    </div>
  );
};

export default GuessInput;
