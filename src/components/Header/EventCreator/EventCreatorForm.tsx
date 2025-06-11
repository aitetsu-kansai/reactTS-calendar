import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import { FC, useState } from 'react'
import { useAppDispatch } from '../../../redux/slices/hooks'
import { toggleFormTab } from '../../../redux/slices/uiSlice'
import EventCreatorEvent from './EventCreatorEvent'
import EventCreatorPerson from './EventCreatorPerson'

const EventCreatorForm: FC = () => {
	const [selected, setSelected] = useState<any>('event')

	const dispatch = useAppDispatch()

	const handleOnSelectionChange = (e: 'event' | 'person'):void => {
		setSelected(e)
		dispatch(toggleFormTab(e))
	}

	let tabs = [
		{
			id: 'event',
			label: 'Event',
			content: <EventCreatorEvent />,
		},
		{
			id: 'person',
			label: 'Person',
			content: <EventCreatorPerson />,
		},
	]

	return (
		<div className='flex w-full flex-col'>
			<Tabs
				aria-label='Dynamic tabs'
				items={tabs}
				selectedKey={selected}
				onSelectionChange={handleOnSelectionChange}
			>
				{item => (
					<Tab key={item.id} title={item.label}>
						<Card>
							<CardBody>{item.content}</CardBody>
						</Card>
					</Tab>
				)}
			</Tabs>
		</div>
	)
}

export default EventCreatorForm
