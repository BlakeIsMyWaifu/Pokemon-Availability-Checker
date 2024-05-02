/** @type {import('./scripts').GetPokemonNames} */
export default async function getPokemonNames(limit = -1, offset = 0) {

	let newLimit = limit
	if (limit === -1) {
		const { count } = await fetchPokemon(1, 0)
		newLimit = count
	}

	const data = await fetchPokemon(newLimit, offset)

	/** @type {Map<string, string>} */
	const nameReplace = new Map([
		['nidoran-f', 'Nidoran♀'],
		['nidoran-m', 'Nidoran♂'],
		['mr-mime', 'Mr._Mime'],
		['farfetchd', "Farfetch'd"],
		['ho-oh', 'Ho-Oh'],
		['mime-jr', 'Mime_Jr.'],
		['type-null', 'Type:_Null'],
		['jangmo-o', 'Jangmo-o'],
		['hakamo-o', 'Hakamo-o'],
		['kommo-o', 'Kommo-o'],
		['tapu-koko', 'Tapu_Koko'],
		['tapu-lele', 'Tapu_Lele'],
		['tapu-bulu', 'Tapu_Bulu'],
		['tapu-fini', 'Tapu_Fini'],
		['sirfetchd', "Sirfetch'd"],
		['mr-rime', 'Mr._Rime'],
		['great-tusk', 'Great_Tusk'],
		['scream-tail', 'Scream_Tail'],
		['brute-bonnet', 'Brute_Bonnet'],
		['flutter-mane', 'Flutter_Mane'],
		['slither-wing', 'Slither_Wing'],
		['sandy-shocks', 'Sandy_Shocks'],
		['iron-treads', 'Iron_Treads'],
		['iron-bundle', 'Iron_Bundle'],
		['iron-hands', 'Iron_Hands'],
		['iron-jugulis', 'Iron_Jugulis'],
		['iron-moth', 'Iron_Moth'],
		['iron-thorns', 'Iron_Thorns'],
		['wo-chien', 'Wo-Chien'],
		['chien-pao', 'Chien-Pao'],
		['ting-lu', 'Ting-Lu'],
		['chi-yu', 'Chi-Yu'],
		['roaring-moon', 'Roaring_Moon'],
		['iron-valiant', 'Iron_Valiant'],
		['walking-wake', 'Walking_Wake'],
		['iron-leaves', 'Iron_Leaves'],
		['gouging-fire', 'Gouging_Fire'],
		['raging-bolt', 'Raging_Bolt'],
		['iron-boulder', 'Iron_Boulder'],
		['iron-crown', 'Iron_Crown'],
	])

	/** @type {Set<string>} */
	const out = new Set()

	for (let i = 0; i < data.results.length; i++) {
		const result = data.results[i];
		if (result.name === 'deoxys-attack') break
		const name = nameReplace.get(result.name) ?? capitalise(result.name.split('-')[0])
		out.add(`${i + 1}#${name}`)
	}

	return out
}

/** @type {import('./scripts').FetchPokemon} */
async function fetchPokemon(limit, offset) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
		.then(response => response.json())
}

/** @type {import('./scripts').Capitalise} */
function capitalise(word) {
	return word.charAt(0).toUpperCase() + word.slice(1)
}