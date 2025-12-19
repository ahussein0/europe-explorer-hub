import React from 'react';

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
  const getCountryClass = (countryCode: string) => {
    if (correctCountries.includes(countryCode)) {
      return 'country-correct';
    }
    if (countryCode === originCountry || countryCode === destinationCountry) {
      return 'country-highlight';
    }
    if (highlightedCountries.includes(countryCode)) {
      return 'fill-mint/50 stroke-accent stroke-1';
    }
    return 'country-default';
  };

  return (
    <div className="map-container aspect-[4/3] relative">
      <div className="map-glow" />
      <svg
        viewBox="0 0 600 450"
        className="w-full h-full relative z-10"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Simplified Europe map paths */}
        {/* Portugal */}
        <path
          d="M115,300 L125,290 L130,310 L135,340 L125,355 L110,350 L105,330 Z"
          className={getCountryClass('PT')}
        />
        {/* Spain */}
        <path
          d="M125,290 L180,270 L220,285 L225,310 L210,340 L180,355 L150,360 L135,340 L130,310 Z"
          className={getCountryClass('ES')}
        />
        {/* France */}
        <path
          d="M180,270 L220,220 L270,210 L285,240 L280,280 L250,295 L220,285 Z"
          className={getCountryClass('FR')}
        />
        {/* United Kingdom */}
        <path
          d="M185,150 L210,140 L225,155 L230,180 L220,205 L195,210 L175,195 L170,170 Z"
          className={getCountryClass('GB')}
        />
        {/* Ireland */}
        <path
          d="M140,160 L165,155 L175,175 L165,195 L145,200 L130,185 Z"
          className={getCountryClass('IE')}
        />
        {/* Belgium */}
        <path
          d="M240,200 L260,195 L270,210 L260,220 L245,215 Z"
          className={getCountryClass('BE')}
        />
        {/* Netherlands */}
        <path
          d="M250,175 L275,170 L280,190 L270,200 L255,195 Z"
          className={getCountryClass('NL')}
        />
        {/* Germany */}
        <path
          d="M270,170 L310,160 L340,180 L350,220 L330,250 L295,255 L280,235 L275,200 Z"
          className={getCountryClass('DE')}
        />
        {/* Denmark */}
        <path
          d="M285,140 L310,135 L320,155 L305,170 L285,165 Z"
          className={getCountryClass('DK')}
        />
        {/* Poland */}
        <path
          d="M340,180 L400,175 L420,200 L415,235 L380,250 L350,240 L350,220 Z"
          className={getCountryClass('PL')}
        />
        {/* Czech Republic */}
        <path
          d="M320,225 L360,220 L375,240 L355,255 L325,250 Z"
          className={getCountryClass('CZ')}
        />
        {/* Austria */}
        <path
          d="M310,260 L355,255 L375,265 L360,285 L320,280 Z"
          className={getCountryClass('AT')}
        />
        {/* Switzerland */}
        <path
          d="M270,265 L300,260 L310,275 L295,290 L270,285 Z"
          className={getCountryClass('CH')}
        />
        {/* Italy */}
        <path
          d="M280,295 L320,290 L330,310 L355,360 L340,390 L315,385 L295,350 L285,320 Z"
          className={getCountryClass('IT')}
        />
        {/* Slovenia */}
        <path
          d="M335,275 L360,270 L370,285 L355,295 L340,290 Z"
          className={getCountryClass('SI')}
        />
        {/* Croatia */}
        <path
          d="M350,290 L380,280 L405,310 L390,330 L360,320 L350,300 Z"
          className={getCountryClass('HR')}
        />
        {/* Hungary */}
        <path
          d="M360,255 L405,250 L420,275 L405,295 L370,290 L365,270 Z"
          className={getCountryClass('HU')}
        />
        {/* Slovakia */}
        <path
          d="M355,240 L400,235 L405,255 L380,260 L360,255 Z"
          className={getCountryClass('SK')}
        />
        {/* Romania */}
        <path
          d="M400,265 L455,260 L470,290 L455,320 L420,325 L400,300 Z"
          className={getCountryClass('RO')}
        />
        {/* Bulgaria */}
        <path
          d="M420,320 L460,315 L475,340 L450,365 L420,360 L410,340 Z"
          className={getCountryClass('BG')}
        />
        {/* Serbia */}
        <path
          d="M400,300 L425,295 L430,330 L415,345 L395,340 L385,320 Z"
          className={getCountryClass('RS')}
        />
        {/* Greece */}
        <path
          d="M400,365 L440,355 L460,380 L445,415 L415,420 L395,400 L400,380 Z"
          className={getCountryClass('GR')}
        />
        {/* Albania */}
        <path
          d="M390,345 L410,340 L415,365 L400,380 L385,370 Z"
          className={getCountryClass('AL')}
        />
        {/* North Macedonia */}
        <path
          d="M410,345 L430,340 L435,360 L420,370 L405,365 Z"
          className={getCountryClass('MK')}
        />
        {/* Montenegro */}
        <path
          d="M380,330 L395,325 L400,345 L385,355 L375,345 Z"
          className={getCountryClass('ME')}
        />
        {/* Sweden */}
        <path
          d="M330,70 L365,60 L385,100 L380,160 L350,175 L330,150 L325,100 Z"
          className={getCountryClass('SE')}
        />
        {/* Norway */}
        <path
          d="M280,45 L330,40 L340,70 L330,120 L310,140 L290,130 L275,90 Z"
          className={getCountryClass('NO')}
        />
        {/* Finland */}
        <path
          d="M385,60 L430,50 L455,90 L450,150 L420,175 L390,165 L380,120 Z"
          className={getCountryClass('FI')}
        />
        {/* Estonia */}
        <path
          d="M415,165 L445,160 L450,180 L430,190 L415,185 Z"
          className={getCountryClass('EE')}
        />
        {/* Latvia */}
        <path
          d="M415,185 L450,180 L455,205 L430,215 L415,205 Z"
          className={getCountryClass('LV')}
        />
        {/* Lithuania */}
        <path
          d="M400,205 L435,200 L440,225 L415,235 L400,225 Z"
          className={getCountryClass('LT')}
        />
        {/* Belarus */}
        <path
          d="M430,200 L480,195 L490,235 L460,255 L430,250 L420,225 Z"
          className={getCountryClass('BY')}
        />
        {/* Ukraine */}
        <path
          d="M455,240 L530,230 L555,280 L535,330 L480,340 L455,310 L450,270 Z"
          className={getCountryClass('UA')}
        />
        {/* Iceland */}
        <path
          d="M60,50 L100,45 L115,65 L100,85 L70,90 L55,70 Z"
          className={getCountryClass('IS')}
        />
      </svg>
    </div>
  );
};

export default EuropeMap;
