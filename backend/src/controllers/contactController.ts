import { Request, Response } from 'express'
import multer from 'multer'
import { upload } from '../config/multer'

export const uploadPersonAvatar = (req: Request, res: Response) => {
	upload(req, res, function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res
					.status(400)
					.json({ message: 'Image is too large. Maximum size is 15MB' })
			}
			return res.status(400).send({ message: error.message })
		} else if (error) {
			return res
				.status(500)
				.send({ message: 'Server error during file upload' })
		}

		const files = req.files as { personAvatar: Express.Multer.File[] }
		const file = files?.personAvatar[0]

		if (!file) {
			return res.status(400).json({ message: 'No file uploaded' })
		}

		console.log(file)
		res.status(200).send({
			message: 'File uploaded successfully',
			filePath: `http://localhost:7000/uploads/${file.filename}`,
		})
	})
}

// export const createContact = (req, res) => {

// }
