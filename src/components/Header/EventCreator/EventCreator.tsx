import { Button, Modal, useDisclosure } from '@heroui/react'
import { FC } from 'react'
import EventCreatorForm from './EventCreatorForm'

const EventCreator: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button className='text-14' variant='flat' onPress={onOpen}>
				+ Add event
			</Button>
			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<EventCreatorForm />
			</Modal>
		</>
	)
}

export default EventCreator
