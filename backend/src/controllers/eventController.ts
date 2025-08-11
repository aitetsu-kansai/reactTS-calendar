import Event from '../models/Event'
import { generateRandomId } from '../utils/uuid'

export const createEvent = async (req: Request, res: any) => {
	try {
		const eventData = req.body
		console.log(eventData)
		if (!eventData) {
			return res.status(400).json({ message: 'Event data is required' })
		}
		const newEvent = new Event({ ...eventData, id: generateRandomId() })
		await newEvent.save()
		return res.status(201).json(newEvent)
	} catch (error: any) {
		console.log(error.message)
	}
}
