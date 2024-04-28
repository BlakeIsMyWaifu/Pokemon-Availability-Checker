import { Container, Title } from '@mantine/core'

import Games from '~/components/Games'

export default function App() {
	return (
		<Container fluid p='md'>
			<Title style={{ textAlign: 'center' }}>Pokémon Availability Checker</Title>
			<Games />
		</Container>
	)
}
