import { Calendar } from '@heroui/react'
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
				<Sidebar visible={isRightSidebarVisible}>
					<>
						<Calendar
							weekdayStyle='short'
							color='foreground'
							className='overflow-y-hidden overflow-x-hidden scale-85'
							classNames={{
								headerWrapper: 'bg-[#27272C] border-b-1 border-[#27272C]',
								header: 'bg-[#27272A]',
								gridHeader: 'bg-[#27272A]',
								content: 'bg-component-bg',
							}}
							aria-label='Date (Controlled Focused Value)'
						/>
					</>
				</Sidebar>
			</div>
		</>
	)
}

export default RightSidebar
