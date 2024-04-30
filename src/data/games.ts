import { type Generation, type GenerationGames } from '~/types/generationTypes'

type GameBoxArt = {
	[key in Generation]: GenerationGames[key][]
}

export const gameBoxArt = {
	'Generation IX': [
		'Scarlet',
		'Violet',
		'Scarlet The Hidden Treasure of Area Zero',
		'Violet The Hidden Treasure of Area Zero'
	],
	'Generation VIII': [
		'Sword',
		'Shield',
		'Sword Expansion Pass',
		'Shield Expansion Pass',
		'Brilliant Diamond',
		'Shining Pearl',
		'Legends: Arceus'
	],
	'Generation VII': ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon', "Let's Go Pikachu", "Let's Go Eevee"],
	'Generation VI': ['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'],
	'Generation V': ['Black', 'White', 'Black 2', 'White 2'], // Dream World
	'Generation IV': ['Diamond', 'Pearl', 'Platinum', 'HeartGold', 'SoulSilver'], // Pal Park
	'Generation III': ['Ruby', 'Sapphire', 'Emerald', 'FireRed'],
	'Generation II': ['Gold', 'Silver', 'Crystal'],
	'Generation I': ['Red', 'Blue', 'Yellow'] // Green
} as const satisfies GameBoxArt
