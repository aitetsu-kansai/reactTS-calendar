import mongoose from 'mongoose'
import { TEvent } from '../../../share/types/events'

export interface IEvent extends TEvent, Document {}

const eventSchema = new mongoose.Schema({
	id: String,
	description: String,
	date: String,
	startEventTime: Object,
	endEventTime: Object,
	endEventDate: String,
})

const Event = mongoose.model<IEvent>('Event', eventSchema)
export default Event
