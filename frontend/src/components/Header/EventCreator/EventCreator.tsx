import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import { FC, useRef } from 'react'
import EventCreatorForm from './EventCreatorForm'

const EventCreator: FC = () => {
	const formRef = useRef<HTMLFormElement>(null!)
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	const handleSubmitForm = () => {
		formRef.current?.requestSubmit()
	}

	return (
		<>
			<Button
				className='text-14 border-1'
				variant='bordered'
				onPress={onOpen}
				radius='full'
			>
				+ Add event
			</Button>
			<Modal isOpen={isOpen} placement='top-center' onOpenChange={onOpenChange}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'></ModalHeader>
							<ModalBody>
								<EventCreatorForm formRef={formRef} />
							</ModalBody>
							<ModalFooter>
								<Button variant='flat' onPress={handleSubmitForm}>
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
