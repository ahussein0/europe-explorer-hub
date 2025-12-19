import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { nameToCountryCode } from '@/data/europeCountries';

const geoUrl = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/TopoJSON/europe.topojson";

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
  // Convert country names to codes for comparison
  const correctCodes = correctCountries.map(name => nameToCountryCode[name] || name);
  const highlightedCodes = highlightedCountries.map(name => nameToCountryCode[name] || name);

  const getCountryStyle = (geo: any) => {
    const countryCode = geo.properties.ISO2;
    const countryName = geo.properties.NAME;
    
    // Check by code or name
    const isOrigin = countryCode === originCountry || countryName === originCountry;
    const isDestination = countryCode === destinationCountry || countryName === destinationCountry;
    const isCorrect = correctCodes.includes(countryCode) || correctCountries.includes(countryName);
    const isHighlighted = highlightedCodes.includes(countryCode) || highlightedCountries.includes(countryName);

    if (isCorrect) {
      return {
        default: {
          fill: 'hsl(175 50% 45%)',
          stroke: 'hsl(175 60% 35%)',
          strokeWidth: 1.5,
          outline: 'none',
          transition: 'all 0.3s ease',
        },
        hover: {
          fill: 'hsl(175 55% 50%)',
          stroke: 'hsl(175 60% 30%)',
          strokeWidth: 2,
          outline: 'none',
        },
        pressed: {
          fill: 'hsl(175 50% 40%)',
          stroke: 'hsl(175 60% 30%)',
          strokeWidth: 2,
          outline: 'none',
        },
      };
    }

    if (isOrigin || isDestination) {
      return {
        default: {
          fill: 'hsl(30 85% 55%)',
          stroke: 'hsl(30 90% 40%)',
          strokeWidth: 2,
          outline: 'none',
          transition: 'all 0.3s ease',
        },
        hover: {
          fill: 'hsl(30 90% 60%)',
          stroke: 'hsl(30 90% 35%)',
          strokeWidth: 2.5,
          outline: 'none',
        },
        pressed: {
          fill: 'hsl(30 85% 50%)',
          stroke: 'hsl(30 90% 35%)',
          strokeWidth: 2.5,
          outline: 'none',
        },
      };
    }

    if (isHighlighted) {
      return {
        default: {
          fill: 'hsl(175 50% 85%)',
          stroke: 'hsl(175 45% 65%)',
          strokeWidth: 1,
          outline: 'none',
          transition: 'all 0.3s ease',
        },
        hover: {
          fill: 'hsl(175 55% 80%)',
          stroke: 'hsl(175 50% 55%)',
          strokeWidth: 1.5,
          outline: 'none',
        },
        pressed: {
          fill: 'hsl(175 50% 75%)',
          stroke: 'hsl(175 50% 55%)',
          strokeWidth: 1.5,
          outline: 'none',
        },
      };
    }

    // Default country style
    return {
      default: {
        fill: 'hsl(35 20% 88%)',
        stroke: 'hsl(35 25% 75%)',
        strokeWidth: 0.5,
        outline: 'none',
        transition: 'all 0.3s ease',
      },
      hover: {
        fill: 'hsl(35 25% 82%)',
        stroke: 'hsl(35 30% 65%)',
        strokeWidth: 1,
        outline: 'none',
      },
      pressed: {
        fill: 'hsl(35 20% 80%)',
        stroke: 'hsl(35 30% 65%)',
        strokeWidth: 1,
        outline: 'none',
      },
    };
  };

  return (
    <div className="map-container relative">
      <div className="map-glow" />
      <div className="relative z-10 rounded-xl overflow-hidden shadow-soft border border-border bg-card/50">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [15, 54],
            scale: 700,
          }}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[15, 54]} zoom={1} minZoom={0.8} maxZoom={3}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={getCountryStyle(geo)}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(30 85% 55%)' }} />
          <span className="text-muted-foreground">Origin/Destination</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(175 50% 45%)' }} />
          <span className="text-muted-foreground">Found on path</span>
        </div>
      </div>
    </div>
  );
});

EuropeMap.displayName = 'EuropeMap';

export default EuropeMap;
