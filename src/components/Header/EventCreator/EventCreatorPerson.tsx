import { DateInput, Form, Input } from '@heroui/react'
import { FC } from 'react'
import PhoneInput from '../../PhoneInput'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
}

const EventCreatorPerson: FC<Props> = ({ formRef }) => {
	return (
		<>
			<div className='flex flex-wrap gap-4'>
				<Form
					ref={formRef}
					className='w-full flex flex-col gap-4'
					onSubmit={e => {
						e.preventDefault()
						const data = Object.fromEntries(new FormData(e.currentTarget))
						console.log('Submitted data:', data)
					}}
				>
					<Input
						isRequired
						errorMessage='Please enter a valid username'
						label='Username'
						name='username'
						placeholder={`Enter person's username`}
						type='text'
					/>

					<Input
						errorMessage='Please enter a valid email'
						label='Email'
						name='email'
						placeholder={`Enter person's email`}
						type='email'
					/>

					<PhoneInput />
					<DateInput
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
