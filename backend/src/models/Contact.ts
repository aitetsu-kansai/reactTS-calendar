import mongoose from 'mongoose'
import { TContact } from '../../../share/types/events'

export interface IContact extends TContact, Document {}

const contactSchema = new mongoose.Schema<IContact>({
	id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: false },
	phone: { type: String, required: false },
	date: { type: String, required: false },
	avatarUrl: { type: String, required: false },
})

const Contact = mongoose.model<IContact>('Contact', contactSchema)
export default Contact
