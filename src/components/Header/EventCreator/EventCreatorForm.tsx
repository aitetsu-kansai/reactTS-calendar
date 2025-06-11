import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import { FC } from 'react'
import EventCreatorEvent from './EventCreatorEvent'
import EventCreatorPerson from './EventCreatorPerson'

const EventCreatorForm: FC = () => {
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
			<Tabs aria-label='Dynamic tabs' items={tabs}>
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
