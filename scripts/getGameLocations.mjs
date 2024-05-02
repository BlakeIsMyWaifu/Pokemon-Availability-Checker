/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { JSDOM } from 'jsdom'

/** @type {import('./scripts').GetGameLocations} */
export default async function getGameLocations(pokemonNames) {

	/** @type {import('./scripts').Data} */
	const data = {
		'Generation I': {
			'Red': new Map(),
			'Blue': new Map(),
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
			'Sword Expansion Pass': new Map(),
			'Shield Expansion Pass': new Map(),
			'Brilliant Diamond': new Map(),
			'Shining Pearl': new Map(),
			'Legends: Arceus': new Map()
		},
		'Generation IX': {
			'Scarlet': new Map(),
			'Violet': new Map(),
			'Scarlet The Hidden Treasure of Area Zero': new Map(),
			'Violet The Hidden Treasure of Area Zero': new Map()
		}
	}

	/** @type {import('./scripts').UpdateDataMap} */
	function updateDataMap(generation, gameName, pokemonName, method) {
		/** @type {Map<string, string>} */
		const map = data[generation][gameName]
		map.set(pokemonName, method)
	}

	/** @type {Set<string>} */
	const failedPokemon = new Set()

	/** @type {import('./scripts').AddPokemonData} */
	async function addPokemonData(pokemonName) {
		const raw = await fetch(`https://bulbapedia.bulbagarden.net/wiki/${pokemonName}_(Pokémon)`)
			.then(response => response.text())
		const { document } = new JSDOM(raw).window

		const gameLocationHeader = document.querySelector('#Game_locations')
		let gameLocationTable = gameLocationHeader.parentNode.nextSibling.nextSibling
		if (gameLocationTable.nodeName !== 'TABLE') {
			gameLocationTable = gameLocationTable.nextSibling.nextSibling
		}
		if (pokemonName === 'Magearna') {
			gameLocationTable = gameLocationTable.nextSibling.nextSibling
		}

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
				if (methodText === 'Unobtainable') return

				/** @type {import('../src/types/generationTypes').GameName[]} */
				const gamesText = games.map(node => node.childNodes[0].textContent.trim())

				gamesText.forEach(gameText => {
					if (gameText.includes('Japan')) return

					if (gameText === 'Expansion Pass') {
						updateDataMap(generationNumber, 'Sword Expansion Pass', pokemonName, methodText)
						updateDataMap(generationNumber, 'Shield Expansion Pass', pokemonName, methodText)
					} else if (gameText.includes('The Hidden Treasure of Area Zero')) {
						if (gameText.includes('Scarlet')) {
							updateDataMap(generationNumber, 'Scarlet The Hidden Treasure of Area Zero', pokemonName, methodText)
						} else if (gameText.includes('Violet')) {
							updateDataMap(generationNumber, 'Violet The Hidden Treasure of Area Zero', pokemonName, methodText)
						} else {
							updateDataMap(generationNumber, 'Scarlet The Hidden Treasure of Area Zero', pokemonName, methodText)
							updateDataMap(generationNumber, 'Violet The Hidden Treasure of Area Zero', pokemonName, methodText)
						}
					} else {
						updateDataMap(generationNumber, gameText, pokemonName, methodText)
					}
				})
			})
		})

		// eslint-disable-next-line no-undef
		if (process.env.LOG === 'true') {
			console.log(`✅ ${pokemonName}`)
		}
	}

	for (const pokemonName of Array.from(pokemonNames)) {
		await addPokemonData(pokemonName).catch(_error => {
			console.error(`❌ ${pokemonName}`)
			failedPokemon.add(pokemonName)
		})
	}

	for (const pokemonName of Array.from(failedPokemon)) {
		await addPokemonData(pokemonName).catch(error => {
			console.error(`❌ ${pokemonName}`)
			console.error(error)
		})
	}

	return data
}
