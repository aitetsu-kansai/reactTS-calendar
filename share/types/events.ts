export type TEvent = {
	id: string
	description: string
	date: `${number}-${number}-${number}`
	startEventTime: `${number}:${number}:${number}`
	endEventTime: `${number}:${number}:${number}`
}

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
