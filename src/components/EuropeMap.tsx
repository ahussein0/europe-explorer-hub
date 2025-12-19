import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Annotation } from 'react-simple-maps';

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
  'Macedonia': 'MK', 'Czech Rep.': 'CZ', 'Czechia': 'CZ', 'Bosnia and Herz.': 'BA',
  'Bosnia': 'BA', 'UK': 'GB', 'Great Britain': 'GB',
};

// Country coordinates for labels
const countryCoordinates: Record<string, [number, number]> = {
  'Portugal': [-8.2, 39.5], 'Spain': [-3.7, 40.4], 'France': [2.3, 46.6], 'Belgium': [4.4, 50.8],
  'Netherlands': [5.3, 52.1], 'Luxembourg': [6.1, 49.8], 'Germany': [10.5, 51.2], 'Switzerland': [8.2, 46.8],
  'Austria': [14.6, 47.5], 'Italy': [12.6, 42.5], 'Slovenia': [14.5, 46.1], 'Croatia': [16.0, 45.2],
  'Hungary': [19.5, 47.2], 'Slovakia': [19.7, 48.7], 'Czech Republic': [15.5, 49.8], 'Poland': [19.1, 52.0],
  'Denmark': [9.5, 56.3], 'Sweden': [18.6, 60.1], 'Norway': [8.5, 61.0], 'Finland': [26.0, 64.0],
  'Estonia': [25.0, 58.6], 'Latvia': [24.6, 57.0], 'Lithuania': [23.9, 55.2], 'Belarus': [27.6, 53.7],
  'Ukraine': [31.2, 48.4], 'Romania': [25.0, 45.9], 'Bulgaria': [25.5, 42.7], 'Serbia': [21.0, 44.0],
  'Montenegro': [19.3, 42.4], 'Albania': [20.2, 41.2], 'North Macedonia': [21.7, 41.5], 'Greece': [21.8, 39.1],
  'Ireland': [-8.2, 53.4], 'United Kingdom': [-3.4, 54.0], 'Iceland': [-19.0, 65.0],
  'Bosnia and Herzegovina': [17.8, 43.9], 'Kosovo': [20.9, 42.6], 'Moldova': [28.8, 47.4],
  'Russia': [40.0, 56.0], 'Turkey': [32.0, 39.9], 'Cyprus': [33.4, 35.1], 'Malta': [14.4, 35.9],
};

interface EuropeMapProps {
  guessedCountries?: string[];
  correctCountries?: string[];
  originCountry?: string;
  destinationCountry?: string;
  revealPath?: string[];
}

