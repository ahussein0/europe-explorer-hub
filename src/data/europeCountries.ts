export interface Country {
  name: string;
  code: string;
  neighbors: string[];
  coordinates: { x: number; y: number };
}

export const europeCountries: Country[] = [
  { name: "Portugal", code: "PT", neighbors: ["Spain"], coordinates: { x: 120, y: 320 } },
  { name: "Spain", code: "ES", neighbors: ["Portugal", "France", "Andorra"], coordinates: { x: 160, y: 300 } },
  { name: "France", code: "FR", neighbors: ["Spain", "Belgium", "Luxembourg", "Germany", "Switzerland", "Italy", "Monaco", "Andorra"], coordinates: { x: 220, y: 260 } },
  { name: "Belgium", code: "BE", neighbors: ["France", "Luxembourg", "Germany", "Netherlands"], coordinates: { x: 250, y: 210 } },
  { name: "Netherlands", code: "NL", neighbors: ["Belgium", "Germany"], coordinates: { x: 260, y: 190 } },
  { name: "Luxembourg", code: "LU", neighbors: ["France", "Belgium", "Germany"], coordinates: { x: 260, y: 230 } },
  { name: "Germany", code: "DE", neighbors: ["Netherlands", "Belgium", "Luxembourg", "France", "Switzerland", "Austria", "Czech Republic", "Poland", "Denmark"], coordinates: { x: 300, y: 220 } },
  { name: "Switzerland", code: "CH", neighbors: ["France", "Germany", "Austria", "Liechtenstein", "Italy"], coordinates: { x: 280, y: 270 } },
  { name: "Austria", code: "AT", neighbors: ["Germany", "Czech Republic", "Slovakia", "Hungary", "Slovenia", "Italy", "Switzerland", "Liechtenstein"], coordinates: { x: 330, y: 260 } },
  { name: "Italy", code: "IT", neighbors: ["France", "Switzerland", "Austria", "Slovenia", "San Marino", "Vatican City"], coordinates: { x: 310, y: 320 } },
  { name: "Slovenia", code: "SI", neighbors: ["Austria", "Italy", "Hungary", "Croatia"], coordinates: { x: 350, y: 280 } },
  { name: "Croatia", code: "HR", neighbors: ["Slovenia", "Hungary", "Serbia", "Bosnia and Herzegovina", "Montenegro"], coordinates: { x: 370, y: 290 } },
  { name: "Hungary", code: "HU", neighbors: ["Austria", "Slovakia", "Ukraine", "Romania", "Serbia", "Croatia", "Slovenia"], coordinates: { x: 380, y: 260 } },
  { name: "Slovakia", code: "SK", neighbors: ["Czech Republic", "Poland", "Ukraine", "Hungary", "Austria"], coordinates: { x: 370, y: 240 } },
  { name: "Czech Republic", code: "CZ", neighbors: ["Germany", "Poland", "Slovakia", "Austria"], coordinates: { x: 340, y: 230 } },
  { name: "Poland", code: "PL", neighbors: ["Germany", "Czech Republic", "Slovakia", "Ukraine", "Belarus", "Lithuania", "Russia"], coordinates: { x: 380, y: 200 } },
  { name: "Denmark", code: "DK", neighbors: ["Germany"], coordinates: { x: 300, y: 160 } },
  { name: "Sweden", code: "SE", neighbors: ["Norway", "Finland"], coordinates: { x: 350, y: 120 } },
  { name: "Norway", code: "NO", neighbors: ["Sweden", "Finland", "Russia"], coordinates: { x: 310, y: 100 } },
  { name: "Finland", code: "FI", neighbors: ["Sweden", "Norway", "Russia"], coordinates: { x: 420, y: 100 } },
  { name: "Estonia", code: "EE", neighbors: ["Latvia", "Russia"], coordinates: { x: 430, y: 160 } },
  { name: "Latvia", code: "LV", neighbors: ["Estonia", "Lithuania", "Belarus", "Russia"], coordinates: { x: 430, y: 180 } },
  { name: "Lithuania", code: "LT", neighbors: ["Latvia", "Belarus", "Poland", "Russia"], coordinates: { x: 420, y: 200 } },
  { name: "Belarus", code: "BY", neighbors: ["Lithuania", "Latvia", "Russia", "Ukraine", "Poland"], coordinates: { x: 460, y: 210 } },
  { name: "Ukraine", code: "UA", neighbors: ["Poland", "Slovakia", "Hungary", "Romania", "Moldova", "Belarus", "Russia"], coordinates: { x: 480, y: 250 } },
  { name: "Romania", code: "RO", neighbors: ["Hungary", "Ukraine", "Moldova", "Bulgaria", "Serbia"], coordinates: { x: 430, y: 280 } },
  { name: "Bulgaria", code: "BG", neighbors: ["Romania", "Serbia", "North Macedonia", "Greece", "Turkey"], coordinates: { x: 430, y: 320 } },
  { name: "Serbia", code: "RS", neighbors: ["Hungary", "Romania", "Bulgaria", "North Macedonia", "Kosovo", "Montenegro", "Bosnia and Herzegovina", "Croatia"], coordinates: { x: 400, y: 300 } },
  { name: "Montenegro", code: "ME", neighbors: ["Croatia", "Bosnia and Herzegovina", "Serbia", "Kosovo", "Albania"], coordinates: { x: 390, y: 320 } },
  { name: "Albania", code: "AL", neighbors: ["Montenegro", "Kosovo", "North Macedonia", "Greece"], coordinates: { x: 400, y: 340 } },
  { name: "North Macedonia", code: "MK", neighbors: ["Serbia", "Kosovo", "Albania", "Greece", "Bulgaria"], coordinates: { x: 410, y: 340 } },
  { name: "Greece", code: "GR", neighbors: ["Albania", "North Macedonia", "Bulgaria", "Turkey"], coordinates: { x: 420, y: 380 } },
  { name: "Ireland", code: "IE", neighbors: ["United Kingdom"], coordinates: { x: 150, y: 180 } },
  { name: "United Kingdom", code: "GB", neighbors: ["Ireland"], coordinates: { x: 200, y: 180 } },
  { name: "Iceland", code: "IS", neighbors: [], coordinates: { x: 80, y: 60 } },
];

