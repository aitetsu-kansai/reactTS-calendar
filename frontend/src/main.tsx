import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.js'
import './index.css'
import store from './redux/store.js'

createRoot(document.getElementById('root')!).render(
	<HeroUIProvider>
		<NextThemesProvider defaultTheme='dark' attribute='class'>
			<Provider store={store}>
				<StrictMode>
					<main className='text-foreground bg-background h-[100vh] flex flex-col justify-center items-center gap-4'>
						<App />
					</main>
				</StrictMode>
			</Provider>
		</NextThemesProvider>
	</HeroUIProvider>
)