const EuropeMap: React.FC<EuropeMapProps> = memo(({
  guessedCountries = [],
  correctCountries = [],
  originCountry,
  destinationCountry,
  revealPath
}) => {
  const originCode = originCountry ? countryNameToCode[originCountry] || originCountry : '';
  const destCode = destinationCountry ? countryNameToCode[destinationCountry] || destinationCountry : '';
  const correctCodes = correctCountries.map(name => countryNameToCode[name] || name);
  const guessedCodes = guessedCountries.map(name => countryNameToCode[name] || name);
  const revealCodes = revealPath ? revealPath.map(name => countryNameToCode[name] || name) : [];

  const getCountryStyle = (geo: any) => {
    const countryCode = geo.properties.ISO2;
    const countryName = geo.properties.NAME;
    
    const isOrigin = countryCode === originCode || countryCode === originCountry || countryName === originCountry;
    const isDestination = countryCode === destCode || countryCode === destinationCountry || countryName === destinationCountry;
    const isCorrect = correctCodes.includes(countryCode) || correctCountries.includes(countryName);
    const isGuessed = guessedCodes.includes(countryCode) || guessedCountries.includes(countryName);
    const isOnRevealedPath = revealCodes.includes(countryCode) || (revealPath && revealPath.includes(countryName));

    // Correctly guessed countries on path - green
    if (isCorrect) {
      return {
        default: { fill: 'hsl(175 50% 45%)', stroke: 'hsl(175 60% 35%)', strokeWidth: 1.5, outline: 'none' },
        hover: { fill: 'hsl(175 50% 45%)', stroke: 'hsl(175 60% 35%)', strokeWidth: 1.5, outline: 'none' },
        pressed: { fill: 'hsl(175 50% 45%)', stroke: 'hsl(175 60% 35%)', strokeWidth: 1.5, outline: 'none' },
      };
    }

    // Origin and destination - bright orange
    if (isOrigin || isDestination) {
      return {
        default: { fill: 'hsl(30 85% 55%)', stroke: 'hsl(30 90% 40%)', strokeWidth: 2, outline: 'none' },
        hover: { fill: 'hsl(30 85% 55%)', stroke: 'hsl(30 90% 40%)', strokeWidth: 2, outline: 'none' },
        pressed: { fill: 'hsl(30 85% 55%)', stroke: 'hsl(30 90% 40%)', strokeWidth: 2, outline: 'none' },
      };
    }

    // Revealed path (game over) - teal/cyan to show correct path
    if (isOnRevealedPath) {
      return {
        default: { fill: 'hsl(190 70% 50%)', stroke: 'hsl(190 80% 35%)', strokeWidth: 2, outline: 'none' },
        hover: { fill: 'hsl(190 70% 50%)', stroke: 'hsl(190 80% 35%)', strokeWidth: 2, outline: 'none' },
        pressed: { fill: 'hsl(190 70% 50%)', stroke: 'hsl(190 80% 35%)', strokeWidth: 2, outline: 'none' },
      };
    }

    // Guessed but not correct - muted red/pink
    if (isGuessed) {
      return {
        default: { fill: 'hsl(0 60% 65%)', stroke: 'hsl(0 50% 50%)', strokeWidth: 1.5, outline: 'none' },
        hover: { fill: 'hsl(0 60% 65%)', stroke: 'hsl(0 50% 50%)', strokeWidth: 1.5, outline: 'none' },
        pressed: { fill: 'hsl(0 60% 65%)', stroke: 'hsl(0 50% 50%)', strokeWidth: 1.5, outline: 'none' },
      };
    }

    // Default - light grey
    return {
      default: { fill: 'hsl(35 20% 88%)', stroke: 'hsl(35 25% 75%)', strokeWidth: 0.5, outline: 'none' },
      hover: { fill: 'hsl(35 20% 88%)', stroke: 'hsl(35 25% 75%)', strokeWidth: 0.5, outline: 'none' },
      pressed: { fill: 'hsl(35 20% 88%)', stroke: 'hsl(35 25% 75%)', strokeWidth: 0.5, outline: 'none' },
    };
  };

  const originCoords = originCountry ? countryCoordinates[originCountry] : null;
  const destCoords = destinationCountry ? countryCoordinates[destinationCountry] : null;

  return (
    <div className="w-full px-1">
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-soft border border-border bg-card/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [15, 52], scale: 420 }}
          style={{ width: '100%', height: '100%' }}
          width={800}
          height={450}
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
          
          {/* Origin label */}
          {originCoords && (
            <Annotation
              subject={originCoords}
              dx={-30}
              dy={-20}
              connectorProps={{
                stroke: "hsl(30 90% 40%)",
                strokeWidth: 2,
                strokeLinecap: "round"
              }}
            >
              <text
                x={-4}
                textAnchor="end"
                alignmentBaseline="middle"
                fill="hsl(30 90% 35%)"
                fontSize={14}
                fontWeight="bold"
                style={{ textShadow: '0 1px 2px white, 0 -1px 2px white, 1px 0 2px white, -1px 0 2px white' }}
              >
                Origin
              </text>
            </Annotation>
          )}
          
          {/* Destination label */}
          {destCoords && (
            <Annotation
              subject={destCoords}
              dx={30}
              dy={-20}
              connectorProps={{
                stroke: "hsl(30 90% 40%)",
                strokeWidth: 2,
                strokeLinecap: "round"
              }}
            >
              <text
                x={4}
                textAnchor="start"
                alignmentBaseline="middle"
                fill="hsl(30 90% 35%)"
                fontSize={14}
                fontWeight="bold"
                style={{ textShadow: '0 1px 2px white, 0 -1px 2px white, 1px 0 2px white, -1px 0 2px white' }}
              >
                Destination
              </text>
            </Annotation>
          )}
        </ComposableMap>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center flex-wrap gap-3 mt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(30 85% 55%)' }} />
          <span className="text-muted-foreground">Origin/Dest</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(175 50% 45%)' }} />
          <span className="text-muted-foreground">Correct</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(0 60% 65%)' }} />
          <span className="text-muted-foreground">Guessed</span>
        </div>
        {revealPath && (
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: 'hsl(190 70% 50%)' }} />
            <span className="text-muted-foreground">Correct Path</span>
          </div>
        )}
      </div>
    </div>
  );
});

EuropeMap.displayName = 'EuropeMap';

export default EuropeMap;
