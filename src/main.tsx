import { HeroUIProvider } from '@heroui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<HeroUIProvider>
		<StrictMode>
			<main className='dark text-foreground bg-background h-[100vh] flex flex-col justify-center items-center gap-4'>
				<App />
			</main>
		</StrictMode>
	</HeroUIProvider>
)
