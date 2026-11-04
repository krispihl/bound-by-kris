export type Boardgame = {
	title: string
	// e.g. '2–4 players'; absent for expansions, which need the base game.
	players?: string
	isExpansion: boolean
	isEstonian: boolean
	// A page about the game, e.g. on BoardGameGeek; not every game has one.
	link?: string
}

// The games list lives in a Google Sheet, published to the web as CSV: GAME, PLAYERS, LANGUAGE and LINK columns (plus
// notes, which are ignored). Editing the sheet updates the page without a redeploy.
export const BOARDGAMES_CSV_URL =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vRALL75t9rGVPz3ymvrCPXtT8sACjPk4AYj_07UgJIgU1VgTl7V3-fq92wOZjtZXQvSveN1OBFYz9rz/pub?gid=0&single=true&output=csv'
