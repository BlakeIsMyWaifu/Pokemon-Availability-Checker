import generationsJson from '~/generated/GENERATIONS.json'
import { type GameName, type Generation, type GenerationGames } from '~/types/generationTypes'
import { typedObject } from '~/types/typedObject'

type PokemonName = string
type Method = string

const generationData = new Map(
	typedObject
		.entries(generationsJson)
		.map<[Generation, Map<GameName, Map<PokemonName, Method>>]>(([generation, games]) => {
			return [
				generation,
				new Map(
					typedObject.entries(games).map<[GameName, Map<PokemonName, Method>]>(([gameName, pokemonData]) => {
						return [gameName, new Map(pokemonData as [string, string][])]
					})
				)
			]
		})
)

export function getGenerationData<T extends Generation>(generation: T, game: GenerationGames[T]) {
	// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
	return generationData.get(generation)?.get(game)!
}
