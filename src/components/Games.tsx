import { Card, Group, HoverCard, Image, Space, Stack, Text, Title } from '@mantine/core'
import { type GameName, type Generations } from 'scripts/types'

import { gameBoxArt } from '~/data/games'
import { useGamesStore } from '~/state/useGamesStore'
import { typedObject } from '~/utils/typedObject'

export default function Games() {
	return (
		<Stack>
			{typedObject.entries(gameBoxArt).map(([generation, games]) => {
				return <Generation key={generation} title={generation} games={games} />
			})}
		</Stack>
	)
}

type GenerationProps = {
	title: keyof Generations
	games: Generations[keyof Generations][]
}

function Generation({ title, games }: GenerationProps) {
	const gamesToggled: Partial<Record<GameName, boolean>> = useGamesStore(state => state[title])
	const toggleGame = useGamesStore(state => state.toggleGame)

	return (
		<Card style={{ maxWidth: '560px' }}>
			<Title order={2}>{title}</Title>
			<Space h='sm' />
			<Group>
				{games.map(game => {
					const name = game.replaceAll(' ', '_').replace("'", '').replace(':', '')
					const isActive = gamesToggled[game]!
					return (
						<Group key={game}>
							<HoverCard openDelay={100} closeDelay={100}>
								<HoverCard.Target>
									<Image
										src={`boxArt/${name}.png`}
										w={120}
										style={{
											filter: `grayscale(${isActive ? 0 : 1})`,
											cursor: 'pointer'
										}}
										onMouseDown={event => event.preventDefault()}
										onClick={() => toggleGame(title, game)}
									/>
								</HoverCard.Target>
								<HoverCard.Dropdown>
									<Text>{game}</Text>
								</HoverCard.Dropdown>
							</HoverCard>
						</Group>
					)
				})}
			</Group>
		</Card>
	)
}
