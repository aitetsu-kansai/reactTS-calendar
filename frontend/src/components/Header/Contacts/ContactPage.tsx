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
import { TContact } from '../../../../../share/types/events'
import ContactPageAvatar from './ContactPageAvatar'

type TProps = {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
	data: TContact
}

const ContactPage: FC<TProps> = ({ isOpen, onClose, onOpen, data }) => {
	const { username, email, phone, date, avatarUrl } = data

	return (
		<Drawer isOpen={isOpen} onClose={onClose} size='md'>
			<DrawerContent>
				{onClose => (
					<>
						<DrawerHeader>Contact info</DrawerHeader>
						<DrawerBody>
							<ContactPageAvatar avatarUrl={avatarUrl} username={username} />
							{(email || phone || date) && (
								<Card>
									<CardBody>
										<ul>
											{email && (
												<li>
													<span className='font-bold'>Email:</span> {email}
												</li>
											)}
											{date && (
												<li>
													<span className='font-bold'>Birth date:</span> {date}
												</li>
											)}
											{phone && (
												<li>
													<span className='font-bold'>Phone number:</span>{' '}
													{phone})
												</li>
											)}
											<li></li>
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
