import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">How to Play</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            Guess the path between two European countries in 7 tries or less!
          </p>

          <div className="space-y-3">
            <h3 className="font-display text-lg">Rules:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">1.</span>
                Each day features a new journey from one country to another
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">2.</span>
                Guess countries that could be on the path between origin and destination
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">3.</span>
                Countries must share a border to be on the path
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">4.</span>
                Complete the path within 7 guesses to win!
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="font-display text-lg mb-3">Examples:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/20 border border-accent/40">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium">Germany</span>
                <ArrowRight className="w-4 h-4 text-accent ml-auto" />
                <span className="text-sm text-accent">On path!</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-destructive/10 border border-destructive/30">
                <XCircle className="w-5 h-5 text-destructive/70 flex-shrink-0" />
                <span className="font-medium">Iceland</span>
                <span className="text-sm text-muted-foreground ml-auto">Not on path</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center pt-2">
            A new journey appears every day at midnight!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
