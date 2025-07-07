import express from 'express'
import {
	createContact,
	getContacts,
	uploadPersonAvatar,
} from '../controllers/contactController'

const router = express.Router()

router.post('/uploadPersonAvatar', uploadPersonAvatar)
router.post('/', createContact)
router.get('/', getContacts)

export default router
