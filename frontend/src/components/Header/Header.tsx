import { Divider, Navbar, NavbarContent, NavbarItem } from '@heroui/react'
import { FC } from 'react'
import {
	BsLayoutSidebarInset,
	BsLayoutSidebarInsetReverse,
} from 'react-icons/bs'
import { useAppDispatch } from '../../redux/slices/hooks'
import { toggleSidebar } from '../../redux/slices/uiSlice'
import Contacts from './Contacts'
import EventCreator from './EventCreator/EventCreator'

const Header: FC = () => {
	const dispatch = useAppDispatch()

	const toggleSidebarHandler = (direction: 'left' | 'right') => {
		dispatch(toggleSidebar(direction))
	}

	return (
		<Navbar isBordered maxWidth='full'>
			<NavbarContent justify='start'>
				<NavbarItem as='div' className='flex items-center justify-center w-20'>
					<BsLayoutSidebarInset
						className='size-6 cursor-pointer'
						onClick={() => toggleSidebarHandler('left')}
					/>
				</NavbarItem>
				<NavbarItem
					as='div'
					className='flex items-center justify-center gap-2'
					title='Contacts'
				>
					<EventCreator />
					<Contacts />
					<Divider orientation='vertical' />
				</NavbarItem>{' '}
			</NavbarContent>
			<NavbarContent as='div' className='items-center' justify='end'>
				<BsLayoutSidebarInsetReverse
					className='size-6 cursor-pointer w-20'
					onClick={() => toggleSidebarHandler('right')}
				/>
			</NavbarContent>
		</Navbar>
	)
}

export default Header
