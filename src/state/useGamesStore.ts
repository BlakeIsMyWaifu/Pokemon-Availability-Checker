import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type GameName, type Generation } from '~/types/generationTypes'

import { createActionName, type DevTools, type Persist, persistStoreName, type Slice } from './storeTypes'
import { usePokemonStore } from './usePokemonStore'

type GamesState = {
	generations: {
		[key in Generation]: Partial<Record<GameName, boolean>>
	}
}

const gamesState: GamesState = {
	generations: {
		'Generation I': {
			Red: false,
			Blue: false,
			Yellow: false
		},
		'Generation II': {
			Gold: false,
			Silver: false,
			Crystal: false
		},
		'Generation III': {
			Ruby: false,
			Sapphire: false,
			Emerald: false,
			FireRed: false,
			LeafGreen: false,
			Colosseum: false,
			XD: false
		},
		'Generation IV': {
			Diamond: false,
			Pearl: false,
			Platinum: false,
			HeartGold: false,
			SoulSilver: false,
			'Pal Park': false,
			Pokéwalker: false
		},
		'Generation V': {
			Black: false,
			White: false,
			'Black 2': false,
			'White 2': false,
			'Dream World': false
		},
		'Generation VI': {
			X: false,
			Y: false,
			'Omega Ruby': false,
			'Alpha Sapphire': false
		},
		'Generation VII': {
			Sun: false,
			Moon: false,
			'Ultra Sun': false,
			'Ultra Moon': false,
			"Let's Go Pikachu": false,
			"Let's Go Eevee": false
		},
		'Generation VIII': {
			Sword: false,
			Shield: false,
			'Sword Expansion Pass': false,
			'Shield Expansion Pass': false,
			'Brilliant Diamond': false,
			'Shining Pearl': false,
			'Legends: Arceus': false
		},
		'Generation IX': {
			Scarlet: false,
			Violet: false,
			'Scarlet The Hidden Treasure of Area Zero': false,
			'Violet The Hidden Treasure of Area Zero': false
		}
	}
}

type GamesAction = {
	toggleGame: (generation: Generation, game: GameName) => void
}

const actionName = createActionName<keyof GamesAction>('games')

const createGamesAction: Slice<GamesStore, GamesAction, [DevTools, Persist]> = (set, get) => ({
	toggleGame: (generation, game) => {
		const newState = !get().generations[generation][game]

		const { addGame, removeGame } = usePokemonStore.getState()
		if (newState) {
			addGame(generation, game)
		} else {
			removeGame(game)
		}

		set(
			state => ({
				generations: {
					...state.generations,
					[generation]: {
						...state.generations[generation],
						[game]: newState
					}
				}
			}),
			...actionName('toggleGame')
		)
	}
})

type GamesStore = GamesState & GamesAction

export const useGamesStore = create<GamesStore>()(
	devtools(
		persist(
			(...a) => ({
				...gamesState,
				...createGamesAction(...a)
			}),
			{ name: persistStoreName('games') }
		),
		{ name: 'Games Store' }
	)
)
