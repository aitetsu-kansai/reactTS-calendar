import express from 'express'
import {
	createContact,
	deleteContact,
	getContacts,
	patchContact,
	uploadPersonAvatar,
} from '../controllers/contactController'

const router = express.Router()

router.post('/uploadPersonAvatar', uploadPersonAvatar)
router.post('/', createContact)
router.get('/', getContacts)
router.delete('/:id', deleteContact)
router.patch('/:id', patchContact)
export default router
