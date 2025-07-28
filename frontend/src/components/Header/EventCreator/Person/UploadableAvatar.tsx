import { Avatar } from '@heroui/react'
import { FC, useRef } from 'react'
import { BiUpload } from 'react-icons/bi'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'

type TProps = {
	avatarUrl: string
	mode: 'edit' | 'create'
	setAvatarUrl: (params: any) => any
	setAvatarFile: (params: File | null) => void
	isDisabled: boolean
	isEditing: boolean
}

const UploadableAvatar: FC<TProps> = ({
	avatarUrl,
	setAvatarUrl,
	setAvatarFile,
	isEditing,
}) => {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setAvatarUrl(file)

			setAvatarFile(file)
		}
	}

	const handleResetAvatar = () => {
		setAvatarUrl('')
		setAvatarFile(null)
	}

	return (
		isEditing && (
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
	)
}

export default UploadableAvatar
