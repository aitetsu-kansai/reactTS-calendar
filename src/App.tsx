import './App.css'
import Header from './components/Header/Header'
import LeftSidebar from './components/Sidebar/LeftSidebar'

function App() {
	return (
		<div className='h-screen w-screen overflow-x-hidden'>
			<Header />
			<div className='flex h-screen w-screen'>
				<LeftSidebar />
				<div className='w-full text-left bg-blue-500'>Основная часть</div>
				<div className='w-1/6 text-center'>Правый сайдбар</div>
			</div>
		</div>
	)
}

export default App
