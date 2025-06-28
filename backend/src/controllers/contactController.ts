import multer from 'multer'
import { upload } from '../config/multer'

export const uploadPersonAvatar = (req: any, res: any) => {
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

		if (!req.files || !req.files['personAvatar']) {
			return res.status(400).json({ message: 'No file uploaded' })
		}

		const file = req.files['personAvatar'][0]
		console.log(file)
		res.status(200).send({
			message: 'File uploaded successfully',
			filePath: `http://localhost:7000/uploads/${file.filename}`,
		})
	})
}
