import {
	Button,
	Card,
	CardBody,
	Link,
	useDisclosure,
	User,
} from '@heroui/react'
import { FC, useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { TContact } from '../../../../../share/types/events'
import { deleteContact } from '../../../redux/slices/contactsSlice'
import { useAppDispatch } from '../../../redux/slices/hooks'
import { showInfo } from '../../../utils/showInfo'
import ContactPage from './ContactPage/ContactPage'

type TProps = {
	data: TContact
}

const Contact: FC<TProps> = ({ data }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const deleteContactRef = useRef<{ abort: () => void } | null>(null)

	const handleOnClick = (id: string) => {
		try {
			deleteContactRef.current = dispatch(deleteContact(id))
			setIsDeleting(true)
			showInfo(
				{ infoType: 'danger', infoMessage: 'The contact was deleted' },
				dispatch,
				<Button size='sm' variant='flat' color='danger' onPress={cancelRequest}>
					Cancel
				</Button>
			)
		} catch (error) {
			showInfo(
				{
					infoMessage: `Request error: ${error}, try later`,
					infoType: 'warning',
				},
				dispatch
			)
		}
	}

	const cancelRequest = () => {
		if (deleteContactRef.current) {
			deleteContactRef.current.abort()
		}
		setIsDeleting(false)
	}

	return (
		<div>
			<Card className={`${isDeleting && 'opacity-50'}`}>
				<CardBody>
					<div className='flex justify-center items-center '>
						<User
							name={data.username}
							onClick={onOpen}
							className='flex justify-start w-full cursor-pointer'
							avatarProps={{ src: data.avatar, size: 'lg' }}
							description={
								<Link isExternal href='#' size='sm' target='_blank'>
									{data.email ? data.email : data.phone ? data.phone : ''}
								</Link>
							}
						/>
						<Button
							className='border-1'
							isIconOnly
							variant='bordered'
							color='danger'
							radius='full'
							size='md'
							title='Delete the contact'
							onPress={() => handleOnClick(data.id)}
						>
							<FaRegTrashAlt />
						</Button>
						<ContactPage onClose={onClose} isOpen={isOpen} data={data} />
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

export default Contact
