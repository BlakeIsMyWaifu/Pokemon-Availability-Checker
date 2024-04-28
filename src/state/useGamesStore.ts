import { type GameName, type Generations } from 'scripts/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type DevTools, type Persist, type Slice } from './storeTypes'

type GamesState = {
	[key in keyof Generations]: Partial<Record<GameName, boolean>>
}

const gamesState: GamesState = {
	'Generation I': {
		Red: false,
		Blue: false,
		Green: false,
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

type GamesAction = {
	toggleGame: (generation: keyof GamesState, game: GameName) => void
}

const createGamesAction: Slice<GamesStore, GamesAction, [DevTools, Persist]> = set => ({
	toggleGame: (generation, game) => {
		set(state => ({
			[generation]: {
				...state[generation],
				[game]: !state[generation][game]
			}
		}))
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
			{ name: 'pokemon-availability-checker-games' }
		),
		{ name: 'Games Store' }
	)
)
