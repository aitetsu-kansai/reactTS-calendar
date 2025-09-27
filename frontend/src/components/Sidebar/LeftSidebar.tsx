import type { DateValue } from '@heroui/react'
import { Calendar, Divider } from '@heroui/react'
import { CalendarDate } from '@internationalized/date'
import { FC, useEffect, useState } from 'react'
import {
	selectCalendar,
	setVisibleWeek,
} from '../../redux/slices/calendarReducer'
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import { getWeekNumber } from '../../utils/calendarHelpers'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const dispatch = useAppDispatch()
	const [focusedDate, setFocusedDate] = useState<DateValue | null>(null)
	// const weekNum = getWeekNumber(focusedDate?.toDate)

	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible

	const { currentYear, visibleWeek } = useAppSelector(selectCalendar)

	const getDateValueFromWeek = (weekNumber: number, year: number): any => {
		const jan4 = new Date(Number(year), 0, 4)

		const firstMonday = new Date(jan4)

		const targetDate = new Date(firstMonday)
		targetDate.setDate(firstMonday.getDate() + (Number(weekNumber) - 1) * 7)

		return new CalendarDate(
			targetDate.getFullYear(),
			targetDate.getMonth() + 1,
			targetDate.getDate()
		)
	}

	useEffect(() => {
		setFocusedDate(getDateValueFromWeek(visibleWeek, currentYear))
	}, [visibleWeek, currentYear])

	return (
		<>
			<div className='flex flex-col items-center text-center'>
				<Sidebar visible={isLeftSidebarVisible}>
					<Calendar
						weekdayStyle='short'
						color='foreground'
						// showMonthAndYearPickers
						className='scale-85 overflow-y-hidden overflow-x-hidden bg-red-400'
						classNames={{
							headerWrapper: 'bg-[#27272C] border-b-1 border-[#27272C]',
							header: 'bg-[#27272A]',
							gridHeader: 'bg-[#27272A] border-b-1 border-neutral-500',

							content: 'bg-[#18181B]',
						}}
						aria-label='Date (Controlled Focused Value)'
						// focusedValue={focusedDate}
						value={focusedDate}
						onChange={date => {
							setFocusedDate(date)
							console.log('SIU SIU SIU')
							const newDate = new Date(date?.year, date?.month - 1, date?.day)

							dispatch(setVisibleWeek(getWeekNumber(newDate)))
						}}
					
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
