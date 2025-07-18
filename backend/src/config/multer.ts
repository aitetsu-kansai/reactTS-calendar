import { Request } from 'express'
import multer from 'multer'
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const uploadDir = path.join(__dirname, '../storage/public/')

const storage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		callback: DestinationCallback
	) => {
		callback(null, uploadDir)
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		callback: FileNameCallback
	) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const ext = path.extname(file.originalname)
		const safeFilename = file.originalname
			.replace(ext, '')
			.replace(/[^a-zA-Z0-9]/g, '_')
			.toLowerCase()
		callback(null, `${safeFilename}-${uniqueSuffix}${ext}`)
	},
})

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jiff']
	if (allowedTypes.includes(file.mimetype)) {
		callback(null, true)
	} else {
		callback(new Error('Only images (JPEG, PNG, GIF, JIFF) are allowed'))
	}
}

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 15 * (1024 * 1024), files: 1 },
}).single('avatar')
