export type GetData = (pokemonNames: string[]) => Promise<Data>
export type AddPokemonData = (pokemonName: string) => Promise<void>

type GenI = 'Red' | 'Blue' | 'Blue (Japan)' | 'Yellow'
type GenII = 'Gold' | 'Silver' | 'Crystal'
type GenIII = 'Ruby' | 'Sapphire' | 'Emerald' | 'FireRed' | 'LeafGreen' | 'Colosseum' | 'XD'
type GenIV = 'Diamond' | 'Pearl' | 'Platinum' | 'HeartGold' | 'SoulSilver' | 'Pal Park'
type GenV = 'Black' | 'White' | 'Black 2' | 'White 2'
type GenVI = 'X' | 'Y' | 'Omega Ruby' | 'Alpha Sapphire'
type GenVII = 'Sun' | 'Moon' | 'Ultra Sun' | 'Ultra Moon' | "Let's Go Pikachu" | "Let's Go Eevee"
type GenVIII = 'Sword' | 'Shield' | 'Expansion Pass' | 'Brilliant Diamond' | 'Shining Pearl' | 'Legends: Arceus'
type GenIX = 'Scarlet' | 'Violet' | 'The Hidden Treasure of Area Zero'
export type Games = GenI | GenII | GenIII | GenIV | GenV | GenVI | GenVII | GenIX

export type Data = {
	'Generation I': Record<GenI, Map<string, string>>
	'Generation II': Record<GenII, Map<string, string>>
	'Generation III': Record<GenIII, Map<string, string>>
	'Generation IV': Record<GenIV, Map<string, string>>
	'Generation V': Record<GenV, Map<string, string>>
	'Generation VI': Record<GenVI, Map<string, string>>
	'Generation VII': Record<GenVII, Map<string, string>>
	'Generation VIII': Record<GenVIII, Map<string, string>>
	'Generation IX': Record<GenIX, Map<string, string>>
}

export type SaveData = (data: Data) => Promise<void>
export type MapReplacer<T> = (_key: string, value: T) => unknown[] | T