export const getRandomJourney = (): { origin: Country; destination: Country } => {
  // Get countries with neighbors for valid paths
  const countriesWithNeighbors = europeCountries.filter(c => c.neighbors.length > 0);
  
  const originIndex = Math.floor(Math.random() * countriesWithNeighbors.length);
  let destIndex = Math.floor(Math.random() * countriesWithNeighbors.length);
  
  while (destIndex === originIndex) {
    destIndex = Math.floor(Math.random() * countriesWithNeighbors.length);
  }
  
  return {
    origin: countriesWithNeighbors[originIndex],
    destination: countriesWithNeighbors[destIndex]
  };
};

export const getDailyJourney = (): { origin: Country; destination: Country } => {
  // Use the date as a seed for consistent daily challenges
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const countriesWithNeighbors = europeCountries.filter(c => c.neighbors.length > 0);
  const originIndex = Math.abs(hash) % countriesWithNeighbors.length;
  const destIndex = Math.abs(hash * 31) % countriesWithNeighbors.length;
  
  if (originIndex === destIndex) {
    return {
      origin: countriesWithNeighbors[originIndex],
      destination: countriesWithNeighbors[(destIndex + 1) % countriesWithNeighbors.length]
    };
  }
  
  return {
    origin: countriesWithNeighbors[originIndex],
    destination: countriesWithNeighbors[destIndex]
  };
};

export const findCountryByName = (name: string): Country | undefined => {
  return europeCountries.find(c => 
    c.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCountryNames = (): string[] => {
  return europeCountries.map(c => c.name).sort();
};
