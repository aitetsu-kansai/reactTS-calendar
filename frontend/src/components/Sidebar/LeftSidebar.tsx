import type { DateValue } from '@heroui/react'
import { Calendar, Divider } from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { FC, useState } from 'react'
import { selectCalendar } from '../../redux/slices/calendarReducer'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import { getDate } from '../../utils/getDate'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const currentDate = parseDate(
		useAppSelector(selectCalendar).currentDate.toISOString().split('T')[0]
	)
	const defaultDate = getDate()

	const [focusedDate, setFocusedDate] = useState<DateValue | null>(defaultDate)
	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible


	return (
		<>
			<div className='flex flex-col items-center text-center'>
				<Sidebar visible={isLeftSidebarVisible}>
					<Calendar
						lang='ru'
						showMonthAndYearPickers
						className='scale-85 overflow-y-hidden overflow-x-hidden'
						value={currentDate}
						aria-label='Date (Controlled Focused Value)'
						// focusedValue={focusedDate}
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
