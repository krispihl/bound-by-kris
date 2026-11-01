export type Boardgame = {
  title: string
  players: string
  playTime: string
  description: string
}

// Placeholder content.
export const BOARDGAMES: Boardgame[] = [
  {
    title: 'Catan',
    players: '3–4 players',
    playTime: '60–90 min',
    description: 'Trade, build and settle an island. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Carcassonne',
    players: '2–5 players',
    playTime: '30–45 min',
    description: 'Place tiles and claim roads, cities and fields. Sed do eiusmod tempor incididunt ut labore.',
  },
  {
    title: 'Ticket to Ride',
    players: '2–5 players',
    playTime: '45–60 min',
    description: 'Collect train cards and connect cities across the map. Ut enim ad minim veniam, quis nostrud.',
  },
]
