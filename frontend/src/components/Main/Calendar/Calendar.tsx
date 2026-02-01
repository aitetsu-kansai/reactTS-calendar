import { calendar } from '@heroui/react'
import { selectCalendar } from '../../../redux/slices/calendarSlice'
import { useAppSelector } from '../../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../../redux/slices/uiSlice'
import { getDatesOfISOWeek } from '../../../utils/calendarHelpers'

const Calendar = () => {
	const sidebarStatuses = useAppSelector(selectSidebarsStatus)
	const { currentYear, visibleWeek, currentDate, currentDay } =
		useAppSelector(selectCalendar)
	const days = getDatesOfISOWeek(visibleWeek, currentYear)
	return (
		<div
			className={`
        rounded-2xl bg-component-bg overflow-hidden ps-3
      `}
		>
			<div
				className='grid'
				style={{ gridTemplateColumns: '70px repeat(7, 1fr)' }}
			>
				<div></div>
				{days.map(el => {
					const calendarDate = el.toLocaleDateString('sv-SV')
					console.log(el);
					
					const [currentDateWithoutTime] = currentDate.split('T')
					return (
						<div
							key={el.getTime()}
							className={`flex justify-center ${
								String(el.getDate()) === String(currentDay) ? '' : ''
							}`}
						>
							<div
								className={`text-center font-bold ${
									String(el.getDate()) === String(currentDay) ? 'w-[40%]' : ''
								}`}
							>
								<p>
									{String(el.toLocaleDateString('en-EN', { weekday: 'short' }))}
								</p>

								<p
									className={`text-3xl ${
										calendarDate === currentDateWithoutTime
											? 'bg-foreground text-background rounded-full'
											: ''
									}`}
								>
									{String(el.getDate())}
								</p>
							</div>
						</div>
					)
				})}
			</div>
			<div
				className='grid h-[calc(100vh-160px)] custom-scrollbar overflow-y-scroll pr-3'
				style={{
					gridTemplateColumns: '70px repeat(7, 1fr)',
					gridTemplateRows: 'repeat(25, minmax(40px, 1fr))',
				}}
			>
				{Array.from({ length: 8 * 25 }).map((_, i) => {
					const row = Math.floor(i / 8)
					const col = i % 8
					const isTimeColumn = col === 0
					const isDayColumn = col > 0

					return (
						<div
							key={i}
							className={`flex flex-col align- justify-end text-sm text-neutral-300 
								${isTimeColumn ? 'border-r border-neutral-600 pr-2 text-right' : ''}
								${isDayColumn && col < 7 ? 'border-r border-neutral-600' : ''}
								${row < 24 ? 'border-b border-neutral-600' : ''}
							`}
						>
							{isTimeColumn && row !== 0 && row !== 24 ? `${row}:00` : ''}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Calendar
