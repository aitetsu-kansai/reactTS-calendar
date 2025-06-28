import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
	id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: false },
	phoneNumber: { type: String, required: false },
	birthDate: { type: String, required: false },
	personImage: { type: Image, required: false },
})

const Person = mongoose.model('Person', personSchema)
export default Person
