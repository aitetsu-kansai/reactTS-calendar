import { Avatar, Button, Card, CardFooter } from '@heroui/react'
import { FC } from 'react'

type TProps = {
	avatarUrl: string | undefined
	username: string
	onClick?: () => void
}

const ContactPageAvatar: FC<TProps> = ({ avatarUrl, username }) => {
	return (
		<Card
			isFooterBlurred
			className='bg-none border-0 border-none flex justify-center items-center'
			radius='lg'
			shadow='none'
		>
			<Avatar
				className='w-68 h-68 text-large object-cover'
				radius='lg'
				alt='User avatar'
				src={avatarUrl && avatarUrl}
			/>
			{/* <Image
				className='object-cover'
				width={270}
				height={270}
				alt='Woman listing to music'
				src={avatarUrl}
			/> */}

			<CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10 max-w-60'>
				<h4 className='text font-semibold text-white/80 wrap-anywhere'>
					{username}
				</h4>

				<Button
					className='text font-semibold text-white bg-black/20'
					color='default'
					radius='lg'
					size='sm'
					variant='flat'
				>
					Write
				</Button>
			</CardFooter>
		</Card>
	)
}

export default ContactPageAvatar
