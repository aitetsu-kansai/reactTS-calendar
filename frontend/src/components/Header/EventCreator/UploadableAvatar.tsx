import { Avatar } from '@heroui/react'
import { FC, useRef, useState } from 'react'
import { BiUpload } from 'react-icons/bi'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'

type TProps = {
	avatarUrl: string
	setAvatarUrl: (params: string) => void
	setAvatarFile: (params: File | null) => void
}

const UploadableAvatar: FC<TProps> = ({
	avatarUrl,
	setAvatarUrl,
	setAvatarFile,
}) => {
	const [av, setAv] = useState<any>()
	const uploadImage = async (e: any) => {
		const data = new FormData()
		const file = e.target.files[0]
		data.append('personAvatar', file)
		if (file) {
			try {
				const res = await fetch(
					'http://localhost:5000/contacts/uploadPersonAvatar',
					{
						method: 'POST',
						body: data,
					}
				)
				if (res.ok) {
					const result = await res.json()
					setAvatarFile(file)
					console.log(result)
				}
			} catch (error) {
				console.log('error', error)
			}
		}
	}

	const fileInputRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatarUrl(URL.createObjectURL(file))
			setAvatarFile(file)
		}
		console.log(avatarUrl)
	}

	const handleResetAvatar = () => {
		setAvatarUrl('')
		setAvatarFile(null)
	}

	return (
		<div className='relative w-45 h-45 group'>
			<Avatar className='w-45 h-45 text-large object-cover' src={avatarUrl} />

			<div className='absolute inset-0 bg-black bg-opacity-40 rounded-full flex flex-col items-center justify-around opacity-0 group-hover:opacity-60 transition-opacity duration-300 cursor-pointer'>
				{avatarUrl !== '' && (
					<MdOutlineRemoveCircleOutline
						className='text-white w-6 h-6  hover:scale-110 transition-all duration-150 ease-in'
						onClick={handleResetAvatar}
					/>
				)}
				<BiUpload
					className='text-white w-6 h-6 hover:scale-110 transition-all duration-150 ease-in '
					onClick={handleClick}
				/>
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className='hidden'
				onChange={handleFileChange}
			/>
		</div>
	)
}

export default UploadableAvatar
