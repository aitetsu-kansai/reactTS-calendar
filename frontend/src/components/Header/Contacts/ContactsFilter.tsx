import { Input, Select, SelectItem } from '@heroui/react'
import { FC, ReactNode } from 'react'
import { CiSearch } from 'react-icons/ci'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { LuArrowDownAZ, LuArrowUpAZ } from 'react-icons/lu'
import { TbFilterDown, TbFilterUp } from 'react-icons/tb'

import { MdOutlineAlternateEmail, MdOutlinePhone } from 'react-icons/md'
import { PiUserListBold } from 'react-icons/pi'

type TProps = {
	filterText: string
	setFilterText: (args: string) => void
	filterCategory: string
	setFilterCategory: (args: any) => void
	sortCategory: string
	setSortCategory: (args: string) => void
}

type TFilterCategory = {
	key: string
	label: string
	icon: ReactNode
}

type TSortCategory = TFilterCategory

const ContactsFilter: FC<TProps> = ({
	filterText,
	setFilterText,
	filterCategory,
	setFilterCategory,
	sortCategory,
	setSortCategory,
}) => {
	const filterCategories: TFilterCategory[] = [
		{ key: 'username', label: 'Username', icon: <PiUserListBold /> },
		{ key: 'email', label: 'Email', icon: <MdOutlineAlternateEmail /> },
		{ key: 'phone', label: 'Phone', icon: <MdOutlinePhone /> },
		{ key: 'date', label: 'Date', icon: <LiaBirthdayCakeSolid /> },
	]

	const sortCategories: TSortCategory[] = [
		{ key: 'alphabetDesc', label: 'Alphabet DESC', icon: <LuArrowDownAZ /> },
		{ key: 'alphabetAsc', label: 'Alphabet ASC', icon: <LuArrowUpAZ /> },
		{ key: 'dateAddedDesc', label: 'Date added DESC', icon: <TbFilterDown /> },
		{ key: 'dateAddedAsc', label: 'Date added ASC', icon: <TbFilterUp /> },
	]

	return (
		<div className='flex flex-col pt-5 gap-3'>
			<Input
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

			<div className='flex justify-center gap-3'>
				<Select
					aria-label='filter categories'
					selectedKeys={[filterCategory]}
					className='w-xs'
					placeholder='Select a filter category'
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

				<Select
					aria-label='sort categories'
					selectedKeys={[sortCategory]}
					className='w-xs'
					placeholder='Select a sort category'
					onChange={e => {
						setSortCategory(e.target.value)
					}}
				>
					{sortCategories.map(el => (
						<SelectItem key={el.key} startContent={el.icon}>
							{el.label}
						</SelectItem>
					))}
				</Select>
			</div>
		</div>
	)
}

export default ContactsFilter
