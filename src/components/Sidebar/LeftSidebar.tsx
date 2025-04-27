import type { DateValue } from '@heroui/react'
import { Button, Calendar, Divider } from '@heroui/react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { FC, useState } from 'react'
import { BsLayoutSidebarInset } from 'react-icons/bs'
import Sidebar from './Sidebar'

const LeftSidebar: FC = () => {
	const defaultDate = today(getLocalTimeZone())
	const [focusedDate, setFocusedDate] = useState<DateValue | null>(defaultDate)
	const [visible, setVisible] = useState<boolean>(false)
	return (
		<>
			<Sidebar visible={visible}>
				<div className='flex items-center justify-around'>
					<BsLayoutSidebarInset
						className='size-6 cursor-pointer'
						onClick={() => setVisible(!visible)}
					/>
					<Button className='text-14 rounded-full' size='md'>
						+ Add
					</Button>
				</div>
				<Divider className='my-2' />
				<Calendar
					className='scale-80'
					value={defaultDate}
					aria-label='Date (Controlled Focused Value)'
					focusedValue={focusedDate}
					onFocusChange={setFocusedDate}
				/>
				<Divider className='my-2' />
			</Sidebar>
		</>
	)
}

export default LeftSidebar
