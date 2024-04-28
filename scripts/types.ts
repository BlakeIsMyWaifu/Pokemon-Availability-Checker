export type GetPokemonNames = (limit?: number, offset?: number) => Promise<string[]>
export type PokemonListEndpoint = {
	count: number
	next: string
	previous: string
	results: results[]
}
type results = {
	name: string
	url: string
}

export type GetGameLocations = (pokemonNames: string[]) => Promise<Data>
export type AddPokemonData = (pokemonName: string) => Promise<void>
export type UpdateDataMap = (generation: string, gameName: string, pokemonName: string, method: string) => void

type GenI = 'Red' | 'Blue' | 'Green' | 'Yellow'
type GenII = 'Gold' | 'Silver' | 'Crystal'
type GenIII = 'Ruby' | 'Sapphire' | 'Emerald' | 'FireRed' | 'LeafGreen' | 'Colosseum' | 'XD'
type GenIV = 'Diamond' | 'Pearl' | 'Platinum' | 'HeartGold' | 'SoulSilver' | 'Pal Park' | 'Pokéwalker'
type GenV = 'Black' | 'White' | 'Black 2' | 'White 2' | 'Dream World'
type GenVI = 'X' | 'Y' | 'Omega Ruby' | 'Alpha Sapphire'
type GenVII = 'Sun' | 'Moon' | 'Ultra Sun' | 'Ultra Moon' | "Let's Go Pikachu" | "Let's Go Eevee"
type GenVIII =
	| 'Sword'
	| 'Shield'
	| 'Sword Expansion Pass'
	| 'Shield Expansion Pass'
	| 'Brilliant Diamond'
	| 'Shining Pearl'
	| 'Legends: Arceus'
type GenIX =
	| 'Scarlet'
	| 'Violet'
	| 'Scarlet The Hidden Treasure of Area Zero'
	| 'Violet The Hidden Treasure of Area Zero'
export type GameName = GenI | GenII | GenIII | GenIV | GenV | GenVI | GenVII | GenVIII | GenIX

export type Generations = {
	'Generation I': GenI
	'Generation II': GenII
	'Generation III': GenIII
	'Generation IV': GenIV
	'Generation V': GenV
	'Generation VI': GenVI
	'Generation VII': GenVII
	'Generation VIII': GenVIII
	'Generation IX': GenIX
}

export type Data = {
	[key in keyof Generations]: Record<Generations[key], Map<string, string>>
}

export type SaveData = (data: Data) => Promise<void>
export type MapReplacer<T> = (_key: string, value: T) => unknown[] | T
