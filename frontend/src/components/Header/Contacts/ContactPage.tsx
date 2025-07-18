import {
	Button,
	Card,
	CardBody,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
} from '@heroui/react'
import { FC } from 'react'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { TContact } from '../../../../../share/types/events'
import ContactPageAvatar from './ContactPageAvatar'
import ContactsListElement from './ContactsListElement'

import { MdOutlinePhone } from 'react-icons/md'

type TProps = {
	isOpen: boolean
	onClose: () => void
	data: TContact
}

const ContactPage: FC<TProps> = ({ isOpen, onClose, data }) => {
	const { username, email, phone, date, avatar } = data

	return (
		<Drawer isOpen={isOpen} onClose={onClose} size='md'>
			<DrawerContent>
				{onClose => (
					<>
						<DrawerHeader>Contact info</DrawerHeader>
						<DrawerBody>
							<ContactPageAvatar avatar={avatar} username={username} />
							{(email || phone || date) && (
								<Card>
									<CardBody>
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
						<Button onPress={onClose}>CLICK</Button>
					</>
				)}
			</DrawerContent>
		</Drawer>
	)
}

export default ContactPage
