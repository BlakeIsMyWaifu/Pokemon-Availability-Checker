import { Card, Checkbox, Stack, Title } from '@mantine/core'

import { type Filter, usePokemonStore } from '~/state/usePokemonStore'

export default function Filters() {
	return (
		<Stack>
			<Title order={2}>Filters</Title>
			<Card>
				<Stack>
					<Filter name='trade' />
				</Stack>
			</Card>
		</Stack>
	)
}

type FilterProps = {
	name: Filter
}

function Filter({ name: filter }: FilterProps) {
	const isChecked = usePokemonStore(state => state.filters[filter])
	const toggleFilter = usePokemonStore(state => state.toggleFilter)

	return (
		<Checkbox
			label={filter.charAt(0).toUpperCase() + filter.slice(1)}
			checked={isChecked}
			onChange={() => toggleFilter(filter)}
		/>
	)
}
