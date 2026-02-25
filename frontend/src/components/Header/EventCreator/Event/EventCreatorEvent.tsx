import {
	Checkbox,
	DatePicker,
	Form,
	Textarea,
	TimeInput,
	TimeInputValue,
} from '@heroui/react'
import { getLocalTimeZone, today } from '@internationalized/date'
import { FC, useEffect, useState } from 'react'
import { TEventWithoutId } from '../../../../../../share/types/events'
import { createEvent } from '../../../../redux/slices/eventsSlice'
import { useAppDispatch } from '../../../../redux/slices/hooks'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorEvent: FC<Props> = ({ formRef }) => {
	const dispatch = useAppDispatch()
	const [isAllDay, setIsALlDay] = useState<boolean>(false)

	const [eventData, setEventData] = useState<TEventWithoutId<TimeInputValue>>({
		description: '',
		date: '',
		startEventTime: null,
		endEventTime: null,
		eventEndDate: '',
	})

	const handleOnChange = <K extends keyof TEventWithoutId>(
		newVal: TEventWithoutId[K],
		property: K
	) => {
		setEventData(prev => ({
			...prev,
			[property]: newVal,
		}))
	}

	const handleOnSubmit = async (e: any) => {
		e.preventDefault()

		console.log(eventData)
		dispatch(createEvent(eventData))
	}

	useEffect(() => {
		if (isAllDay) {
			setEventData(prev => ({
				...prev,
				startEventTime: null,
				endEventTime: null,
			}))
		} else {
			setEventData(prev => ({ ...prev, eventEndDate: '' }))
		}
	}, [isAllDay])

	return (
		<>
			<Form
				ref={formRef}
				className='w-full flex flex-col gap-4'
				onSubmit={handleOnSubmit}
			>
				<div className='flex flex-wrap gap-4'>
					<Textarea
						name='description'
						isClearable
						label='Event description'
						placeholder='Description'
						isRequired
						value={eventData.description}
						onChange={e => handleOnChange(e.target.value, 'description')}
					/>
					<DatePicker
						defaultValue={today(getLocalTimeZone())}
						errorMessage='Please enter a valid date'
						label={'Event date'}
						name='date'
						onChange={newVal => {
							if (newVal) {
								handleOnChange(newVal.toString(), 'date')
							}
						}}
					/>
					{isAllDay ? (
						<DatePicker
							defaultValue={today(getLocalTimeZone())}
							errorMessage='Please enter a valid date'
							label={'Event end date'}
							name='date'
							onChange={newVal =>
								handleOnChange(newVal?.toString() || '', 'eventEndDate')
							}
						/>
					) : (
						<>
							<TimeInput
								label='Start event time'
								name='startEvent'
								value={eventData.startEventTime}
								onChange={newVal => handleOnChange(newVal, 'startEventTime')}
							/>
							<TimeInput
								label='End event time'
								name='endEvent'
								value={eventData.endEventTime}
								onChange={newVal => handleOnChange(newVal, 'endEventTime')}
							/>
						</>
					)}
				</div>
				<div className='flex py-2 px-1 justify-between'>
					<Checkbox
						isSelected={isAllDay}
						onValueChange={setIsALlDay}
						name='isAllDay'
						classNames={{
							label: 'text-small',
						}}
					>
						All day
					</Checkbox>
				</div>
			</Form>
		</>
	)
}

export default EventCreatorEvent
