import { Request } from 'express'
import multer from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		callback: DestinationCallback
	) => {
		callback(null, '../storage/public')
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		callback: FileNameCallback
	) => {
		callback(null, `${file.originalname}`)
	},
})

export const upload = multer({
	storage,
	limits: { fileSize: 15 * (1024 * 1024) },
}).fields([{ name: 'personAvatar', maxCount: 1 }])
