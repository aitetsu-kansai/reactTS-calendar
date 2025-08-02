import { Input } from '@heroui/react'
import { FC, ReactNode } from 'react'

type TProps = {
	value: any
	variant: 'underlined' | 'flat'
	onChange: (value: any) => void
	startContent: ReactNode
	isDisabled: boolean
}

const PhoneInput: FC<TProps> = ({
	value,
	onChange,
	startContent,
	variant,
	isDisabled,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value
		let cleaned = raw.replace(/(?!^\+)\D/g, '')


		onChange(cleaned)
	}

	return (
		<Input
			minLength={10}
			startContent={startContent}
			maxLength={16}
			// label='Phone number'
			placeholder='+12345678900'
			value={value}
			onChange={handleChange}
			type='tel'
			name='phone'
			isDisabled={isDisabled}
			variant={variant}
		/>
	)
}

export default PhoneInput
