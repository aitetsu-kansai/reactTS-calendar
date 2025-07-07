import { Input } from '@heroui/react'
import { FC } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import Sidebar from './Sidebar'

const RightSidebar: FC = () => {
	const isRightSidebarVisible =
		useAppSelector(selectSidebarsStatus).isRightSidebarVisible
	return (
		<>
			<div className='flex flex-col'>
				<Sidebar visible={isRightSidebarVisible}>
					<Input
						classNames={{
							base: 'max-w-full sm:max-w-[10rem] h-10 text-center mx-auto pt-5',
							mainWrapper: 'h-full',
							input: 'text-small',
							inputWrapper:
								'h-full font-normal text-default-500 bg-default-400/20',
						}}
						placeholder='Event to search...'
						size='md'
						startContent={<CiSearch size={18} />}
						type='search'
					/>
				</Sidebar>
			</div>
		</>
	)
}

export default RightSidebar
