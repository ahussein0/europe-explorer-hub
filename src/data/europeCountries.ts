export interface Country {
  name: string;
  code: string;
  neighbors: string[];
  coordinates: { x: number; y: number };
}

// Complete list of European countries with accurate neighbor data
export const europeCountries: Country[] = [
  // Iberian Peninsula
  { name: "Portugal", code: "PT", neighbors: ["Spain"], coordinates: { x: 90, y: 340 } },
  { name: "Spain", code: "ES", neighbors: ["Portugal", "France", "Andorra"], coordinates: { x: 150, y: 320 } },
  { name: "Andorra", code: "AD", neighbors: ["Spain", "France"], coordinates: { x: 200, y: 290 } },
  
  // Western Europe
  { name: "France", code: "FR", neighbors: ["Spain", "Andorra", "Belgium", "Luxembourg", "Germany", "Switzerland", "Italy", "Monaco"], coordinates: { x: 220, y: 260 } },
  { name: "Monaco", code: "MC", neighbors: ["France"], coordinates: { x: 260, y: 290 } },
  { name: "Belgium", code: "BE", neighbors: ["France", "Luxembourg", "Germany", "Netherlands"], coordinates: { x: 250, y: 210 } },
  { name: "Netherlands", code: "NL", neighbors: ["Belgium", "Germany"], coordinates: { x: 260, y: 190 } },
  { name: "Luxembourg", code: "LU", neighbors: ["France", "Belgium", "Germany"], coordinates: { x: 260, y: 220 } },
  
  // Central Europe
  { name: "Germany", code: "DE", neighbors: ["Netherlands", "Belgium", "Luxembourg", "France", "Switzerland", "Austria", "Czech Republic", "Poland", "Denmark"], coordinates: { x: 300, y: 210 } },
  { name: "Switzerland", code: "CH", neighbors: ["France", "Germany", "Austria", "Liechtenstein", "Italy"], coordinates: { x: 280, y: 270 } },
  { name: "Liechtenstein", code: "LI", neighbors: ["Switzerland", "Austria"], coordinates: { x: 295, y: 265 } },
  { name: "Austria", code: "AT", neighbors: ["Germany", "Czech Republic", "Slovakia", "Hungary", "Slovenia", "Italy", "Switzerland", "Liechtenstein"], coordinates: { x: 330, y: 260 } },
  
  // Italy & Microstates
  { name: "Italy", code: "IT", neighbors: ["France", "Switzerland", "Austria", "Slovenia", "San Marino", "Vatican City"], coordinates: { x: 310, y: 320 } },
  { name: "San Marino", code: "SM", neighbors: ["Italy"], coordinates: { x: 320, y: 295 } },
  { name: "Vatican City", code: "VA", neighbors: ["Italy"], coordinates: { x: 310, y: 310 } },
  
  // Balkans - Northern
  { name: "Slovenia", code: "SI", neighbors: ["Austria", "Italy", "Hungary", "Croatia"], coordinates: { x: 350, y: 275 } },
  { name: "Croatia", code: "HR", neighbors: ["Slovenia", "Hungary", "Serbia", "Bosnia and Herzegovina", "Montenegro"], coordinates: { x: 365, y: 290 } },
  { name: "Bosnia and Herzegovina", code: "BA", neighbors: ["Croatia", "Serbia", "Montenegro"], coordinates: { x: 380, y: 305 } },
  
  // Balkans - Central
  { name: "Serbia", code: "RS", neighbors: ["Hungary", "Romania", "Bulgaria", "North Macedonia", "Kosovo", "Montenegro", "Bosnia and Herzegovina", "Croatia"], coordinates: { x: 400, y: 300 } },
  { name: "Montenegro", code: "ME", neighbors: ["Croatia", "Bosnia and Herzegovina", "Serbia", "Kosovo", "Albania"], coordinates: { x: 390, y: 320 } },
  { name: "Kosovo", code: "XK", neighbors: ["Serbia", "Montenegro", "Albania", "North Macedonia"], coordinates: { x: 400, y: 325 } },
  
  // Balkans - Southern
  { name: "Albania", code: "AL", neighbors: ["Montenegro", "Kosovo", "North Macedonia", "Greece"], coordinates: { x: 400, y: 345 } },
  { name: "North Macedonia", code: "MK", neighbors: ["Serbia", "Kosovo", "Albania", "Greece", "Bulgaria"], coordinates: { x: 415, y: 340 } },
  { name: "Greece", code: "GR", neighbors: ["Albania", "North Macedonia", "Bulgaria", "Turkey"], coordinates: { x: 420, y: 380 } },
  
  // Central-Eastern Europe
  { name: "Hungary", code: "HU", neighbors: ["Austria", "Slovakia", "Ukraine", "Romania", "Serbia", "Croatia", "Slovenia"], coordinates: { x: 380, y: 265 } },
  { name: "Slovakia", code: "SK", neighbors: ["Czech Republic", "Poland", "Ukraine", "Hungary", "Austria"], coordinates: { x: 370, y: 245 } },
  { name: "Czech Republic", code: "CZ", neighbors: ["Germany", "Poland", "Slovakia", "Austria"], coordinates: { x: 340, y: 235 } },
  { name: "Poland", code: "PL", neighbors: ["Germany", "Czech Republic", "Slovakia", "Ukraine", "Belarus", "Lithuania", "Russia"], coordinates: { x: 380, y: 205 } },
  
  // Eastern Europe
  { name: "Romania", code: "RO", neighbors: ["Hungary", "Ukraine", "Moldova", "Bulgaria", "Serbia"], coordinates: { x: 430, y: 285 } },
  { name: "Bulgaria", code: "BG", neighbors: ["Romania", "Serbia", "North Macedonia", "Greece", "Turkey"], coordinates: { x: 435, y: 320 } },
  { name: "Moldova", code: "MD", neighbors: ["Romania", "Ukraine"], coordinates: { x: 470, y: 270 } },
  { name: "Ukraine", code: "UA", neighbors: ["Poland", "Slovakia", "Hungary", "Romania", "Moldova", "Belarus", "Russia"], coordinates: { x: 490, y: 240 } },
  { name: "Belarus", code: "BY", neighbors: ["Lithuania", "Latvia", "Russia", "Ukraine", "Poland"], coordinates: { x: 460, y: 200 } },
  
  // Baltic States
  { name: "Lithuania", code: "LT", neighbors: ["Latvia", "Belarus", "Poland", "Russia"], coordinates: { x: 420, y: 185 } },
  { name: "Latvia", code: "LV", neighbors: ["Estonia", "Lithuania", "Belarus", "Russia"], coordinates: { x: 430, y: 170 } },
  { name: "Estonia", code: "EE", neighbors: ["Latvia", "Russia"], coordinates: { x: 435, y: 155 } },
  
  // Nordic Countries
  { name: "Denmark", code: "DK", neighbors: ["Germany"], coordinates: { x: 295, y: 160 } },
  { name: "Sweden", code: "SE", neighbors: ["Norway", "Finland"], coordinates: { x: 355, y: 120 } },
  { name: "Norway", code: "NO", neighbors: ["Sweden", "Finland", "Russia"], coordinates: { x: 310, y: 100 } },
  { name: "Finland", code: "FI", neighbors: ["Sweden", "Norway", "Russia"], coordinates: { x: 420, y: 100 } },
  { name: "Iceland", code: "IS", neighbors: [], coordinates: { x: 80, y: 60 } },
  
  // British Isles
  { name: "Ireland", code: "IE", neighbors: ["United Kingdom"], coordinates: { x: 150, y: 185 } },
  { name: "United Kingdom", code: "GB", neighbors: ["Ireland"], coordinates: { x: 200, y: 180 } },
  
  // Russia & Turkey (European parts)
  { name: "Russia", code: "RU", neighbors: ["Norway", "Finland", "Estonia", "Latvia", "Lithuania", "Poland", "Belarus", "Ukraine"], coordinates: { x: 520, y: 150 } },
  { name: "Turkey", code: "TR", neighbors: ["Greece", "Bulgaria"], coordinates: { x: 500, y: 360 } },
  
  // Mediterranean Islands
  { name: "Cyprus", code: "CY", neighbors: [], coordinates: { x: 520, y: 400 } },
  { name: "Malta", code: "MT", neighbors: [], coordinates: { x: 340, y: 400 } },
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

// Get undirected neighbors (treat borders as bidirectional even if data isn't perfectly symmetric)
const getNeighborsUndirected = (name: string): string[] => {
  const direct = europeCountries.find((c) => c.name === name)?.neighbors ?? [];
  const reverse = europeCountries
    .filter((c) => c.neighbors.includes(name))
    .map((c) => c.name);
  return Array.from(new Set([...direct, ...reverse]));
};

// Get the shortest path length between two countries (number of countries in route)
const getShortestPathLength = (originName: string, destinationName: string): number => {
  if (originName === destinationName) return 1;

  const queue: Array<{ name: string; dist: number }> = [{ name: originName, dist: 1 }];
  const visited = new Set<string>([originName]);

  while (queue.length) {
    const { name, dist } = queue.shift()!;

    for (const neighbor of getNeighborsUndirected(name)) {
      if (visited.has(neighbor)) continue;
      if (neighbor === destinationName) return dist + 1;
      visited.add(neighbor);
      queue.push({ name: neighbor, dist: dist + 1 });
    }
  }

  return Infinity;
};

// Get valid country pairs that are far apart, not neighbors, and result in a playable route
const getValidPairs = (): Array<{ origin: Country; destination: Country }> => {
  const countriesWithNeighbors = europeCountries.filter((c) => c.neighbors.length > 0);
  const validPairs: Array<{ origin: Country; destination: Country }> = [];

  for (let i = 0; i < countriesWithNeighbors.length; i++) {
    for (let j = i + 1; j < countriesWithNeighbors.length; j++) {
      const a = countriesWithNeighbors[i];
      const b = countriesWithNeighbors[j];

      // Skip if they're neighbors
      if (areNeighbors(a, b)) continue;

      // Skip if they're too close
      if (getDistance(a, b) < MIN_DISTANCE) continue;

      // Skip if there's no land route or the route is too trivial
      // Require at least 4 countries in the shortest route (origin + 2 steps + destination)
      const shortestLen = getShortestPathLength(a.name, b.name);
      if (!Number.isFinite(shortestLen) || shortestLen < 4) continue;

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

// Country code to name mapping for the map component
export const countryCodeToName: Record<string, string> = {
  'PT': 'Portugal',
  'ES': 'Spain',
  'AD': 'Andorra',
  'FR': 'France',
  'MC': 'Monaco',
  'BE': 'Belgium',
  'NL': 'Netherlands',
  'LU': 'Luxembourg',
  'DE': 'Germany',
  'CH': 'Switzerland',
  'LI': 'Liechtenstein',
  'AT': 'Austria',
  'IT': 'Italy',
  'SM': 'San Marino',
  'VA': 'Vatican City',
  'SI': 'Slovenia',
  'HR': 'Croatia',
  'BA': 'Bosnia and Herzegovina',
  'RS': 'Serbia',
  'ME': 'Montenegro',
  'XK': 'Kosovo',
  'AL': 'Albania',
  'MK': 'North Macedonia',
  'GR': 'Greece',
  'HU': 'Hungary',
  'SK': 'Slovakia',
  'CZ': 'Czech Republic',
  'PL': 'Poland',
  'RO': 'Romania',
  'BG': 'Bulgaria',
  'MD': 'Moldova',
  'UA': 'Ukraine',
  'BY': 'Belarus',
  'LT': 'Lithuania',
  'LV': 'Latvia',
  'EE': 'Estonia',
  'DK': 'Denmark',
  'SE': 'Sweden',
  'NO': 'Norway',
  'FI': 'Finland',
  'IS': 'Iceland',
  'IE': 'Ireland',
  'GB': 'United Kingdom',
  'RU': 'Russia',
  'TR': 'Turkey',
  'CY': 'Cyprus',
  'MT': 'Malta',
};

export const nameToCountryCode: Record<string, string> = Object.fromEntries(
  Object.entries(countryCodeToName).map(([code, name]) => [name, code])
);
