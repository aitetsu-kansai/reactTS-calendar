import { Input } from '@heroui/react'
import { FC } from 'react'

type TProps = {
	value: any
	onChange: (value: any) => void
}

const PhoneInput: FC<TProps> = ({ value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		let cleaned = raw.replace(/(?!^\+)\D/g, '')

		if (!cleaned.startsWith('+')) {
			return cleaned
		}

		onChange(cleaned)
	}

	return (
		<Input
			minLength={10}
			maxLength={16}
			label='Phone number'
			placeholder='+12345678900'
			value={value}
			onChange={handleChange}
			type='tel'
			name='phone'
		/>
	)
}

export default PhoneInput
