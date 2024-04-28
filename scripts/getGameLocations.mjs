/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { JSDOM } from 'jsdom'

/** @type {import('./types').GetGameLocations} */
export default async function getGameLocations(pokemonNames) {

	/** @type {import('./types').Data} */
	const data = {
		'Generation I': {
			'Red': new Map(),
			'Blue': new Map(),
			'Green': new Map(),
			'Yellow': new Map()
		},
		'Generation II': {
			'Gold': new Map(),
			'Silver': new Map(),
			'Crystal': new Map()
		},
		'Generation III': {
			'Ruby': new Map(),
			'Sapphire': new Map(),
			'Emerald': new Map(),
			'FireRed': new Map(),
			'LeafGreen': new Map(),
			'Colosseum': new Map(),
			'XD': new Map()
		},
		'Generation IV': {
			'Diamond': new Map(),
			'Pearl': new Map(),
			'Platinum': new Map(),
			'HeartGold': new Map(),
			'SoulSilver': new Map(),
			'Pal Park': new Map(),
			'Pokéwalker': new Map()
		},
		'Generation V': {
			'Black': new Map(),
			'White': new Map(),
			'Black 2': new Map(),
			'White 2': new Map(),
			'Dream World': new Map()
		},
		'Generation VI': {
			'X': new Map(),
			'Y': new Map(),
			'Omega Ruby': new Map(),
			'Alpha Sapphire': new Map()
		},
		'Generation VII': {
			'Sun': new Map(),
			'Moon': new Map(),
			'Ultra Sun': new Map(),
			'Ultra Moon': new Map(),
			"Let's Go Pikachu": new Map(),
			"Let's Go Eevee": new Map()
		},
		'Generation VIII': {
			'Sword': new Map(),
			'Shield': new Map(),
			'Expansion Pass': new Map(),
			'Brilliant Diamond': new Map(),
			'Shining Pearl': new Map(),
			'Legends: Arceus': new Map()
		},
		'Generation IX': {
			'Scarlet': new Map(),
			'Violet': new Map(),
			'The Hidden Treasure of Area Zero': new Map()
		}
	}

	/** @type {Set<string>} */
	const failedPokemon = new Set()

	/** @type {import('./types').AddPokemonData} */
	async function addPokemonData(pokemonName) {
		const raw = await fetch(`https://bulbapedia.bulbagarden.net/wiki/${pokemonName}_(Pokémon)`)
			.then(response => response.text())
		const { document } = new JSDOM(raw).window

		const gameLocationHeader = document.querySelector('#Game_locations')
		const gameLocationTable = gameLocationHeader.parentNode.nextSibling.nextSibling
		const generationParent = gameLocationTable.childNodes[1].childNodes
		const tr = [...generationParent].filter(node => node.nodeName == 'TR')

		tr.forEach(generation => {
			if (generation.childNodes[1].nodeName === 'TH') return

			const generationTbody = generation.childNodes[1].childNodes[1].childNodes[1]

			const dataTbody = generationTbody.childNodes[2].childNodes[1].childNodes[1].childNodes[1]
			const gameRow = [...dataTbody.childNodes].filter(node => node.nodeName === 'TR')

			/** @type {`Generation ${string}`} */
			const generationNumber = generationTbody.childNodes[0].childNodes[1].childNodes[0].textContent

			gameRow.forEach(row => {
				const [method, ...games] = [...row.childNodes].reverse().filter(node => node.nodeName !== '#text')

				/** @type {string} */
				const methodText = method.childNodes[1].childNodes[1].childNodes[0].childNodes[1].textContent.slice(0, -1)

				/** @type {import('./types').Games[]} */
				const gamesText = games.map(node => node.childNodes[0].textContent.trim())

				gamesText.forEach(gameText => {
					// TODO split region / DLC versions
					let [gameName] = gameText.split(' (')
					if (gameName.includes('Expansion Pass')) {
						gameName = 'Expansion Pass'
					}

					/** @type {Map<string, string>} */
					const map = data[generationNumber][gameName]
					map.set(pokemonName, methodText)
				})
			})
		})

		if (process.env.LOG === 'true') {
			console.log(`✅ ${pokemonName}`)
		}
	}

	for (const pokemonName of pokemonNames) {
		await addPokemonData(pokemonName).catch(_error => {
			console.error(`❌ ${pokemonName}`)
			failedPokemon.add(pokemonName)
		})
	}

	for (const pokemonName of Array.from(failedPokemon)) {
		await addPokemonData(pokemonName).catch(error => {
			console.error(`❌ ${pokemonName}`, error)
		})
	}

	return data
}