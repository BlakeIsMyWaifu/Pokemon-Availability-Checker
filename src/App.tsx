import { Container, Group, Title } from '@mantine/core'

import Games from '~/components/Games'

import PokemonList from './components/PokemonList'

export default function App() {
	return (
		<Container fluid p='md'>
			<Title style={{ textAlign: 'center' }}>Pokémon Availability Checker</Title>
			<Group align='start'>
				<Games />
				<PokemonList />
			</Group>
		</Container>
	)
}
