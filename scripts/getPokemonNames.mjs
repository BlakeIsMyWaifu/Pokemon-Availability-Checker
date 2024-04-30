/** @type {import('./scripts').GetPokemonNames} */
export default async function getPokemonNames(limit = 20, offset = 0) {

	/** @type {import('./scripts').PokemonListEndpoint} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
		.then(response => response.json())

	/** @type {Record<string, string>} */
	const nameReplace = {
		'nidoran-f': 'nidoran♀',
		'nidoran-m': 'nidoran♂',
		'mr-mime': 'mr._mime',
		'farfetchd': "farfetch'd"
	}

	return data.results.map(result => nameReplace[result.name] ?? result.name)
}