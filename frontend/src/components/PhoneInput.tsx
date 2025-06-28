import { Input } from '@heroui/react'
import { FC, useState } from 'react'

type Props = {
	value: any
	onChange: any
}

const PhoneInput: FC<Props> = ({ value, onChange }) => {
	// const [phone, setPhone] = useState('')
	const [isValid, setIsValid] = useState(true)

	const validatePhone = (value: string) => {
		const phoneRegex = /^\+\d{1,3} \(\d{3}\) \d{3}-\d{2}-\d{2}$/
		return phoneRegex.test(value)
	}

	const formatPhone = (value: string) => {
		const cleaned = value.replace(/\D/g, '')
		let formatted = ''

		if (cleaned.length > 0) {
			const countryCode = cleaned.substring(0, 1)
			formatted += '+' + countryCode

			if (cleaned.length > countryCode.length) {
				formatted += ' ('
				formatted += cleaned.substring(
					countryCode.length,
					countryCode.length + 3
				)
			}

			if (cleaned.length > countryCode.length + 3) {
				formatted += ') '
				formatted += cleaned.substring(
					countryCode.length + 3,
					countryCode.length + 6
				)
			}

			if (cleaned.length > countryCode.length + 6) {
				formatted += '-'
				formatted += cleaned.substring(
					countryCode.length + 6,
					countryCode.length + 8
				)
			}

			if (cleaned.length > countryCode.length + 8) {
				formatted += '-'
				formatted += cleaned.substring(
					countryCode.length + 8,
					countryCode.length + 10
				)
			}
		}

		return formatted
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value
		const formatted = formatPhone(input)
		// setPhone(formatted)
		onChange(e, 'phone')
		setIsValid(validatePhone(formatted) || formatted.length === 0)
	}

	return (
		<Input
			label='Phone number'
			placeholder='+_ (___) ___-__-__'
			value={value}
			onChange={handleChange}
			type='tel'
			errorMessage={!isValid ? 'Enter current phone number' : undefined}
			isInvalid={!isValid}
			name='phone'
		/>
	)
}

export default PhoneInput
