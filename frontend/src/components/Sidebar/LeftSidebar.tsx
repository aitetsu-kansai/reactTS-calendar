import { Calendar, Divider } from '@heroui/react'
import { CalendarDate } from '@internationalized/date'
import { FC, useEffect } from 'react'
import {
	selectCalendar,
	setFocusedDate,
	setVisibleWeek,
} from '../../redux/slices/calendarReducer'
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import {
	getWeekNumber,
	toCalendarDate,
	toDate,
} from '../../utils/calendarHelpers'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const dispatch = useAppDispatch()
	const { focusedDate, currentDay, currentDate } =
		useAppSelector(selectCalendar)

	// const [focusedDate, setFocusedDate] = useState<DateValue | null>(null)
	// const weekNum = getWeekNumber(focusedDate?.toDate)

	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible

	const { currentYear, visibleWeek } = useAppSelector(selectCalendar)

	const getDateValueFromWeek = (
		weekNumber: number,
		year: number
	): CalendarDate => {
		const jan4 = new Date(Number(year), 0, 4)

		const firstMonday = new Date(jan4)
		firstMonday.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1)
		const targetDate = new Date(firstMonday)
		targetDate.setDate(firstMonday.getDate() + (Number(weekNumber) - 1) * 7)

		return new CalendarDate(
			targetDate.getFullYear(),
			targetDate.getMonth() + 1,
			targetDate.getDate()
		)
	}

	useEffect(() => {
		const initialCalendarDate = getDateValueFromWeek(visibleWeek, currentYear) //CD
		const { year, month, day } = initialCalendarDate
		const c = new Date(Date.UTC(year, month - 1, day)).toISOString()

		dispatch(setFocusedDate(c))
	}, [visibleWeek, currentYear])

	return (
		<>
			<div className='flex flex-col items-center text-center'>
				<Sidebar visible={isLeftSidebarVisible}>
					<Calendar
						weekdayStyle='short'
						color='foreground'
						className='scale-85 overflow-y-hidden overflow-x-hidden bg-red-400'
						classNames={{
							headerWrapper: 'bg-[#27272C] border-b-1 border-[#27272C]',
							header: 'bg-[#27272A]',
							gridHeader: 'bg-[#27272A] border-b-1 border-neutral-500',

							content: 'bg-component-bg',
						}}
						aria-label='Date (Controlled Focused Value)'
						value={
							focusedDate !== null
								? toCalendarDate(new Date(focusedDate))
								: null
						}
						onChange={date => {
							const jsDate = toDate(date)
							console.log(focusedDate)
							console.log(currentDate)
							dispatch(setFocusedDate(jsDate.toISOString()))
							dispatch(setVisibleWeek(getWeekNumber(jsDate)))
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
