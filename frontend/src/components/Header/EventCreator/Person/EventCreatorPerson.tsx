import { DateInput, Form, Input } from '@heroui/react'
import { parseDate } from '@internationalized/date'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { LuUserRound } from 'react-icons/lu'
import { MdOutlineAlternateEmail, MdOutlinePhone } from 'react-icons/md'
import {
	TContact,
	TContactWithTempId,
} from '../../../../../../share/types/events'
import {
	createContact,
	updateContact,
} from '../../../../redux/slices/contactsSlice'
import { useAppDispatch } from '../../../../redux/slices/hooks'
import { getDate } from '../../../../utils/getDate'
import PhoneInput from '../../../PhoneInput'
import UploadableAvatar from './UploadableAvatar'

type CreateProps = {
	formRef: React.RefObject<HTMLFormElement>
	mode: 'create'
	isEditing?: boolean
	data?: undefined
}

type EditProps = {
	formRef: React.RefObject<HTMLFormElement>
	mode: 'edit'
	isEditing?: boolean
	data: TContact
}

type Props = CreateProps | EditProps

const EventCreatorPerson: FC<Props> = ({ formRef, mode, isEditing, data }) => {
	const isEditable = mode === 'create' || isEditing
	const isFormDisabled = mode === 'edit' ? !isEditing : false
	const inputVariant = mode === 'edit' ? 'underlined' : 'flat'
	const dispatch = useAppDispatch()

	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	const setAvatarUrl = (data: File | '') => {
		setContactData({
			...contactData,
			avatar: typeof data === 'string' ? '' : URL.createObjectURL(data),
		})
	}

	const [contactData, setContactData] = useState<TContactWithTempId>({
		username: '',
		email: '',
		phone: '',
		dateAdded: '',
		date: '',
		avatar: '',
	})

	useEffect(() => {
		if (mode === 'edit') {
			setContactData({ ...data })
		}
	}, [data, mode])

	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | any>,
		parameter: keyof typeof contactData
	) => {
		e.preventDefault()
		setContactData({ ...contactData, [parameter]: e.target.value })
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		if (mode === 'create') {
			const data = {
				...contactData,
				avatar: avatarFile,
				dateAdded: getDate().toString(),
			}

			const formData = new FormData()
			for (const [key, value] of Object.entries(data)) {
				if (value !== null && value !== undefined) formData.append(key, value)
			}
			dispatch(createContact(formData))
		} else if (mode === 'edit') {
			const changedFields = Object.fromEntries(
				Object.entries(contactData).filter(
					([key, value]) => data[key as keyof typeof data] !== value
				)
			)

			dispatch(updateContact({ ...changedFields, id: data.id }))
		}
	}

	const dateValue =
		contactData.date && contactData.date !== ''
			? parseDate(contactData.date)
			: null

	return (
		<>
			<div className='flex flex-wrap gap-4 justify-center'>
				{(mode === 'create' || isEditable) && (
					<UploadableAvatar
						avatarUrl={contactData.avatar || ''}
						setAvatarUrl={setAvatarUrl}
						setAvatarFile={setAvatarFile}
						mode={mode}
						isEditing={isEditing || false}
						isDisabled={isFormDisabled}
					/>
				)}
				<Form
					ref={formRef}
					className='w-full flex flex-col gap-4'
					onSubmit={handleSubmit}
				>
					{isEditable && (
						<Input
							value={contactData.username}
							onChange={e => handleOnChange(e, 'username')}
							isRequired
							startContent={<LuUserRound />}
							errorMessage='Please enter a valid username'
							name='username'
							placeholder={`Enter person's username`}
							type='text'
							variant={inputVariant}
							isDisabled={isFormDisabled}
						/>
					)}
					{(isEditable || contactData.email) && (
						<Input
							value={contactData.email}
							onChange={e => handleOnChange(e, 'email')}
							errorMessage='Please enter a valid email'
							startContent={<MdOutlineAlternateEmail />}
							name='email'
							placeholder={`Enter person's email`}
							type='email'
							variant={inputVariant}
							isDisabled={isFormDisabled}
						/>
					)}
					{(isEditable || contactData.phone) && (
						<PhoneInput
							isDisabled={isFormDisabled}
							variant={inputVariant}
							startContent={<MdOutlinePhone />}
							value={contactData.phone}
							onChange={newValue =>
								setContactData({ ...contactData, phone: newValue })
							}
						/>
					)}
					{(isEditable || contactData.date) && (
						<DateInput
							isDisabled={isFormDisabled}
							variant={inputVariant}
							value={dateValue}
							onChange={newDate => {
								setContactData({
									...contactData,
									date: newDate?.toString() || '',
								})
							}}
							startContent={<LiaBirthdayCakeSolid />}
							errorMessage='Please enter a valid date'
							label={'Birth date'}
							name='date'
						/>
					)}
				</Form>
			</div>
		</>
	)
}
export default EventCreatorPerson
