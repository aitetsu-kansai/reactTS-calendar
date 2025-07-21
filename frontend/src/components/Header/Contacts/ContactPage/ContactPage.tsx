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
import { FC, useState } from 'react'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import {
	MdOutlineAlternateEmail,
	MdOutlineModeEditOutline,
} from 'react-icons/md'
import { TContact } from '../../../../../../share/types/events'
import ContactPageAvatar from './ContactPageAvatar'
import ContactsListElement from './ContactsListElement'

import { MdOutlinePhone } from 'react-icons/md'
import EventCreatorPerson from '../../EventCreator/Person/EventCreatorPerson'

type TProps = {
	isOpen: boolean
	onClose: () => void
	data: TContact
}

const ContactPage: FC<TProps> = ({ isOpen, onClose, data }) => {
	const { username, email, phone, date, avatar } = data

	const [editButtonVariant, setEditButtonVariant] = useState<
		'bordered' | 'solid'
	>('bordered')

	const handleOnCLose = () => {
		onClose()
		setEditButtonVariant('bordered')
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
									<ul className='flex flex-col gap-2'>
										{email && (
											<ContactsListElement
												icon={<MdOutlineAlternateEmail />}
												title='Email'
												titleData={email}
											/>
										)}
										{date && (
											<ContactsListElement
												icon={<LiaBirthdayCakeSolid />}
												title='Birthday'
												titleData={date}
											/>
										)}
										{phone && (
											<ContactsListElement
												icon={<MdOutlinePhone />}
												title='Phone number'
												titleData={phone}
											/>
										)}
									</ul>
								</CardBody>
							</Card>
						)}
					</DrawerBody>
					<EventCreatorPerson />
					<DrawerFooter>
						<Button
							className='border-1'
							isIconOnly
							variant={editButtonVariant}
							radius='full'
							size='md'
							title='Delete the contact'
							onPress={() =>
								setEditButtonVariant(
									editButtonVariant === 'bordered' ? 'solid' : 'bordered'
								)
							}
						>
							<MdOutlineModeEditOutline />
						</Button>
					</DrawerFooter>
				</>
			</DrawerContent>
		</Drawer>
	)
}

export default ContactPage
