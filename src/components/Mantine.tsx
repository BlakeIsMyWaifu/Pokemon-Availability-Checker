import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { type ReactNode } from 'react'

type MantineProps = {
	children: ReactNode
}

export default function Mantine({ children }: MantineProps) {
	return <MantineProvider defaultColorScheme='dark'>{children}</MantineProvider>
}
