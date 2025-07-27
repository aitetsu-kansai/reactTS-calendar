import {
	Button,
	Card,
	CardBody,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
} from '@heroui/react'
import { FC, useRef, useState } from 'react'
import { LuPencil, LuPencilOff } from 'react-icons/lu'
import { TContact } from '../../../../../../share/types/events'
import ContactPageAvatar from './ContactPageAvatar'

import EventCreatorPerson from '../../EventCreator/Person/EventCreatorPerson'

type TProps = {
	isOpen: boolean
	onClose: () => void
	data: TContact
}

const ContactPage: FC<TProps> = ({ isOpen, onClose, data }) => {
	const { username, email, phone, date, avatar } = data
	const formRef = useRef<HTMLFormElement>(null!)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const handleOnCLose = () => {
		onClose()
		setIsEditing(false)
	}

	const handleSubmit = () => {
		setIsEditing(!isEditing)
		if (isEditing) {
			formRef.current?.requestSubmit()
		}
	}

	return (
		<Drawer isOpen={isOpen} onClose={handleOnCLose} size='md'>
			<DrawerContent>
				<>
					<DrawerHeader>Contact info</DrawerHeader>
					<DrawerBody>
						<ContactPageAvatar
							avatar={avatar}
							username={username}
							email={email}
						/>
						{(email || phone || date) && (
							<Card shadow='lg'>
								<CardBody className='text-default/00'>
									<EventCreatorPerson
										mode='edit'
										data={data}
										isEditing={isEditing}
										formRef={formRef}
									/>
								</CardBody>
							</Card>
						)}
					</DrawerBody>
					<DrawerFooter>
						<Button
							className='border-1'
							isIconOnly
							variant={isEditing ? 'solid' : 'faded'}
							// variant='solid'
							radius='full'
							size='md'
							title='Delete the contact'
							onPress={handleSubmit}
						>
							{isEditing ? <LuPencilOff /> : <LuPencil />}
						</Button>
					</DrawerFooter>
				</>
			</DrawerContent>
		</Drawer>
	)
}

export default ContactPage
