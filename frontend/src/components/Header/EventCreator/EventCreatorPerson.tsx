import { DateInput, Form, Input } from '@heroui/react'
import { FC, useState } from 'react'
import { TContact } from '../../../types/events'
import PhoneInput from '../../PhoneInput'
import UploadableAvatar from './UploadableAvatar'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorPerson: FC<Props> = ({ formRef }) => {
	const [contactData, setContactData] = useState<TContact>({
		username: '',
		email: '',
		phone: null,
		date: null,
		avatarUrl: '',
	})

	const handleOnChange = (
		// e: ChangeEvent<HTMLInputElement>,
		e: any,
		parameter: keyof typeof contactData
	) => {
		setContactData({ ...contactData, [parameter]: e.target.value })
	}

	return (
		<>
			<div className='flex flex-wrap gap-4 justify-center'>
				<UploadableAvatar />
				<Form
					ref={formRef}
					className='w-full flex flex-col gap-4'
					onSubmit={e => {
						e.preventDefault()
						const data = Object.fromEntries(new FormData(e.currentTarget))
						console.log('Submitted data:', data)
						console.log(contactData)
					}}
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
						value={contactData.date}
						onChange={value => handleOnChange(value, 'date')}
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
