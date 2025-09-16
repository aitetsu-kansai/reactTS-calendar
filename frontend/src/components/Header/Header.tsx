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
import {
	selectCalendar,
	switchNextWeek,
	switchPreviousWeek,
	switchToCurrentWeek,
} from '../../redux/slices/calendarReducer'
import { useAppDispatch, useAppSelector } from '../../redux/slices/hooks'
import { toggleSidebar } from '../../redux/slices/uiSlice'
import { getMonthsOfWeek, getYearOfWeek } from '../../utils/calendarHelpers'
import Contacts from './Contacts/Contacts'
import EventCreator from './EventCreator/EventCreator'

const Header: FC = () => {
	const dispatch = useAppDispatch()
	const current = useAppSelector(selectCalendar)

	const months = getMonthsOfWeek(current.visibleWeek, current.currentYear)
	const years = getYearOfWeek(current.visibleWeek, current.currentYear)

	const toggleSidebarHandler = (direction: 'left' | 'right') => {
		dispatch(toggleSidebar(direction))
	}

	const handleNextWeek = () => {
		dispatch(switchNextWeek())
	}

	const handlePreviousWeek = () => {
		dispatch(switchPreviousWeek())
	}

	const handleCurrentWeek = () => {
		dispatch(switchToCurrentWeek())
	}

	const visibleMonthAndYear =
		years.length === 1
			? `${months.join(' - ')} ${years[0]}`
			: months.map((el, i) => `${el} ${years[i]}`).join(' - ')

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
						onPress={handleCurrentWeek}
						radius='full'
					>
						Today
					</Button>
					<Button
						className='border-1'
						isIconOnly
						onPress={handlePreviousWeek}
						variant='bordered'
						radius='full'
						size='md'
					>
						<IoIosArrowBack />
					</Button>
					<Button
						className='border-1'
						isIconOnly
						onPress={handleNextWeek}
						variant='bordered'
						radius='full'
						size='md'
					>
						<IoIosArrowForward />
					</Button>
				</NavbarItem>
				<NavbarItem>
					<h3 className='text-xl'>{visibleMonthAndYear}</h3>
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
