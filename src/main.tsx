import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import Mantine from './components/Mantine.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Mantine>
			<App />
		</Mantine>
	</React.StrictMode>
)
