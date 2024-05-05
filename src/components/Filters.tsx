import { Card, Checkbox, Group, Stack, Title } from '@mantine/core'

import { generationGames } from '~/data/games'
import { type BasicFilter, usePokemonStore } from '~/state/usePokemonStore'
import { type Generation } from '~/types/generationTypes'
import { typedObject } from '~/types/typedObject'

export default function Filters() {
	return (
		<Stack>
			<Title order={2}>Filters</Title>
			<Card>
				<Stack>
					<Filter name='trade' />
					<Group>
						{typedObject
							.keys(generationGames)
							.reverse()
							.map(generation => {
								return <GenerationFilter key={generation} generation={generation} />
							})}
					</Group>
				</Stack>
			</Card>
		</Stack>
	)
}

type FilterProps = {
	name: BasicFilter
}

function Filter({ name }: FilterProps) {
	const isChecked = usePokemonStore(state => state.filters[name])
	const toggleFilter = usePokemonStore(state => state.toggleFilter)

	return (
		<Checkbox
			label={name.charAt(0).toUpperCase() + name.slice(1)}
			checked={isChecked}
			onChange={() => toggleFilter(name)}
		/>
	)
}

type GenerationFilterProps = {
	generation: Generation
}

function GenerationFilter({ generation }: GenerationFilterProps) {
	const isChecked = usePokemonStore(state => state.filters.generation[generation])
	const toggleGenerationFilter = usePokemonStore(state => state.toggleGenerationFilter)

	return (
		<Checkbox
			label={generation.charAt(0).toUpperCase() + generation.slice(1)}
			checked={isChecked}
			onChange={() => toggleGenerationFilter(generation)}
		/>
	)
}
