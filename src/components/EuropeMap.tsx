import React from 'react';
import { europeCountries } from '@/data/europeCountries';

// Accurate SVG paths for European countries (simplified but realistic)
const countryPaths: Record<string, string> = {
  // Portugal
  PT: "M95.5,265.5l-2.8,1.5l-1.5,3.8l0.5,2.5l-1.2,2.3l1.8,3.5l0.8,4.2l2.5,2.8l0.2,3.5l-1.5,2.8l2.2,4.2l3.2,0.5l1.8,-2.2l0.5,-4.5l-0.8,-3.2l1.2,-5.5l-0.5,-4.8l-2.2,-3.5l-1.8,-4.2l-2.4,-3.7z",
  
  // Spain
  ES: "M100,265l3.5,-1.2l5.2,1.8l4.8,-0.5l3.5,2.2l6.2,-0.8l4.5,1.5l5.8,-1.2l4.2,0.8l3.5,-2.5l4.8,1.2l2.8,3.5l-0.5,4.8l2.2,3.2l-1.5,4.5l0.8,5.2l-2.8,3.8l1.2,4.5l-3.5,2.8l-5.2,-0.5l-3.8,3.2l-4.5,-1.8l-5.8,0.5l-3.2,-2.8l-4.8,1.5l-3.5,-3.5l0.8,-5.2l-4.2,-2.8l-2.5,-4.5l0.5,-3.8l-3.2,-3.2l1.8,-4.5l-2.8,-2.8l1.5,-3.2z",
  
  // France
  FR: "M145,220l4.5,2.2l3.8,-1.5l5.2,1.8l2.8,4.5l5.5,1.2l3.2,-2.8l4.8,0.5l2.5,3.8l-1.2,5.5l3.5,4.2l-0.5,5.8l-4.2,3.5l0.8,4.5l-3.8,2.2l-5.5,-1.5l-4.2,2.8l-3.5,-0.8l-2.8,3.5l-4.5,-2.2l-5.8,0.5l-3.2,-3.8l-4.5,1.2l-2.8,-4.5l0.5,-5.2l-3.5,-2.8l1.2,-4.5l4.2,-2.2l0.8,-5.5l3.8,-3.2l2.5,1.8l4.2,-3.5z",
  
  // Belgium
  BE: "M163,200l3.2,1.5l2.8,3.2l4.5,-0.5l2.2,2.8l-1.5,3.5l-4.2,1.2l-3.8,-2.5l-2.5,1.8l-2.8,-2.2l0.5,-4.5l1.6,-4.3z",
  
  // Netherlands
  NL: "M165,182l5.5,0.8l3.2,3.5l-0.5,4.2l-2.8,2.5l-4.5,-0.8l-2.2,-3.2l-1.5,-4.5l2.8,-2.5z",
  
  // Luxembourg
  LU: "M170,215l2.2,0.5l1.5,2.8l-0.8,2.2l-2.5,0.5l-1.2,-2.5l0.8,-3.5z",
  
  // Germany
  DE: "M172,175l4.5,2.2l6.2,-0.5l5.5,3.8l4.2,-1.5l5.8,2.2l2.5,5.5l-0.8,6.2l3.2,4.5l-1.5,5.8l-4.2,2.2l0.5,4.5l-3.5,3.2l-5.2,-0.8l-3.8,2.5l-4.5,-1.5l-2.2,3.8l-5.5,-2.2l-3.2,1.5l-4.5,-3.5l0.8,-5.2l-2.8,-4.5l1.5,-5.8l-0.5,-6.2l3.2,-4.5l4.5,0.8l2.2,-5.5l3.2,-6.8z",
  
  // Switzerland
  CH: "M168,252l4.2,1.2l3.5,3.2l4.8,-0.5l2.2,2.8l-1.5,3.5l-3.8,1.8l-4.5,-0.5l-3.2,2.2l-2.8,-3.2l0.5,-4.5l-1.2,-3.8l1.8,-2.2z",
  
  // Austria
  AT: "M190,240l5.5,1.8l4.2,-1.2l5.8,2.5l3.5,-0.8l4.5,3.2l-0.5,4.5l-3.2,2.8l-5.8,0.5l-4.5,-2.2l-3.8,1.5l-4.2,-1.8l-3.5,2.5l-2.2,-3.8l1.5,-4.2l3.2,-2.5l-0.5,-2.8z",
  
  // Italy
  IT: "M175,265l3.5,2.2l2.2,-1.5l4.8,1.2l2.5,4.5l5.2,3.8l0.8,5.5l3.5,4.2l1.2,6.8l-0.5,5.5l2.8,4.2l4.5,2.8l2.2,5.5l-1.5,4.2l-3.8,1.8l-2.5,-3.2l-4.2,0.5l-1.8,-4.5l-3.5,-2.2l-0.5,-5.8l-4.2,-3.5l-2.8,-5.2l0.5,-4.5l-3.2,-3.8l-1.5,-5.5l-4.5,-4.2l0.8,-4.8l-0.5,-4.2z",
  
  // Slovenia
  SI: "M205,258l3.8,1.5l2.5,2.8l-0.5,3.2l-3.2,1.5l-4.5,-0.8l-2.2,-2.5l0.8,-3.2l3.3,-2.5z",
  
  // Croatia
  HR: "M210,258l4.2,0.5l3.5,3.2l5.2,-0.8l2.8,2.5l0.5,4.5l-2.2,3.2l-4.8,0.8l-3.5,3.5l-5.2,-2.2l-2.8,-4.5l1.5,-3.8l-2.5,-3.2l3.3,-3.7z",
  
  // Hungary
  HU: "M215,235l5.5,1.2l4.8,-0.5l3.5,2.8l5.2,0.8l2.2,4.5l-1.5,4.2l-4.8,2.5l-5.5,-0.8l-4.2,2.2l-3.8,-2.5l-4.5,0.5l-2.2,-3.8l1.5,-4.5l4.2,-2.2l-0.4,-4.4z",
  
  // Slovakia
  SK: "M210,225l4.5,1.5l3.8,-0.8l5.2,2.2l3.5,-1.5l4.2,2.8l-0.5,4.2l-4.8,1.5l-5.5,-0.8l-4.2,1.5l-3.8,-2.8l-2.5,-3.5l0.1,-4.3z",
  
  // Czech Republic
  CZ: "M190,218l4.5,0.8l3.2,-1.5l5.5,2.2l3.8,-0.5l4.2,3.5l-0.8,4.2l-4.5,1.8l-5.2,-1.2l-3.8,1.5l-4.5,-2.8l-2.2,-3.5l-0.2,-4.5z",
  
  // Poland
  PL: "M205,180l5.2,0.5l4.8,3.2l6.5,-0.8l5.2,2.5l3.8,5.8l-0.5,6.2l-3.2,4.5l0.8,5.5l-4.5,2.8l-5.8,-0.5l-4.2,2.2l-5.5,-1.5l-3.8,0.8l-4.2,-3.2l0.5,-5.5l-2.8,-4.8l1.5,-5.2l4.2,-2.8l-0.5,-5.5l2.5,-4z",
  
  // Denmark
  DK: "M178,155l5.8,1.5l3.5,4.2l-1.2,4.5l-4.2,2.2l-3.8,-0.5l-2.5,-4.8l0.5,-4.2l1.9,-2.9z M185,148l3.2,2.5l1.8,3.5l-2.5,2.8l-3.5,-1.2l-1.2,-4.5l2.2,-3.1z",
  
  // Sweden
  SE: "M195,85l3.2,5.5l-1.5,8.2l4.8,6.5l0.5,12.2l-2.8,8.5l3.2,5.8l-0.5,10.2l-4.2,5.5l-3.8,-4.2l-5.2,2.8l-2.5,-5.5l0.8,-8.2l-3.2,-4.5l1.5,-6.8l-2.8,-5.2l0.5,-8.5l4.2,-6.2l-0.5,-7.5l3.5,-5.8l4.8,-2.8z",
  
  // Norway
  NO: "M180,45l4.5,2.2l2.8,5.5l-1.5,6.2l3.2,4.8l-0.5,8.5l2.8,5.2l-1.2,6.8l3.5,4.5l-0.8,8.2l2.5,5.5l-2.8,3.2l-4.5,-2.8l-3.2,4.2l-5.5,-2.5l0.5,-6.8l-3.8,-4.2l1.2,-7.5l-2.5,-5.8l0.8,-8.2l-3.2,-4.5l1.5,-6.2l-2.8,-5.5l3.2,-4.8l5.8,0.5l2.5,-6.2l-1.5,-4.5z",
  
  // Finland
  FI: "M220,55l4.2,3.8l2.5,6.2l-1.2,8.5l3.8,5.2l-0.5,10.2l-4.2,6.8l1.5,5.5l-2.8,7.2l-4.5,4.2l-3.2,-5.8l-5.5,2.5l-2.8,-6.2l0.5,-8.5l-3.2,-5.2l1.5,-7.8l-2.5,-5.5l3.2,-6.2l5.5,-2.8l2.8,4.5l4.2,-6.2l0.7,-10.3z",
  
  // Estonia
  EE: "M225,138l4.2,1.5l2.8,3.2l-0.5,4.5l-4.2,1.8l-3.8,-2.2l-1.2,-4.5l2.7,-4.3z",
  
  // Latvia
  LV: "M222,150l5.2,0.8l3.5,2.8l-0.5,4.2l-4.8,2.5l-5.2,-0.8l-2.5,-3.5l1.2,-4.2l3.1,-1.8z",
  
  // Lithuania
  LT: "M218,165l5.5,0.5l4.2,3.2l-0.8,5.5l-3.5,2.2l-5.8,-0.5l-3.2,-3.8l0.5,-4.5l3.1,-2.6z",
  
  // Belarus
  BY: "M235,165l6.2,1.5l5.5,4.2l0.8,6.5l-2.5,5.8l-4.2,2.5l-6.5,-0.8l-4.8,2.2l-5.2,-3.5l0.5,-5.8l3.2,-4.5l-0.8,-5.2l7.8,-2.9z",
  
  // Ukraine
  UA: "M250,185l8.5,2.2l6.2,5.5l4.5,-1.2l5.8,3.8l2.2,6.5l-1.5,5.8l-4.2,4.5l-6.5,0.8l-5.8,4.2l-8.2,-2.5l-4.5,1.5l-6.2,-3.8l0.5,-5.5l-4.8,-4.2l1.2,-6.2l5.5,-2.8l3.2,-5.5l4.1,-3.1z",
  
  // Romania
  RO: "M235,250l5.8,1.2l4.5,4.2l6.2,-0.5l3.5,3.8l-0.8,5.5l-4.2,4.2l-6.5,0.8l-5.2,3.5l-4.8,-2.8l-3.5,-5.2l0.5,-4.5l-2.2,-4.8l6.7,-5.4z",
  
  // Bulgaria
  BG: "M245,280l5.5,0.5l4.2,3.5l-0.5,5.2l-3.8,3.8l-6.2,0.8l-4.5,-2.5l-2.8,-4.2l1.2,-4.5l6.9,-2.6z",
  
  // Serbia
  RS: "M225,265l4.8,0.8l3.2,4.2l-0.5,5.5l-2.8,3.8l-4.5,1.2l-3.8,-3.5l0.5,-4.8l-1.2,-4.2l4.3,-3z",
  
  // Montenegro
  ME: "M218,280l3.5,1.2l1.8,3.5l-1.2,3.2l-3.8,0.5l-2.2,-2.8l0.5,-3.5l1.4,-2.1z",
  
  // Albania
  AL: "M222,292l2.8,1.5l0.8,5.2l-1.5,4.5l-3.2,1.2l-2.5,-3.8l0.5,-5.2l3.1,-3.4z",
  
  // North Macedonia
  MK: "M230,290l4.2,0.5l2.5,3.5l-0.8,4.2l-3.5,1.8l-4.2,-1.2l-1.5,-3.8l3.3,-5z",
  
  // Greece
  GR: "M225,305l4.8,1.2l6.2,-0.5l2.5,4.5l-0.8,6.2l-3.2,4.8l1.5,5.5l-2.8,3.2l-4.5,-0.8l-3.8,2.5l-2.5,-4.2l-0.5,-6.5l-3.2,-4.8l1.2,-5.5l5.1,-5.6z M245,320l3.2,2.5l-0.5,4.2l-2.8,1.8l-2.5,-3.5l2.6,-5z",
  
  // Ireland
  IE: "M115,165l4.2,2.8l2.5,5.5l-1.2,6.2l-4.8,3.5l-5.2,-0.8l-3.5,-4.2l0.8,-5.5l3.2,-4.8l4,-2.7z",
  
  // United Kingdom
  GB: "M130,140l3.8,1.2l2.2,4.5l5.5,2.8l-0.5,5.2l3.2,4.8l-1.5,6.5l-4.2,3.2l0.8,5.8l-3.5,4.2l-5.8,-0.5l-4.2,2.5l-3.5,-3.8l1.2,-5.2l-2.8,-4.5l0.5,-6.2l-3.2,-3.5l1.5,-5.8l4.8,-2.2l-0.5,-5.5l3.2,-2.8l3,-0.7z M150,195l2.5,3.2l-0.8,4.5l-3.2,-0.5l-0.5,-4.2l2,-3z",
  
  // Iceland  
  IS: "M75,55l6.2,2.2l4.5,4.8l-1.2,5.5l-5.8,3.2l-6.5,-0.5l-4.2,-4.2l1.5,-5.8l5.5,-5.2z",
  
  // Bosnia and Herzegovina
  BA: "M210,270l3.5,0.8l2.2,3.5l-0.5,4.2l-3.8,2.2l-3.2,-1.5l-1.5,-4.2l3.3,-5z",
  
  // Kosovo
  XK: "M225,278l2.8,0.5l1.5,3.2l-1.2,3.5l-2.5,0.8l-2.2,-2.8l1.6,-5.2z",
  
  // Moldova
  MD: "M260,235l3.2,1.5l0.8,5.2l-2.2,4.5l-3.5,0.8l-2.2,-3.8l1.2,-5.2l2.7,-3z",
  
  // Russia (European part - simplified western border)
  RU: "M250,120l8.5,5.2l12.2,2.8l6.5,8.5l-2.8,10.2l8.2,6.5l-0.5,12.5l-6.2,8.2l4.5,10.5l-8.5,5.8l-10.2,-2.5l-6.5,4.2l-8.2,-5.8l-4.5,-8.5l2.8,-6.2l-5.5,-4.2l0.8,-8.5l-4.2,-5.8l3.5,-7.2l6.2,2.5l4.5,-6.8l-2.8,-8.2l2.2,-7.2z",
  
  // Turkey (European part)
  TR: "M255,295l5.5,1.5l4.2,4.8l6.5,-0.5l3.2,3.5l-1.2,5.2l-5.8,2.8l-4.5,-1.5l-3.2,2.8l-6.2,-1.2l-2.5,-4.5l0.8,-5.8l3.2,-7.1z",
  
  // Andorra
  AD: "M135,270l1.5,0.5l0.5,1.8l-1.2,1.2l-1.5,-0.8l0.7,-2.7z",
  
  // Monaco
  MC: "M178,275l0.8,0.5l0.2,1.2l-1.2,0.5l-0.5,-1.5l0.7,-0.7z",
  
  // San Marino
  SM: "M195,285l1.2,0.5l0.5,1.5l-1.5,0.8l-0.8,-1.8l0.6,-1z",
  
  // Vatican City
  VA: "M193,298l0.5,0.5l0.2,0.8l-0.8,0.2l-0.2,-1l0.3,-0.5z",
  
  // Liechtenstein
  LI: "M181,255l0.8,0.5l0.2,2.2l-1.2,0.5l-0.5,-2.2l0.7,-1z",
  
  // Malta
  MT: "M198,335l1.5,0.5l0.8,1.8l-1.2,1.2l-1.5,-1.5l0.4,-2z",
  
  // Cyprus
  CY: "M295,315l3.5,1.2l2.2,2.8l-0.5,2.5l-4.2,0.8l-2.5,-2.5l1.5,-4.8z",
};

