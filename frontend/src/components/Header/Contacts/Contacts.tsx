import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import { FC, useEffect } from 'react'
import { RiContactsLine } from 'react-icons/ri'
import { selectContacts } from '../../../redux/slices/contacts'
import { useAppDispatch, useAppSelector } from '../../../redux/slices/hooks'
import { fetchContacts } from '../../../utils/api'
import Contact from './Contact'

const Contacts: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const contacts = useAppSelector(selectContacts)

	const dispatch = useAppDispatch()

	useEffect(() => {
		fetchContacts(dispatch)
	}, [dispatch])

	return (
		<>
			<Button
				className='border-1'
				isIconOnly
				onPress={onOpen}
				variant='bordered'
				radius='full'
				size='md'
			>
				<RiContactsLine />
			</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Your contacts
							</ModalHeader>
							<ModalBody>
								<>
									{contacts.map(el => (
										<div key={el.id}>
											<Contact data={el} />
										</div>
									))}
								</>
							</ModalBody>
							<ModalFooter>
								<Button variant='flat' onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default Contacts
