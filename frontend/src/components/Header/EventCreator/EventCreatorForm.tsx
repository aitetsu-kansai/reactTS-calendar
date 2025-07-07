import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import { FC, Key, useState } from 'react'
import { useAppDispatch } from '../../../redux/slices/hooks'
import { toggleFormTab } from '../../../redux/slices/uiSlice'
import EventCreatorEvent from './EventCreatorEvent'
import EventCreatorPerson from './EventCreatorPerson'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorForm: FC<Props> = ({ formRef }) => {
	const [selected, setSelected] = useState<any>('event')

	const dispatch = useAppDispatch()

	const handleOnSelectionChange = (k: Key): any => {
		const tabKey = k as 'event' | 'person'
		setSelected(tabKey)
		dispatch(toggleFormTab(tabKey))
	}

	let tabs = [
		{
			id: 'event',
			label: 'Event',
			content: <EventCreatorEvent formRef={formRef} />,
		},
		{
			id: 'person',
			label: 'Person',
			content: <EventCreatorPerson formRef={formRef} />,
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
