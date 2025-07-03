import mongoose from 'mongoose'
import config from './config'

const connectDB = async () => {
	console.log(config.mongoUrl)
	try {
		await mongoose.connect(config.mongoUrl, {})
		console.log('mongodb is connected')
	} catch (error) {
		console.log('connection error', error)
		process.exit(1)
	}
}
export default connectDB
