import { Divider } from '@heroui/react'
import './App.css'
import LeftSidebar from './components/Sidebar/LeftSidebar'

function App() {
	return (
		<div className='flex h-screen w-screen'>
			<LeftSidebar />
			<Divider orientation='vertical' />
			<div className='w-3/4 text-center'>Основная часть</div>
			<div className='w-1/5 text-center'>Правый сайдбар</div>
		</div>
	)
}

export default App
