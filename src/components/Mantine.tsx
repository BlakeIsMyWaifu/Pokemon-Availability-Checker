import '@mantine/core/styles.css'

import { createTheme, MantineProvider } from '@mantine/core'
import { type ReactNode } from 'react'

const theme = createTheme({
	cursorType: 'pointer'
})

type MantineProps = {
	children: ReactNode
}

export default function Mantine({ children }: MantineProps) {
	return (
		<MantineProvider defaultColorScheme='dark' theme={theme}>
			{children}
		</MantineProvider>
	)
}
