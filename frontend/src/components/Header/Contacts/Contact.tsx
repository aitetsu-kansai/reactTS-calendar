import { Button, Link, User } from '@heroui/react'
import { FC, useRef, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { TContact } from '../../../../../share/types/events'
import { deleteContact } from '../../../redux/slices/contactsSlice'
import { useAppDispatch } from '../../../redux/slices/hooks'
import { showInfo } from '../../../utils/showInfo'

type TProps = {
	data: TContact
}

const Contact: FC<TProps> = ({ data }) => {
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
		console.log(deleteContactRef)
		console.log(typeof deleteContactRef)
		if (deleteContactRef.current) {
			deleteContactRef.current.abort()
		}
		setIsDeleting(false)
	}

	return (
		<div
			className={`flex transition-opacity ease-in-out delay-100 ${
				isDeleting && 'opacity-50'
			}`}
		>
			<User
				name={data.username}
				className='flex justify-start w-full'
				avatarProps={{ src: data.avatarUrl, size: 'lg' }}
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
		</div>
	)
}

export default Contact
