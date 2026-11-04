// Lower case without accents, so "mottemeister" finds "Mõttemeister" and "AZUL" finds "Azul".
const simplify = (text: string) => text.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('et')

// Whether the text contains the search anywhere in it. An empty or blank search matches everything.
export const matchesSearch = (text: string, search: string) => simplify(text).includes(simplify(search.trim()))
