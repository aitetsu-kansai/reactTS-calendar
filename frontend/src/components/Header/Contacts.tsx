import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import axios from 'axios'
import { FC, useEffect } from 'react'
import { RiContactsLine } from 'react-icons/ri'
import { addContact, selectContacts } from '../../redux/slices/contacts'
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks'

const Contacts: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const contacts = useAppSelector(selectContacts)

	const dispatch = useAppDispatch()

	useEffect(() => {
		axios
			.get('http://localhost:5000/contacts/')
			.then(res => {
				if (res.data) {
					res.data.forEach((el: any) => dispatch(addContact(el)))
				} else {
					console.error('Некорректный формат данных:', res.data)
				}
			})
			.catch(error => {
				console.error('Ошибка при загрузке контактов:', error)
			})
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
										<div key={el.date}>
											<h1>{el.username}</h1>
											<img src={el.avatarUrl} />
										</div>
									))}
								</>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Close
								</Button>
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
