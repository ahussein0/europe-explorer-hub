import React from "react";
import { BarChart3, HelpCircle, Globe } from "lucide-react";

interface HeaderProps {
  onStatsClick: () => void;
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onStatsClick, onHelpClick }) => {
  return (
    <header className="w-full px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Globe className="w-7 h-7 text-primary" />
        <span className="logo-text">Eurostepping</span>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onStatsClick} className="icon-button" aria-label="Statistics">
          <BarChart3 className="w-5 h-5" />
        </button>
        <button onClick={onHelpClick} className="icon-button" aria-label="Help">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
