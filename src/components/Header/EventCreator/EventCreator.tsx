import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
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
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
							<ModalBody>
								<EventCreatorForm />
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
			</Modal>
		</>
	)
}

export default EventCreator
