import type { DateValue } from '@heroui/react'
import { Calendar, Divider } from '@heroui/react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { FC, useState } from 'react'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const defaultDate = today(getLocalTimeZone())
	const [focusedDate, setFocusedDate] = useState<DateValue | null>(defaultDate)
	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible

	console.log(isLeftSidebarVisible)
	return (
		<>
			<div className='flex flex-col'>
				<Sidebar visible={isLeftSidebarVisible}>
					<Calendar
						className='scale-85 overflow-y-hidden overflow-x-hidden max-w-100'
						value={defaultDate}
						aria-label='Date (Controlled Focused Value)'
						focusedValue={focusedDate}
						onFocusChange={setFocusedDate}
					/>
					<Divider className='my-2' />
				</Sidebar>
			</div>
			<Divider
				className={`${
					!isLeftSidebarVisible ? 'hidden' : ''
				} transition-all duration-300`}
				orientation='vertical'
			/>
		</>
	)
}

export default LeftSidebar
