// Quote blocks end with the author after a closing quote mark and a dash, e.g. "“…” — Steve Krug". The dash varies
// between bites (—, ―, –, -), so any of them counts.
const AUTHOR = /^(.*”)\s*[—―–-]\s*(\S.*)$/su

export const splitQuote = (text: string): { quote: string; author?: string } => {
	const match = AUTHOR.exec(text)

	return match ? { quote: match[1], author: match[2] } : { quote: text }
}
