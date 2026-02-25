export type EventTime = {
	hour: number
	millisecond: number
	minute: number
	second: number
}

export type TEventWithoutId<TimeInput=unknown> = {
	description: string
	date: string
	startEventTime?: TimeInput | null
	endEventTime?: TimeInput | null
	eventEndDate?: string
}

export type TEvent = { id: string } & TEventWithoutId

export type TContactWithTempId = {
	username: string
	email?: string
	phone?: string | null
	date?: string | null | any
	avatar?: string | undefined
	dateAdded: string
}

export type TContact = {
	id: string
} & TContactWithTempId
