import express from 'express'
import {
	createContact,
	deleteContact,
	getContacts,
	uploadPersonAvatar,
} from '../controllers/contactController'

const router = express.Router()

router.post('/uploadPersonAvatar', uploadPersonAvatar)
router.post('/', createContact)
router.get('/', getContacts)
router.delete("/:id", deleteContact)

export default router
