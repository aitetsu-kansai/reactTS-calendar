import {
	Button,
	Checkbox,
	Form,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
	TimeInput,
} from '@heroui/react'
import { FC } from 'react'

const EventCreatorEvent: FC = () => {
	return (
		<>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Event deatils
						</ModalHeader>
						<ModalBody>
							<Form>
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
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button color='danger' variant='flat' onPress={onClose}>
								Close
							</Button>
							<Button color='success' onPress={onClose}>
								Create
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</>
	)
}

export default EventCreatorEvent
