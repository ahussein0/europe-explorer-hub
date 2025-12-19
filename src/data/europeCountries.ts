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

// Calculate distance between two countries based on coordinates
const getDistance = (a: Country, b: Country): number => {
  const dx = a.coordinates.x - b.coordinates.x;
  const dy = a.coordinates.y - b.coordinates.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Check if two countries are neighbors
const areNeighbors = (a: Country, b: Country): boolean => {
  return a.neighbors.includes(b.name) || b.neighbors.includes(a.name);
};

// Minimum distance threshold for a good journey (about 1/3 of map width)
const MIN_DISTANCE = 150;

// Get valid country pairs that are far apart and not neighbors
const getValidPairs = (): Array<{ origin: Country; destination: Country }> => {
  const countriesWithNeighbors = europeCountries.filter(c => c.neighbors.length > 0);
  const validPairs: Array<{ origin: Country; destination: Country }> = [];
  
  for (let i = 0; i < countriesWithNeighbors.length; i++) {
    for (let j = i + 1; j < countriesWithNeighbors.length; j++) {
      const a = countriesWithNeighbors[i];
      const b = countriesWithNeighbors[j];
      
      // Skip if they're neighbors
      if (areNeighbors(a, b)) continue;
      
      // Skip if they're too close
      if (getDistance(a, b) < MIN_DISTANCE) continue;
      
      validPairs.push({ origin: a, destination: b });
      validPairs.push({ origin: b, destination: a });
    }
  }
  
  return validPairs;
};

export const getRandomJourney = (): { origin: Country; destination: Country } => {
  const validPairs = getValidPairs();
  
  if (validPairs.length === 0) {
    // Fallback to any two different countries
    const countriesWithNeighbors = europeCountries.filter(c => c.neighbors.length > 0);
    return {
      origin: countriesWithNeighbors[0],
      destination: countriesWithNeighbors[countriesWithNeighbors.length - 1]
    };
  }
  
  const randomIndex = Math.floor(Math.random() * validPairs.length);
  return validPairs[randomIndex];
};

export const getDailyJourney = (gameNumber: number = 0): { origin: Country; destination: Country } => {
  // Use the date + game number as a seed for consistent daily challenges
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${gameNumber}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const validPairs = getValidPairs();
  
  if (validPairs.length === 0) {
    // Fallback
    const countriesWithNeighbors = europeCountries.filter(c => c.neighbors.length > 0);
    return {
      origin: countriesWithNeighbors[0],
      destination: countriesWithNeighbors[countriesWithNeighbors.length - 1]
    };
  }
  
  // Use hash to pick a consistent pair for the day
  const pairIndex = Math.abs(hash) % validPairs.length;
  return validPairs[pairIndex];
};

export const findCountryByName = (name: string): Country | undefined => {
  return europeCountries.find(c => 
    c.name.toLowerCase() === name.toLowerCase()
  );
};

export const getCountryNames = (): string[] => {
  return europeCountries.map(c => c.name).sort();
};
