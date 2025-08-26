import { useAppSelector } from '../../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../../redux/slices/uiSlice'

const Calendar = () => {
	const sidebarStatuses = useAppSelector(selectSidebarsStatus)
	return (
		<div
			className={`rounded-4xl bg-neutral-800 grid grid-cols-7 ${
				!sidebarStatuses.isLeftSidebarVisible &&
				!sidebarStatuses.isRightSidebarVisible &&
				'ms-5 mr-5'
			}`}
			style={{ gridTemplateRows: 'repeat(25, minmax(0, 1fr))' }}
		>
			{Array.from({ length: 7 * 25 }).map((_, i) => (
				<div key={i} className='border border-gray-300 p-4'>
					{i + 1}
				</div>
			))}
		</div>
	)
}

export default Calendar
