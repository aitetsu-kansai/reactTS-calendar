import { FC, ReactNode } from 'react'

type TProps = {
	icon: ReactNode
	title: string
	titleData: any
}

const ContactsListElement: FC<TProps> = ({icon, title, titleData}) => {
	return (
		<li className='flex gap-2'>
			<span className='font-bold flex gap-2 items-center'>
				{icon} {title}:
			</span>
			<p>{titleData}</p>
		</li>
	)
}

export default ContactsListElement
