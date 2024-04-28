import { Card, Group, Image, Space, Stack, Title } from '@mantine/core'
import { type Games } from 'scripts/types'

import { gameBoxArt } from '~/data/games'

export default function Games() {
	return (
		<Stack>
			{Object.entries(gameBoxArt).map(([a, b]) => {
				return <Generation key={a} title={a} games={b} />
			})}
		</Stack>
	)
}

type GenerationProps = {
	title: string
	games: string[]
}

function Generation({ title, games }: GenerationProps) {
	return (
		<Card style={{ maxWidth: '560px' }}>
			<Title order={2}>{title}</Title>
			<Space h='sm' />
			<Group>
				{games.map(game => {
					const name = game.replaceAll(' ', '_').replace("'", '').replace(':', '')
					return <Image key={game} src={`boxArt/${name}.png`} w={120} />
				})}
			</Group>
		</Card>
	)
}
