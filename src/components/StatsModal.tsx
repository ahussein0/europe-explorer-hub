import React from 'react';
import { X, Trophy, Target, Flame } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Stats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: Stats;
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, stats }) => {
  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  const maxDistribution = Math.max(...stats.guessDistribution, 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">Statistics</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{stats.gamesPlayed}</div>
            <div className="text-xs text-muted-foreground">Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{winPercentage}</div>
            <div className="text-xs text-muted-foreground">Win %</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{stats.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{stats.maxStreak}</div>
            <div className="text-xs text-muted-foreground">Max</div>
          </div>
        </div>

        <div className="py-4">
          <h3 className="font-display text-lg mb-3 text-center">Guess Distribution</h3>
          <div className="space-y-1">
            {stats.guessDistribution.map((count, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="w-4 text-sm text-muted-foreground">{index + 1}</span>
                <div 
                  className="h-5 rounded bg-primary flex items-center justify-end px-2 transition-all"
                  style={{ 
                    width: `${Math.max((count / maxDistribution) * 100, 8)}%`,
                    minWidth: count > 0 ? '24px' : '8px'
                  }}
                >
                  <span className="text-xs font-medium text-primary-foreground">
                    {count > 0 && count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-5 h-5 text-gold" />
            <span className="text-sm">{stats.gamesWon} wins</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Flame className="w-5 h-5 text-primary" />
            <span className="text-sm">{stats.maxStreak} best</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsModal;
