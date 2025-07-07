import { DateInput, DateValue, Form, Input } from '@heroui/react'
import axios from 'axios'
import { ChangeEvent, FC, useState } from 'react'
import { TContactWithTempId } from '../../../../../share/types/events'
import { addContact } from '../../../redux/slices/contacts'
import { useAppDispatch } from '../../../redux/slices/hooks'
import PhoneInput from '../../PhoneInput'
import UploadableAvatar from './UploadableAvatar'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorPerson: FC<Props> = ({ formRef }) => {
	const dispatch = useAppDispatch()

	const [date, setDate] = useState<DateValue | null>(null)
	const [avatarUrl, setAvatarUrl] = useState<string>('')
	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	const [contactData, setContactData] = useState<TContactWithTempId>({
		username: '',
		email: '',
		phone: '',
	})

	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement>,
		parameter: keyof typeof contactData
	) => {
		setContactData({ ...contactData, [parameter]: e.target.value })
	}

	const handleOnSubmit = async (event: any) => {
		event.preventDefault()
		const data = {
			...contactData,
			date: date?.toString(),
			avatarUrl: avatarFile,
		}

		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (value !== null && value !== undefined) formData.append(key, value)
		}

		try {
			axios
				.post('http://localhost:5000/contacts/', formData)
				.then(res => dispatch(addContact(res.data)))
				.catch(err => console.log('ERR', err))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<div className='flex flex-wrap gap-4 justify-center'>
				<UploadableAvatar
					avatarUrl={avatarUrl}
					setAvatarUrl={setAvatarUrl}
					setAvatarFile={setAvatarFile}
				/>
				<Form
					ref={formRef}
					className='w-full flex flex-col gap-4'
					onSubmit={handleOnSubmit}
				>
					<Input
						value={contactData.username}
						onChange={e => handleOnChange(e, 'username')}
						isRequired
						errorMessage='Please enter a valid username'
						label='Username'
						name='username'
						placeholder={`Enter person's username`}
						type='text'
					/>

					<Input
						value={contactData.email}
						onChange={e => handleOnChange(e, 'email')}
						errorMessage='Please enter a valid email'
						label='Email'
						name='email'
						placeholder={`Enter person's email`}
						type='email'
					/>
					<PhoneInput value={contactData.phone} onChange={handleOnChange} />
					<DateInput
						value={date}
						onChange={setDate}
						errorMessage='Please enter a valid date'
						label={'Birth date'}
						name='date'
					/>
				</Form>
			</div>
		</>
	)
}
export default EventCreatorPerson
