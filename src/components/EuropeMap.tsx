import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/TopoJSON/europe.topojson";

// Map of country names to ISO2 codes for matching
const countryNameToCode: Record<string, string> = {
  'Portugal': 'PT', 'Spain': 'ES', 'France': 'FR', 'Belgium': 'BE', 'Netherlands': 'NL',
  'Luxembourg': 'LU', 'Germany': 'DE', 'Switzerland': 'CH', 'Austria': 'AT', 'Italy': 'IT',
  'Slovenia': 'SI', 'Croatia': 'HR', 'Hungary': 'HU', 'Slovakia': 'SK', 'Czech Republic': 'CZ',
  'Poland': 'PL', 'Denmark': 'DK', 'Sweden': 'SE', 'Norway': 'NO', 'Finland': 'FI',
  'Estonia': 'EE', 'Latvia': 'LV', 'Lithuania': 'LT', 'Belarus': 'BY', 'Ukraine': 'UA',
  'Romania': 'RO', 'Bulgaria': 'BG', 'Serbia': 'RS', 'Montenegro': 'ME', 'Albania': 'AL',
  'North Macedonia': 'MK', 'Greece': 'GR', 'Ireland': 'IE', 'United Kingdom': 'GB',
  'Iceland': 'IS', 'Bosnia and Herzegovina': 'BA', 'Kosovo': 'XK', 'Moldova': 'MD',
  'Russia': 'RU', 'Turkey': 'TR', 'Cyprus': 'CY', 'Malta': 'MT', 'Andorra': 'AD',
  'Monaco': 'MC', 'San Marino': 'SM', 'Vatican City': 'VA', 'Liechtenstein': 'LI',
  // Also handle alternate names from the TopoJSON
  'Macedonia': 'MK', 'Czech Rep.': 'CZ', 'Czechia': 'CZ', 'Bosnia and Herz.': 'BA',
  'Bosnia': 'BA', 'UK': 'GB', 'Great Britain': 'GB',
};

interface EuropeMapProps {
  highlightedCountries?: string[];
  correctCountries?: string[];
  originCountry?: string;
  destinationCountry?: string;
}

const EuropeMap: React.FC<EuropeMapProps> = memo(({
  highlightedCountries = [],
  correctCountries = [],
  originCountry,
  destinationCountry
}) => {
  // Convert origin/destination to codes
  const originCode = originCountry ? countryNameToCode[originCountry] || originCountry : '';
  const destCode = destinationCountry ? countryNameToCode[destinationCountry] || destinationCountry : '';
  
  // Convert correct countries to codes
  const correctCodes = correctCountries.map(name => countryNameToCode[name] || name);

  const getCountryStyle = (geo: any) => {
    const countryCode = geo.properties.ISO2;
    const countryName = geo.properties.NAME;
    
    // Check by code or name
    const isOrigin = countryCode === originCode || countryCode === originCountry || 
                     countryName === originCountry;
    const isDestination = countryCode === destCode || countryCode === destinationCountry || 
                          countryName === destinationCountry;
    const isCorrect = correctCodes.includes(countryCode) || correctCountries.includes(countryName);

    // Correctly guessed countries on path
    if (isCorrect) {
      return {
        default: {
          fill: 'hsl(175 50% 45%)',
          stroke: 'hsl(175 60% 35%)',
          strokeWidth: 1.5,
          outline: 'none',
        },
        hover: {
          fill: 'hsl(175 50% 45%)',
          stroke: 'hsl(175 60% 35%)',
          strokeWidth: 1.5,
          outline: 'none',
        },
        pressed: {
          fill: 'hsl(175 50% 45%)',
          stroke: 'hsl(175 60% 35%)',
          strokeWidth: 1.5,
          outline: 'none',
        },
      };
    }

    // Origin and destination countries - bright orange
    if (isOrigin || isDestination) {
      return {
        default: {
          fill: 'hsl(30 85% 55%)',
          stroke: 'hsl(30 90% 40%)',
          strokeWidth: 2,
          outline: 'none',
        },
        hover: {
          fill: 'hsl(30 85% 55%)',
          stroke: 'hsl(30 90% 40%)',
          strokeWidth: 2,
          outline: 'none',
        },
        pressed: {
          fill: 'hsl(30 85% 55%)',
          stroke: 'hsl(30 90% 40%)',
          strokeWidth: 2,
          outline: 'none',
        },
      };
    }

    // Default country style - non-interactive
    return {
      default: {
        fill: 'hsl(35 20% 88%)',
        stroke: 'hsl(35 25% 75%)',
        strokeWidth: 0.5,
        outline: 'none',
      },
      hover: {
        fill: 'hsl(35 20% 88%)',
        stroke: 'hsl(35 25% 75%)',
        strokeWidth: 0.5,
        outline: 'none',
      },
      pressed: {
        fill: 'hsl(35 20% 88%)',
        stroke: 'hsl(35 25% 75%)',
        strokeWidth: 0.5,
        outline: 'none',
      },
    };
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2">
      <div className="relative rounded-xl overflow-hidden shadow-soft border border-border bg-card/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [15, 56],
            scale: 600,
          }}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={800}
          height={500}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={getCountryStyle(geo)}
                  tabIndex={-1}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: 'hsl(30 85% 55%)' }} />
          <span className="text-muted-foreground">Start / End</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded" style={{ backgroundColor: 'hsl(175 50% 45%)' }} />
          <span className="text-muted-foreground">Found</span>
        </div>
      </div>
    </div>
  );
});

EuropeMap.displayName = 'EuropeMap';

export default EuropeMap;
