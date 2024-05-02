import { Container, Group, Stack, Title } from '@mantine/core'

import Games from '~/components/Games'

import Filters from './components/Filters'
import PokemonList from './components/PokemonList'

export default function App() {
	return (
		<Container fluid p='md'>
			<Title style={{ textAlign: 'center' }}>Pokémon Availability Checker</Title>
			<Group align='start'>
				<Games />
				<Stack style={{ flex: '1' }} gap='xl'>
					<PokemonList />
					<Filters />
				</Stack>
			</Group>
		</Container>
	)
}
