import { Input } from '@heroui/react'
import { FC } from 'react'
import { useAppSelector } from '../../redux/slices/hooks'
import { selectSidebarsStatus } from '../../redux/slices/uiSlice'
import Sidebar from './Sidebar'

const RightSidebar: FC = () => {
	const isRightSidebarVisible =
		useAppSelector(selectSidebarsStatus).isRightSidebarVisible

	return (
		<>
			<div className='mt-[20px]'>
				<Sidebar visible={isRightSidebarVisible}>
					<Input
						className='w-50'
						aria-label='Search an event'
						placeholder='Search an event'
						size='md'
						variant='bordered'
						radius='full'
						classNames={{
							mainWrapper: 'h-10',
							inputWrapper: [
								'h-10',
								'min-h-10',
								'px-4',
								'border-1',
								'border-default-300',
								'data-[hover=true]:border-default-400',
								'group-data-[focus=true]:border-default-foreground',
								'group-data-[focus=true]:shadow-xs',
								'shadow-xs',
							].join(' '),
							input: 'text-sm placeholder:text-default-500',
							label: 'text-foreground/60 text-sm',
						}}
					/>
				</Sidebar>
			</div>
		</>
	)
}

export default RightSidebar
