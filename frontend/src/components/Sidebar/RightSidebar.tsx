import { FC } from 'react'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import Sidebar from './Sidebar'

const RightSidebar: FC = () => {
	const isRightSidebarVisible =
		useAppSelector(selectSidebarsStatus).isRightSidebarVisible
	return (
		<>
			<div className='flex flex-col'>
				<Sidebar visible={isRightSidebarVisible}></Sidebar>
			</div>
		</>
	)
}

export default RightSidebar
