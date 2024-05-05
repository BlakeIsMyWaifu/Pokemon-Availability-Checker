import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { getGenerationData } from '~/data/generationData'
import POKEMON from '~/generated/POKEMON.json'
import { nonNullable } from '~/types/filter'
import { type GameName, type Generation } from '~/types/generationTypes'
import { typedObject } from '~/types/typedObject'

import { createActionName, type DevTools, type Persist, persistStoreName, type Slice } from './storeTypes'
import { useGamesStore } from './useGamesStore'

export type BasicFilter = 'trade'
type PokemonState = {
	available: Record<string, GameName[]>
	unavailable: string[]
	filters: {
		trade: boolean
		generation: Record<Generation, boolean>
	}
}

const pokemonState: PokemonState = {
	available: {},
	unavailable: POKEMON,
	filters: {
		trade: false,
		generation: {
			'Generation I': true,
			'Generation II': true,
			'Generation III': true,
			'Generation IV': true,
			'Generation V': true,
			'Generation VI': true,
			'Generation VII': true,
			'Generation VIII': true,
			'Generation IX': true
		}
	}
}

type PokemonAction = {
	addGame: (generation: Generation, game: GameName) => void
	removeGame: (game: GameName) => void
	toggleFilter: (filter: BasicFilter) => void
	toggleGenerationFilter: (generation: Generation) => void
	refreshGames: () => void
}

const actionName = createActionName<keyof PokemonAction>('pokemon')

const createPokemonAction: Slice<PokemonStore, PokemonAction, [DevTools, Persist]> = (set, get) => ({
	addGame: (generation, game) => {
		const gameData = getGenerationData(generation, game)

		const { available } = get()
		for (const [pokemonName, method] of gameData) {
			if (!get().filters.trade && method.startsWith('Trade')) {
				continue
			}

			if (available[pokemonName]) {
				available[pokemonName].push(game)
			} else {
				available[pokemonName] = [game]
			}
		}

		const unavailable = get().unavailable.filter(pokemonName => !Object.keys(available).includes(pokemonName))

		set({ available, unavailable }, ...actionName('addGame'))
	},
	removeGame: game => {
		const addToUnavailable: string[] = []

		const available = Object.fromEntries(
			Object.entries(get().available)
				.map<[string, GameName[]] | null>(([pokemonName, games]) => {
					if (games.length === 1 && games[0] === game) {
						addToUnavailable.push(pokemonName)
						return null
					} else {
						return [pokemonName, games.filter(g => game !== g)]
					}
				})
				.filter(nonNullable)
		)

		set(
			state => ({
				available,
				unavailable: state.unavailable.concat(addToUnavailable)
			}),
			...actionName('removeGame')
		)
	},
	toggleFilter: filter => {
		set(
			state => ({
				filters: {
					...state.filters,
					[filter]: !state.filters[filter]
				}
			}),
			...actionName('toggleFilter')
		)

		get().refreshGames()
	},
	toggleGenerationFilter: generation => {
		set(
			state => ({
				filters: {
					...state.filters,
					generation: {
						...state.filters.generation,
						[generation]: !state.filters.generation[generation]
					}
				}
			}),
			...actionName('toggleGenerationFilter')
		)
	},
	refreshGames: () => {
		set(
			{
				available: {},
				unavailable: POKEMON
			},
			...actionName('refreshGames')
		)

		const { generations } = useGamesStore.getState()
		const activeGames = typedObject
			.entries(generations)
			.flatMap(([generation, games]) => {
				const gamesList = typedObject.entries(games).filter(([_game, active]) => active)
				if (!gamesList.length) return null
				return gamesList.map<[Generation, GameName]>(([game, _active]) => [generation, game])
			})
			.filter(nonNullable)

		const { addGame } = usePokemonStore.getState()
		activeGames.forEach(([generation, game]) => addGame(generation, game))
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
