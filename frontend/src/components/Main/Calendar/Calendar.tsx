import { useAppSelector } from '../../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../../redux/slices/uiSlice'

const Calendar = () => {
	const sidebarStatuses = useAppSelector(selectSidebarsStatus)
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
			<div
				className='grid grid-cols-7  overflow-y-auto h-[calc(100vh-90px)] custom-scrollbar'
				style={{ gridTemplateRows: 'repeat(25, minmax(40px, 1fr))' }}
			>
				{Array.from({ length: 7 * 25 }).map((_, i) => {
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
