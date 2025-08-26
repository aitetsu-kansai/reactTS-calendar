import { useAppSelector } from '../../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../../redux/slices/uiSlice'

const Calendar = () => {
	const sidebarStatuses = useAppSelector(selectSidebarsStatus)
	return (
		<>
			<div
				className={`
    rounded-2xl bg-neutral-800 grid grid-cols-7 
    divide-x divide-y divide-neutral-500
    ${
			!sidebarStatuses.isLeftSidebarVisible &&
			!sidebarStatuses.isRightSidebarVisible &&
			'ms-5 mr-5'
		}
  `}
				style={{ gridTemplateRows: 'repeat(25, minmax(0, 1fr))' }}
			>
				{Array.from({ length: 7 * 25 }).map((_, i) => {
					const row = Math.floor(i / 7)
					return (
						<div key={i} className='p-3 text-sm text-neutral-300'>
							{i % 7 === 0 ? `${row}:00` : ''}
						</div>
					)
				})}
			</div>
		</>
	)
}

export default Calendar
