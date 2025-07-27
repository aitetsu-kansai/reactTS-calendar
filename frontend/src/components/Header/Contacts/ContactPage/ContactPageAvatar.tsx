import { Card, CardFooter, Chip } from '@heroui/react'
import { FC, useState } from 'react'
import UploadableAvatar from '../../EventCreator/Person/UploadableAvatar'

type TProps = {
	avatar: string | undefined
	username: string
	email: string
	onClick?: () => void
}

const ContactPageAvatar: FC<TProps> = ({ avatar, username, email }) => {
	const [avatarUrl, setAvatarUrl] = useState<string>('')
	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	return (
		<Card
			isFooterBlurred
			className='bg-none border-0 border-none flex justify-center items-center'
			radius='lg'
			shadow='none'
		>
			{/* <Avatar
				className='w-68 h-68 text-large object-cover'
				radius='lg'
				alt='User avatar'
				src={avatar && avatar}
			/> */}

			<UploadableAvatar mode='edit' />

			<CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10 max-w-60'>
				<h4 className='text font-semibold text-white/80 wrap-anywhere'>
					{username}
				</h4>

				<Chip
					className='bg-transparent border-1 border-white/20 before rounded-small shadow-small'
					color='default'
					radius='sm'
					size='sm'
					// variant='flat'
					variant='faded'
				>
					<a
						className='text-white/80 font-bold'
						href={`mailto:${email}`}
						target='__blank'
					>
						WRITE
					</a>
				</Chip>
			</CardFooter>
		</Card>
	)
}

export default ContactPageAvatar
