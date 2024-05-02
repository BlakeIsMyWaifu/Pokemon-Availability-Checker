import { type Generation, type GenerationGames } from '~/types/generationTypes'

export type GetPokemonNames = (limit?: number, offset?: number) => Promise<Set<string>>
export type FetchPokemon = (limit: number, offset: number) => Promise<PokemonListEndpoint>
export type Capitalise = (string: string) => string
type PokemonListEndpoint = {
	count: number
	next: string
	previous: string
	results: results[]
}
type results = {
	name: string
	url: string
}

type GameLocations = {
	[key in Generation]: Record<GenerationGames[key], Map<string, string>>
}
export type GetGameLocations = (pokemonNames: Set<string>) => Promise<GameLocations>
export type AddPokemonData = (pokemonName: string) => Promise<void>
export type UpdateDataMap = (generation: string, gameName: string, pokemonName: string, method: string) => void

export type SaveData = (data: object, fileName: string) => Promise<void>
export type MapReplacer<T> = (_key: string, value: T) => unknown[] | T
