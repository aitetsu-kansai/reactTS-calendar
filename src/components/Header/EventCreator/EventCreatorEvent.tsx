import { Checkbox, Textarea, TimeInput } from '@heroui/react'
import { FC } from 'react'

const EventCreatorEvent: FC = () => {
	return (
		<>
			<div className='flex flex-wrap gap-4'>
				<Textarea
					isClearable
					label='Event description'
					placeholder='Description'
				/>
				<TimeInput label='Start event time' />
				<TimeInput label='End event time' />
			</div>
			<div className='flex py-2 px-1 justify-between'>
				<Checkbox
					classNames={{
						label: 'text-small',
					}}
				>
					All day
				</Checkbox>
			</div>
		</>
	)
}

export default EventCreatorEvent
