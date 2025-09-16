import type { DateValue } from '@heroui/react'
import { Calendar, Divider } from '@heroui/react'
import { CalendarDate, parseDate } from '@internationalized/date'
import { FC, useState } from 'react'
import { selectCalendar } from '../../redux/slices/calendarReducer'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import { getDate } from '../../utils/getDate'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const currentDate = parseDate(
		useAppSelector(selectCalendar).currentDate.split('T')[0]
	)
	const defaultDate = getDate()

	console.log(defaultDate)

	const [focusedDate, setFocusedDate] = useState<DateValue | null>(defaultDate)
	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible

	const {currentYear, currentWeek} = useAppSelector(selectCalendar)

	const getDateValueFromWeek = (
		weekNumber: number,
		year: number
	): any => {
		// Находим понедельник нужной недели
		const jan4 = new Date(year, 0, 4)
		const firstMonday = new Date(jan4)
		firstMonday.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1)

		console.log(firstMonday)
		const targetDate = new Date(firstMonday)
		targetDate.setDate(firstMonday.getDate() + (weekNumber - 1) * 7)


		// Конвертируем в CalendarDate
		return new CalendarDate(
			targetDate.getFullYear(),
			targetDate.getMonth() + 1,
			targetDate.getDate()
		)
	}

	console.log(getDateValueFromWeek(currentWeek, currentYear))

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
