import express from 'express'
import { uploadPersonAvatar } from '../controllers/contactController'

const router = express.Router()


router.post('/uploadPersonAvatar', uploadPersonAvatar)

export default router
