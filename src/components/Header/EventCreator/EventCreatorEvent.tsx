import { Checkbox, Form, Textarea, TimeInput } from '@heroui/react'
import { FC } from 'react'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorEvent: FC<Props> = ({ formRef }) => {
	return (
		<>
			<Form
				ref={formRef}
				className='w-full flex flex-col gap-4'
				onSubmit={e => {
					e.preventDefault()
					const data = Object.fromEntries(new FormData(e.currentTarget))
					console.log('Submitted data:', data)
				}}
			>
				<div className='flex flex-wrap gap-4'>
					<Textarea
						name='description'
						isClearable
						label='Event description'
						placeholder='Description'
						isRequired
					/>
					<TimeInput label='Start event time' name='startEvent' />
					<TimeInput label='End event time' name='endEvent' />
				</div>
				<div className='flex py-2 px-1 justify-between'>
					<Checkbox
						name='isAllDay'
						classNames={{
							label: 'text-small',
						}}
					>
						All day
					</Checkbox>
				</div>
			</Form>
		</>
	)
}

export default EventCreatorEvent
