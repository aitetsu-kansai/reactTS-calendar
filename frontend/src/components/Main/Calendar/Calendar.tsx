import { Button } from '@heroui/react'
import {
	selectCalendar,
	switchNextWeek,
} from '../../../redux/slices/calendarReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../../redux/slices/uiSlice'
import { getDatesOfISOWeek } from '../../../utils/calendarHelpers'

const Calendar = () => {
	const dispatch = useAppDispatch()
	const sidebarStatuses = useAppSelector(selectSidebarsStatus)
	const { currentYear, visibleWeek } = useAppSelector(selectCalendar)

	const days = getDatesOfISOWeek(visibleWeek, currentYear)
	const handleOnClick = () => {
		dispatch(switchNextWeek())
	}
	return (
		<div
			className={`
        rounded-2xl bg-neutral-800 overflow-hidden 
        ${
					!sidebarStatuses.isLeftSidebarVisible &&
					!sidebarStatuses.isRightSidebarVisible &&
					'ms-5 mr-5'
				}
      `}
		>
			<Button onPress={handleOnClick}>CLICK</Button>
			<div className='grid grid-cols-7'>
				{days.map(el => (
					<p>{String(el)}</p>
				))}
			</div>
			<div
				className='grid grid-cols-7  overflow-y-auto h-[calc(100vh-90px)] custom-scrollbar'
				style={{ gridTemplateRows: 'repeat(25, minmax(40px, 1fr))' }}
			>
				{Array.from({ length: 7 * 25 }).map((_, i) => {
					console.log(days[0])
					const row = Math.floor(i / 7)
					const col = i % 7
					return (
						<div
							key={i}
							className={`p-3 text-sm text-neutral-300 
								${col < 6 ? 'border-r border-neutral-500' : ''} 
								${row < 24 ? 'border-b border-neutral-500' : ''}
								`}
						>
							{i % 7 === 0 ? `${row}:00` : ''}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
