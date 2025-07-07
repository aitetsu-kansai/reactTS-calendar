import { Button, Link, User } from '@heroui/react'
import { FC } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { TContact } from '../../../../../share/types/events'

type TProps = {
	data: TContact
}

const Contact: FC<TProps> = ({ data }) => {
	console.log(data)
	return (
		<div className='flex'>
			<User
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
			>
				<FaRegTrashAlt />
			</Button>
		</div>
	)
}

export default Contact
