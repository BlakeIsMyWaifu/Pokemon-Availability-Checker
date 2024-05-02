import { Card, Stack, Text, Title } from '@mantine/core'

import { usePokemonStore } from '~/state/usePokemonStore'

function formatList(pokemonNames: string[]) {
	return pokemonNames
		.sort((a, b) => +a.split('#')[0] - +b.split('#')[0])
		.map(name => name.split('#')[1].replaceAll('_', ' '))
		.join(', ')
}

export default function PokemonList() {
	const availablePokemon = usePokemonStore(state => state.available)
	const unavailablePokemon = usePokemonStore(state => state.unavailable)

	return (
		<Stack>
			<Title order={2}>Pokemon</Title>
			<Card>
				<Title order={3}>Available</Title>
				<Text>{formatList(Object.keys(availablePokemon))}</Text>
			</Card>
			<Card>
				<Title order={3}>Unavailable</Title>
				<Text>{formatList(unavailablePokemon)}</Text>
			</Card>
		</Stack>
	)
}
