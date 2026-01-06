import { Card, CardBody, Tab, Tabs } from '@heroui/react'
import { FC, Key, useMemo, useState } from 'react'
import { useAppDispatch } from '../../../redux/slices/hooks'
import { toggleFormTab } from '../../../redux/slices/uiSlice'
import EventCreatorEvent from './Event/EventCreatorEvent'
import EventCreatorPerson from './Person/EventCreatorPerson'

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
	console.log('11111')

	let tabs = useMemo(
		() => [
			{
				id: 'event',
				label: 'Event',
				content: <EventCreatorEvent formRef={formRef} />,
			},
			{
				id: 'person',
				label: 'Person',
				content: <EventCreatorPerson mode='create' formRef={formRef} />,
			},
		],
		[formRef]
	)

	return (
		<div className='flex w-full flex-col bg-component-bg'>
			<Tabs
				aria-label='Dynamic tabs'
				items={tabs}
				selectedKey={selected}
				onSelectionChange={handleOnSelectionChange}
				disableAnimation={false}
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
