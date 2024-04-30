import getGameLocations from './getGameLocations.mjs'
import getPokemonNames from './getPokemonNames.mjs'
import saveData from './saveData.mjs'

// eslint-disable-next-line no-undef
process.env.LOG = process.argv[2] === '--log'

const POKEMON_NUMBER = 151
const pokemonNames = await getPokemonNames(POKEMON_NUMBER)
await saveData(pokemonNames, 'POKEMON')

const gameLocations = await getGameLocations(pokemonNames)
await saveData(gameLocations, 'GENERATIONS')