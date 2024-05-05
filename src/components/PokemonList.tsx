import { Card, Stack, Text, Title } from '@mantine/core'
import { useMemo } from 'react'

import { usePokemonStore } from '~/state/usePokemonStore'
import { type Generation } from '~/types/generationTypes'

function formatPokemonList(pokemonNames: string[], generationFilters: Record<Generation, boolean>) {
	return formatNames(filterGeneration(pokemonNames, generationFilters))
}

function formatNames(pokemonNames: string[]) {
	return pokemonNames
		.sort((a, b) => +a.split('#')[0] - +b.split('#')[0])
		.map(name => name.split('#')[1].replaceAll('_', ' '))
		.join(', ')
}

function filterGeneration(pokemonNames: string[], generationFilters: Record<Generation, boolean>) {
	return pokemonNames.filter(pokemonName => {
		const id = +pokemonName.split('#')[0]
		const generationCap: Record<number, Generation> = {
			151: 'Generation I',
			251: 'Generation II',
			386: 'Generation III',
			494: 'Generation IV',
			649: 'Generation V',
			721: 'Generation VI',
			809: 'Generation VII',
			905: 'Generation VIII',
			1025: 'Generation IX'
		}
		for (const idCap in generationCap) {
			if (id <= +idCap) return generationFilters[generationCap[idCap]]
		}
	})
}

export default function PokemonList() {
	return (
		<Stack>
			<Title order={2}>Pokemon</Title>
			<AvailablePokemon />
			<UnavailablePokemon />
		</Stack>
	)
}

function AvailablePokemon() {
	const unavailablePokemon = usePokemonStore(state => state.unavailable)
	const availablePokemon = Object.keys(usePokemonStore(state => state.available))
	const generationFilters = usePokemonStore(state => state.filters.generation)

	const list = useMemo(
		() => formatPokemonList(availablePokemon, generationFilters),
		// adding unavailable was the simplest way to rerender this
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[availablePokemon, generationFilters, unavailablePokemon]
	)

	return (
		<Card>
			<Title order={3}>Available</Title>
			<Text>{list}</Text>
		</Card>
	)
}

function UnavailablePokemon() {
	const unavailablePokemon = usePokemonStore(state => state.unavailable)
	const generationFilters = usePokemonStore(state => state.filters.generation)

	return (
		<Card>
			<Title order={3}>Unavailable</Title>
			<Text>{formatPokemonList(unavailablePokemon, generationFilters)}</Text>
		</Card>
	)
}
