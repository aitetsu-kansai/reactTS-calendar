import { DateInput, DateValue, Form, Input } from '@heroui/react'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { LuUserRound } from 'react-icons/lu'
import { MdOutlineAlternateEmail, MdOutlinePhone } from 'react-icons/md'
import { TContactWithTempId } from '../../../../../../share/types/events'
import {
	createContact,
	updateContact,
} from '../../../../redux/slices/contactsSlice'
import { useAppDispatch } from '../../../../redux/slices/hooks'
import { getDate } from '../../../../utils/getDate'
import PhoneInput from '../../../PhoneInput'
import UploadableAvatar from './UploadableAvatar'

type Props = {
	formRef: React.RefObject<HTMLFormElement>
	mode: 'create' | 'edit'
	isEditing?: boolean
	data?: any
}

const EventCreatorPerson: FC<Props> = ({ formRef, mode, isEditing, data }) => {
	const dispatch = useAppDispatch()

	const [date, setDate] = useState<DateValue | null>(null)
	const [avatarFile, setAvatarFile] = useState<File | null>(null)

	const setAvatarUrl = (data: File | '') => {
		setContactData({
			...contactData,
			avatar: typeof data === 'string' ? '' : URL.createObjectURL(data),
		})
		console.log(data)
	}

	const [contactData, setContactData] = useState<TContactWithTempId>({
		username: '',
		email: '',
		phone: '',
		dateAdded: '',
		date: date,
		avatar: '',
	})

	useEffect(() => {
		if (mode === 'edit') {
			setContactData({ ...data })
		}
	}, [])

	const handleOnChange = (
		e: ChangeEvent<HTMLInputElement | any>,
		parameter: keyof typeof contactData
	) => {
		console.log(e.target.value)
		setContactData({ ...contactData, [parameter]: e.target.value })
	}

	const handleCreate = async (e: any) => {
		e.preventDefault()

		const data = {
			...contactData,
			date: date?.toString(),
			avatar: avatarFile,
			dateAdded: getDate().toString(),
		}

		const formData = new FormData()
		for (const [key, value] of Object.entries(data)) {
			if (value !== null && value !== undefined) formData.append(key, value)
		}

		dispatch(createContact(formData))
	}

	const handleEdit = async (e: any) => {
		e.preventDefault()
		const changedFields = Object.fromEntries(
			Object.entries(contactData).filter(
				([key, value]) => data[key as keyof typeof data] !== value
			)
		)
		console.log({ ...changedFields, id: data.id })
		console.log(contactData.avatar)
		dispatch(updateContact({ ...changedFields, id: data.id }))
	}

	return (
		<>
			<div className='flex flex-wrap gap-4 justify-center'>
				<UploadableAvatar
					avatarUrl={contactData.avatar || ''}
					setAvatarUrl={setAvatarUrl}
					setAvatarFile={setAvatarFile}
					mode={mode}
					isEditing={isEditing || false}
					isDisabled={mode === 'edit' ? !isEditing : false}
				/>
				<Form
					ref={formRef}
					className='w-full flex flex-col gap-4'
					onSubmit={mode === 'edit' ? handleEdit : handleCreate}
				>
					<Input
						value={contactData.username}
						onChange={e => handleOnChange(e, 'username')}
						isRequired
						startContent={<LuUserRound />}
						errorMessage='Please enter a valid username'
						name='username'
						placeholder={`Enter person's username`}
						type='text'
						variant={mode === 'edit' ? 'underlined' : 'flat'}
						isDisabled={mode === 'edit' ? !isEditing : false}
					/>

					<Input
						value={contactData.email}
						onChange={e => handleOnChange(e, 'email')}
						errorMessage='Please enter a valid email'
						startContent={<MdOutlineAlternateEmail />}
						name='email'
						placeholder={`Enter person's email`}
						type='email'
						variant={mode === 'edit' ? 'underlined' : 'flat'}
						isDisabled={mode === 'edit' ? !isEditing : false}
					/>
					<PhoneInput
						isDisabled={mode === 'edit' ? !isEditing : false}
						variant={mode === 'edit' ? 'underlined' : 'flat'}
						startContent={<MdOutlinePhone />}
						value={contactData.phone}
						onChange={newValue =>
							setContactData({ ...contactData, phone: newValue })
						}
					/>
					<DateInput
						isDisabled={mode === 'edit' ? !isEditing : false}
						variant={mode === 'edit' ? 'underlined' : 'flat'}
						value={date}
						onChange={setDate}
						startContent={<LiaBirthdayCakeSolid />}
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
