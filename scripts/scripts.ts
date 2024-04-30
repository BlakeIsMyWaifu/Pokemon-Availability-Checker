import { type Generation, type GenerationGames } from '~/types/generationTypes'

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

type GameLocations = {
	[key in Generation]: Record<GenerationGames[key], Map<string, string>>
}
export type GetGameLocations = (pokemonNames: string[]) => Promise<GameLocations>
export type AddPokemonData = (pokemonName: string) => Promise<void>
export type UpdateDataMap = (generation: string, gameName: string, pokemonName: string, method: string) => void

export type SaveData = (data: object, fileName: string) => Promise<void>
export type MapReplacer<T> = (_key: string, value: T) => unknown[] | T
