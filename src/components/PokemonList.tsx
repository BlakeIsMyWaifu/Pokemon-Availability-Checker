import { Card, Stack, Text, Title } from '@mantine/core'

import { usePokemonStore } from '~/state/usePokemonStore'

export default function PokemonList() {
	const availablePokemon = usePokemonStore(state => state.available)
	const unavailablePokemon = usePokemonStore(state => state.unavailable)

	return (
		<Stack style={{ flex: '1' }}>
			<Title order={2}>Pokemon</Title>
			<Card>
				<Title order={3}>Available</Title>
				<Text>{Object.keys(availablePokemon).join(', ')}</Text>
			</Card>
			<Card>
				<Title order={3}>Unavailable</Title>
				<Text>{unavailablePokemon.join(', ')}</Text>
			</Card>
		</Stack>
	)
}
