import { Request, Response } from 'express'
import multer from 'multer'
import { TContact } from '../../../share/types/events'
import { upload } from '../config/multer'
import Contact from '../models/Contact'
import { generateRandomId } from '../utils/uuid'

export const uploadPersonAvatar = (req: Request, res: Response) => {
	upload(req, res, function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res
					.status(400)
					.json({ message: 'Image is too large. Maximum size is 15MB' })
			}
			return res.status(400).send({ message: error.message })
			return res.send({ message: 'Server error during file upload' })
		}

		const files = req.files as { personAvatar: Express.Multer.File[] }
		const file = files?.personAvatar[0]

		if (!file) {
			return res.status(400).json({ message: 'No file uploaded' })
		}

		res.status(200).send({
			message: 'File uploaded successfully',
			filePath: `http://localhost:5000/uploads/${file.filename}`,
		})
	})
}

export const createContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	upload(req, res, async function (error) {
		if (error instanceof multer.MulterError) {
			if (error.code === 'LIMIT_FILE_SIZE') {
				return res
					.status(400)
					.json({ message: 'Image is too large. Maximum size is 15MB' })
			}
			return res.status(400).json({ message: error })
		}

		try {
			const contactData: TContact = req.body

			if (!contactData) {
				return res.status(400).json({ message: 'Contact data is required' })
			}

			const newContact = new Contact({
				...contactData,
				id: generateRandomId(),
				avatar: req.file
					? `http://localhost:5000/uploads/${req.file?.filename}`
					: '',
			})
			await newContact.save()
			res.status(201).json(newContact)
		} catch (error) {
			res.status(500).json({ message: 'Server error', error })
		}
	})
}

export const getContacts = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const contacts = await Contact.find()
		res.json(contacts)
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}

export const deleteContact = async (
	req: Request,
	res: Response
): Promise<void> => {
	let aborted = false
	req.on('close', () => {
		if (!res.writableEnded) {
			aborted = true
			console.log('DELETE request ignored, aborted by user')
		}
	})
	setTimeout(async () => {
		if (aborted) return
		try {
			const contactId = req.params.id
			const contactToDelete = await Contact.findOneAndDelete({ id: contactId })
			console.log(contactToDelete)

			if (!contactToDelete) {
				res.status(400).json({ error: 'The contact is not found' })
				return
			}
			res.json({ message: 'The contact deleted', contactToDelete })
		} catch (error) {
			res.status(500).json({ error: 'Contact deletion error' })
		}
	}, 2500)
}

export const patchContact = async (req: Request, res: Response) => {
	try {
		const id = req.body.id
		console.log(req.body)
		const updatedContact = await Contact.findOneAndUpdate(
			{ id: id },
			{ $set: req.body },
			{ new: true }
		)
		console.log(id)
		console.log(updatedContact)
		res.json(updatedContact)
	} catch (error) {}
}
