import './App.css'
import Header from './components/Header/Header'
import LeftSidebar from './components/Sidebar/LeftSidebar'
import RightSidebar from './components/Sidebar/RightSidebar'
import { useAppSelector } from './redux/slices/hooks'
import { selectSidebarsStatus } from './redux/slices/uiSlice'

function App() {
	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible
	const isRightSidebarVisible =
		useAppSelector(selectSidebarsStatus).isRightSidebarVisible
	return (
		<div className='h-screen w-screen overflow-x-hidden'>
			<Header />
			<div className='flex h-screen w-screen'>
				<div
					className={`
						transition-all duration-300 ease-in-out overflow-hidden
						${isLeftSidebarVisible ? 'max-w-[40%] w-100' : 'max-w-0 w-0'}
					`}
				>
					<LeftSidebar />
				</div>
				<div className='w-full text-left bg-blue-500'>Основная часть</div>
				<div
					className={`
						transition-all duration-300 ease-in-out overflow-hidden
						${isRightSidebarVisible ? 'max-w-[20%] w-1/5' : 'max-w-0 w-0'}
					
					`}
				>
					<RightSidebar />
				</div>
			</div>
		</div>
	)
}

export default App
