import {
	Alert,
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
import { TContact } from '../../../../../share/types/events'
import { BASE_URL, CONTACTS_ENDPOINT } from '../../../constants/config'
import {
	fetchContacts,
	selectContacts,
} from '../../../redux/slices/contactsSlice'
import { useAppDispatch, useAppSelector } from '../../../redux/slices/hooks'
import Contact from './Contact'

const Contacts: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const contacts: TContact[] = useAppSelector(selectContacts)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchContacts(`${BASE_URL}${CONTACTS_ENDPOINT}`))
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

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size='2xl'
				scrollBehavior='inside'
			>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Your contacts
							</ModalHeader>
							<ModalBody>
								<>
									{contacts.length === 0 && (
										<div className='w-full flex items-center my-3'>
											<Alert
												variant='bordered'
												title={`You don't have any contacts`}
											/>
										</div>
									)}
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
