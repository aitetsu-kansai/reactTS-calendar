import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/react'
import { FC } from 'react'
import { RiContactsLine } from 'react-icons/ri'

const Contacts: FC = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<>
			<Button
				className='border-1'
				isIconOnly
				onPress={onOpen}
				variant='bordered'
				radius='full'
				size='md'
			>
				<RiContactsLine />
			</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Your contacts
							</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
								<p>
									Magna exercitation reprehenderit magna aute tempor cupidatat
									consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
									incididunt cillum quis. Velit duis sit officia eiusmod Lorem
									aliqua enim laboris do dolor eiusmod. Et mollit incididunt
									nisi consectetur esse laborum eiusmod pariatur proident Lorem
									eiusmod et. Culpa deserunt nostrud ad veniam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Close
								</Button>
								<Button variant='flat' onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	)
}

export default Contacts
