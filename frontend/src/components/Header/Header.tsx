import {
	Button,
	Divider,
	Navbar,
	NavbarContent,
	NavbarItem,
	Select,
	SelectItem,
} from '@heroui/react'
import { ChangeEvent, FC, useState } from 'react'
import {
	BsLayoutSidebarInset,
	BsLayoutSidebarInsetReverse,
} from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { TCalendarLayout } from '../../../../share/types/calendar'
import {
	selectCalendar,
	switchCalendarLayout,
	switchNextWeek,
	switchPreviousWeek,
	switchToCurrentWeek,
} from '../../redux/slices/calendarSlice'
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

	const calendarLayouts = [
		{ key: 'week', label: 'Week' },
		{ key: 'day', label: 'Day' },
		{ key: 'month', label: 'Month' },
		{ key: 'year', label: 'Year' },
	]

	const [selectedLayout, setSelectedLayout] = useState<TCalendarLayout>('week')
	const handleOnChange = (e: ChangeEvent<any>) => {
		const value = e.target.value as TCalendarLayout
		setSelectedLayout(value)
		dispatch(switchCalendarLayout(value))
	}

	console.log(selectedLayout)
	return (
		<Navbar className='w-full ps-4 pr-4 m-0 flex' maxWidth='full'>
			<NavbarContent>
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
						className='text-14 border-1 w-23'
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
				<Divider orientation='vertical' className='h-6' />
				<Select
					classNames={{
						trigger:
							'text-white w-33 h-10 min-h-10 border-1 data-[hover=true]:border-default-400',
						value: 'text-sm text-foreground',
					}}
					size='md'
					radius='full'
					aria-label='Calendar layouts'
					placeholder='Select a calendar layout'
					variant='bordered'
					onChange={handleOnChange}
					selectedKeys={[selectedLayout]}
				>
					{calendarLayouts.map(layout => (
						<SelectItem key={layout.key}>{layout.label}</SelectItem>
					))}
				</Select>

				{/* alternative variant */}
				{/* <Dropdown>
					<DropdownTrigger>
					<Button
					variant='bordered'
					radius='full'
					size='md'
					className='min-w-32 justify-between border-1'
					>
					{selectedLayout}
					</Button>
					</DropdownTrigger>
					<DropdownMenu
					aria-label='Calendar layouts'
					onAction={key => {
						const layout = calendarLayouts.find(l => l.key === key)
						if (layout) setSelectedLayout(layout.label)
						}}
						>
						{calendarLayouts.map(item => (
							<DropdownItem key={item.key}>{item.label}</DropdownItem>
							))}
							</DropdownMenu>
							</Dropdown> */}
			</NavbarContent>
			<NavbarContent as='div' className='flex justify-start' justify='end'>
				<BsLayoutSidebarInsetReverse
					className='size-6 cursor-pointer'
					onClick={() => toggleSidebarHandler('right')}
				/>
			</NavbarContent>
		</Navbar>
	)
}

export default Header
