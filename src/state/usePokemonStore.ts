import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { getGenerationData } from '~/data/generationData'
import POKEMON from '~/generated/POKEMON.json'
import { nonNullable } from '~/types/filter'
import { type GameName, type Generation } from '~/types/generationTypes'

import { createActionName, type DevTools, type Persist, persistStoreName, type Slice } from './storeTypes'

type PokemonState = {
	available: Record<string, Set<GameName>>
	unavailable: string[]
}

const pokemonState: PokemonState = {
	available: {},
	unavailable: POKEMON
}

type PokemonAction = {
	addGame: (generation: Generation, game: GameName) => void
	removeGame: (game: GameName) => void
}

const actionName = createActionName<keyof PokemonAction>('pokemon')

const createPokemonAction: Slice<PokemonStore, PokemonAction, [DevTools, Persist]> = (set, get) => ({
	addGame: (generation, game) => {
		const gameData = getGenerationData(generation, game)
		const pokemonList = Array.from(gameData.keys())

		const { available } = get()
		pokemonList.forEach(pokemonName => {
			if (available[pokemonName]) {
				available[pokemonName].add(game)
			} else {
				available[pokemonName] = new Set<GameName>([game])
			}
		})

		const unavailable = get().unavailable.filter(pokemonName => !pokemonList.includes(pokemonName))

		set(
			{
				available,
				unavailable
			},
			...actionName('addGame')
		)
	},
	removeGame: game => {
		const addToUnavailable: string[] = []

		const available = Object.fromEntries(
			Object.entries(get().available)
				.map<[string, Set<GameName>] | null>(([pokemonName, games]) => {
					if (games.size === 1) {
						addToUnavailable.push(pokemonName)
						return null
					} else {
						games.delete(game)
						return [pokemonName, games]
					}
				})
				.filter(nonNullable)
		)

		set(state => ({
			available,
			unavailable: state.unavailable.concat(addToUnavailable)
		}))
	}
})

type PokemonStore = PokemonState & PokemonAction

export const usePokemonStore = create<PokemonStore>()(
	devtools(
		persist(
			(...a) => ({
				...pokemonState,
				...createPokemonAction(...a)
			}),
			{ name: persistStoreName('pokemon') }
		),
		{ name: 'Pokemon Store' }
	)
)
