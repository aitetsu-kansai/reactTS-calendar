import { Button, Input, Navbar, NavbarContent, NavbarItem } from '@heroui/react'
import { FC } from 'react'
import {
	BsLayoutSidebarInset,
	BsLayoutSidebarInsetReverse,
} from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { useAppDispatch } from '../../redux/slices/hooks'
import { toggleSidebar } from '../../redux/slices/uiSlice'

const Header: FC = () => {
	const dispatch = useAppDispatch()

	const toggleSidebarHandler = () => {
		dispatch(toggleSidebar('left'))
	}

	return (
		<Navbar isBordered maxWidth='full'>
			<NavbarContent justify='start'>
				<NavbarItem as='div' className='flex items-center justify-center'>
					<BsLayoutSidebarInset
						className='size-6 cursor-pointer w-20'
						onClick={toggleSidebarHandler}
					/>
					<Button className='text-14 rounded-full' size='md'>
						+ Add
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent as='div' className='items-center' justify='end'>
				<Input
					classNames={{
						base: 'max-w-full sm:max-w-[10rem] h-10',
						mainWrapper: 'h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder='Event to search...'
					size='md'
					startContent={<CiSearch size={18} />}
					type='search'
				/>
				<BsLayoutSidebarInsetReverse className='size-6 cursor-pointer w-20' />
			</NavbarContent>
		</Navbar>
	)
}

export default Header
