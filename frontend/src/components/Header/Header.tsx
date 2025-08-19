import {
	Button,
	Divider,
	Navbar,
	NavbarContent,
	NavbarItem,
} from '@heroui/react'
import { FC } from 'react'
import {
	BsLayoutSidebarInset,
	BsLayoutSidebarInsetReverse,
} from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useAppDispatch } from '../../redux/slices/hooks'
import { toggleSidebar } from '../../redux/slices/uiSlice'
import Contacts from './Contacts/Contacts'
import EventCreator from './EventCreator/EventCreator'

const Header: FC = () => {
	const dispatch = useAppDispatch()

	const toggleSidebarHandler = (direction: 'left' | 'right') => {
		dispatch(toggleSidebar(direction))
	}

	return (
		<Navbar className='w-full ps-4 pr-4 m-0 flex' maxWidth='full'>
			<NavbarContent className='w-full flex justify-between'>
				<NavbarItem as='div' className='flex items-center justify-center'>
					<BsLayoutSidebarInset
						className='size-6 cursor-pointer'
						onClick={() => toggleSidebarHandler('left')}
					/>
				</NavbarItem>
				<NavbarItem
					as='div'
					className='flex items-center justify-center gap-3'
					title='Contacts'
				>
					<EventCreator />
					<Contacts />
				</NavbarItem>
				<Divider orientation='vertical' className='h-6' />
				<NavbarItem className='flex items-center justify-center gap-3'>
					<Button
						className='text-14 border-1'
						variant='bordered'
						// onPress={onOpen}
						radius='full'
					>
						Today
					</Button>
					<Button
						className='border-1'
						isIconOnly
						// onPress={onOpen}
						variant='bordered'
						radius='full'
						size='md'
					>
						<IoIosArrowBack />
					</Button>
					<Button
						className='border-1'
						isIconOnly
						// onPress={onOpen}
						variant='bordered'
						radius='full'
						size='md'
					>
						<IoIosArrowForward />
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent as='div' className='items-center' justify='end'>
				<BsLayoutSidebarInsetReverse
					className='size-6 cursor-pointer'
					onClick={() => toggleSidebarHandler('right')}
				/>
			</NavbarContent>
		</Navbar>
	)
}

export default Header
