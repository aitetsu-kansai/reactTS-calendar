import { Input, Select, SelectItem } from '@heroui/react'
import { FC, ReactNode } from 'react'
import { BsAlphabet } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'
import { IoIosCalendar } from 'react-icons/io'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'

import { MdOutlineAlternateEmail, MdOutlinePhone } from 'react-icons/md'
import { PiUserListBold } from 'react-icons/pi'

type TProps = {
	filterText: string
	setFilterText: (args: string) => void
	filterCategory: string
	setFilterCategory: (args: any) => void
}

type TFilterCategory = {
	key: string
	label: string
	icon: ReactNode
}

const ContactsFilter: FC<TProps> = ({
	filterText,
	setFilterText,
	filterCategory,
	setFilterCategory,
}) => {
	const filterCategories: TFilterCategory[] = [
		{ key: 'username', label: 'Username', icon: <PiUserListBold /> },
		{ key: 'email', label: 'Email', icon: <MdOutlineAlternateEmail /> },
		{ key: 'phone', label: 'Phone', icon: <MdOutlinePhone /> },
		{ key: 'date', label: 'Date', icon: <LiaBirthdayCakeSolid /> },
		{ key: 'dateAdded', label: 'Date added', icon: <IoIosCalendar /> },
		{ key: 'alphabet', label: 'Alphabet', icon: <BsAlphabet /> },
	]

	return (
		<div className='flex gap-20 items-center pt-5'>
			<Input
				classNames={{
					base: 'max-w-full text-center mx-auto',
					mainWrapper: 'h-full',
					input: 'text-small',
					inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20',
				}}
				placeholder='Contact to search...'
				size='md'
				value={filterText}
				isDisabled={
					filterCategory === 'dateAdded' || filterCategory === 'alphabet'
				}
				startContent={<CiSearch size={18} />}
				type='search'
				onChange={e => setFilterText(e.target.value)}
			/>

			<Select
				aria-label='filter categories'
				selectedKeys={[filterCategory]}
				className='w-xs'
				placeholder='Select a category'
				onChange={e => {
					setFilterCategory(e.target.value)
					if (e.target.value === 'dateAdded') {
						setFilterText('')
					}
				}}
			>
				{filterCategories.map(el => (
					<SelectItem key={el.key} startContent={el.icon}>
						{el.label}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default ContactsFilter
