import { Calendar, DateValue, Divider } from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { FC, useEffect, useState } from 'react'
import {
	selectCalendar,
	setFocusedDate,
	setSidebarFocusedDate,
	setVisibleWeek,
} from '../../redux/slices/calendarSlice'
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import { getWeekNumberFromCalendarDate } from '../../utils/calendarHelpers'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const dispatch = useAppDispatch()
	const { focusedDate, currentDate, sidebarFocusedDate } =
		useAppSelector(selectCalendar)

	const isLeftSidebarVisible =
		useAppSelector(selectSidebarsStatus).isLeftSidebarVisible

	const [focusedValue, setFocusedValue] = useState<DateValue | null>(
		parseDate(currentDate),
	)

	//initialization
	useEffect(() => {
		if (focusedDate !== null) return
		dispatch(setFocusedDate(currentDate))
		setFocusedValue(parseDate(currentDate))
	}, [])

	//calendar focus
	useEffect(() => {
		if (!sidebarFocusedDate) return
		setFocusedValue(parseDate(sidebarFocusedDate))
	}, [sidebarFocusedDate])

	return (
		<>
			<div className='flex flex-col items-center text-center'>
				<Sidebar visible={isLeftSidebarVisible}>
					<Calendar
						weekdayStyle='short'
						color='foreground'
						className='scale-85 overflow-hidden'
						aria-label='Date (Controlled Focused Value)'
						classNames={{
							headerWrapper: 'bg-[#27272C] border-b-1 border-[#27272C]',
							header: 'bg-[#27272A]',
							gridHeader: 'bg-[#27272A]',
							content: 'bg-component-bg',
						}}
						value={parseDate(sidebarFocusedDate)}
						onChange={val => {
							const isoVal = val.toString()
							dispatch(setVisibleWeek(getWeekNumberFromCalendarDate(val)))
							dispatch(setFocusedDate(isoVal))
							dispatch(setSidebarFocusedDate(val.toString()))
						}}
						focusedValue={focusedValue}
						onFocusChange={setFocusedValue}
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
