import getGameLocations from './getGameLocations.mjs'
import getPokemonNames from './getPokemonNames.mjs'
import saveData from './saveData.mjs'

// eslint-disable-next-line no-undef
process.env.LOG = process.argv[2] === '--log'

const pokemonNames = await getPokemonNames()
await saveData(Array.from(pokemonNames), 'POKEMON')

const gameLocations = await getGameLocations(pokemonNames)
await saveData(gameLocations, 'GENERATIONS')