interface EuropeMapProps {
  highlightedCountries?: string[];
  correctCountries?: string[];
  originCountry?: string;
  destinationCountry?: string;
}

const EuropeMap: React.FC<EuropeMapProps> = ({
  highlightedCountries = [],
  correctCountries = [],
  originCountry,
  destinationCountry
}) => {
  // Map country names to codes
  const nameToCode: Record<string, string> = {};
  europeCountries.forEach(c => {
    nameToCode[c.name] = c.code;
  });

  const getCountryClass = (countryCode: string) => {
    // Check if this country was correctly guessed
    const isCorrect = correctCountries.some(name => nameToCode[name] === countryCode);
    
    if (isCorrect) {
      return 'fill-accent stroke-accent/80 stroke-[1.5]';
    }
    if (countryCode === originCountry || countryCode === destinationCountry) {
      return 'fill-mint-light stroke-accent stroke-2';
    }
    if (highlightedCountries.includes(countryCode)) {
      return 'fill-mint/30 stroke-accent/50 stroke-1';
    }
    return 'fill-muted stroke-border stroke-[0.5] hover:fill-muted/80 transition-colors';
  };

  const getCountryName = (code: string): string => {
    const country = europeCountries.find(c => c.code === code);
    return country?.name || code;
  };

  return (
    <div className="map-container aspect-[4/3] relative">
      <div className="map-glow" />
      <svg
        viewBox="60 40 250 320"
        className="w-full h-full relative z-10"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))' }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.15"/>
          </filter>
        </defs>
        
        {/* Sea/Ocean background */}
        <rect x="60" y="40" width="250" height="320" fill="hsl(200 30% 92%)" rx="8"/>
        
        {/* Render all country paths */}
        <g filter="url(#shadow)">
          {Object.entries(countryPaths).map(([code, path]) => (
            <path
              key={code}
              d={path}
              className={getCountryClass(code)}
              style={{ 
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
            >
              <title>{getCountryName(code)}</title>
            </path>
          ))}
        </g>
        
        {/* Origin marker */}
        {originCountry && countryPaths[originCountry] && (
          <g className="animate-bounce-in">
            <circle
              cx={getCountryCenterX(originCountry)}
              cy={getCountryCenterY(originCountry)}
              r="6"
              fill="hsl(var(--warm-brown))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
            <text
              x={getCountryCenterX(originCountry)}
              y={getCountryCenterY(originCountry) - 12}
              textAnchor="middle"
              className="fill-warm-brown text-[8px] font-bold font-body"
            >
              START
            </text>
          </g>
        )}
        
        {/* Destination marker */}
        {destinationCountry && countryPaths[destinationCountry] && (
          <g className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <circle
              cx={getCountryCenterX(destinationCountry)}
              cy={getCountryCenterY(destinationCountry)}
              r="6"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth="2"
            />
            <text
              x={getCountryCenterX(destinationCountry)}
              y={getCountryCenterY(destinationCountry) - 12}
              textAnchor="middle"
              className="fill-primary text-[8px] font-bold font-body"
            >
              END
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// Helper functions to get approximate center of each country
function getCountryCenterX(code: string): number {
  const centers: Record<string, number> = {
    PT: 100, ES: 145, FR: 175, BE: 172, NL: 170, LU: 172, DE: 195, CH: 178,
    AT: 208, IT: 200, SI: 210, HR: 220, HU: 228, SK: 225, CZ: 205, PL: 225,
    DK: 188, SE: 200, NO: 185, FI: 225, EE: 228, LV: 228, LT: 225, BY: 245,
    UA: 268, RO: 248, BG: 252, RS: 230, ME: 220, AL: 225, MK: 235, GR: 235,
    IE: 112, GB: 140, IS: 82, BA: 215, XK: 228, MD: 262, RU: 268, TR: 268,
    AD: 138, MC: 180, SM: 197, VA: 195, LI: 182, MT: 200, CY: 298
  };
  return centers[code] || 180;
}

function getCountryCenterY(code: string): number {
  const centers: Record<string, number> = {
    PT: 285, ES: 285, FR: 250, BE: 208, NL: 192, LU: 220, DE: 210, CH: 262,
    AT: 252, IT: 300, SI: 265, HR: 275, HU: 252, SK: 235, CZ: 228, PL: 205,
    DK: 162, SE: 120, NO: 100, FI: 100, EE: 145, LV: 160, LT: 175, BY: 188,
    UA: 215, RO: 268, BG: 292, RS: 280, ME: 288, AL: 302, MK: 298, GR: 325,
    IE: 180, GB: 175, IS: 68, BA: 280, XK: 285, MD: 248, RU: 165, TR: 310,
    AD: 273, MC: 277, SM: 288, VA: 300, LI: 258, MT: 340, CY: 320
  };
  return centers[code] || 200;
}

export default EuropeMap;
