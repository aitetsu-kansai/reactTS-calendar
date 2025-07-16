import {
	Alert,
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from '@heroui/react'
import { FC, useEffect } from 'react'
import { CiSearch } from 'react-icons/ci'
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
								<p>Your contacts ({contacts.length})</p>
								<div className='flex gap-20'>
									<Input
										classNames={{
											base: 'max-w-full text-center mx-auto pt-5',
											mainWrapper: 'h-full',
											input: 'text-small',
											inputWrapper:
												'h-full font-normal text-default-500 bg-default-400/20',
										}}
										placeholder='Contact to search...'
										size='md'
										startContent={<CiSearch size={18} />}
										type='search'
									/>
									<Select
										className='w-xs'
										placeholder='Select a category'
									>
										<SelectItem>Username</SelectItem>
										<SelectItem>Email</SelectItem>
										<SelectItem>Date</SelectItem>

									</Select>
								</div>
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
