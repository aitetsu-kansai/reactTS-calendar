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
import { useAppSelector } from '../../../redux/slices/hooks'
import { selectFormTab } from '../../../redux/slices/uiSlice'
import EventCreatorForm from './EventCreatorForm'

const EventCreator: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const currentFormTab = useAppSelector(selectFormTab)
	const handleSubmitForm = () => {
		if (currentFormTab === 'event') {
			console.log('EVENT!')
		} else {
			console.log('NONO')
		}
	}

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
								<Button color='success' onPress={handleSubmitForm}>
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
