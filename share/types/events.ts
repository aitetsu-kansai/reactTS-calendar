export type TEvent = {
	id: string
	description: string
	date: `${number}-${number}-${number}`
	startEventTime: `${number}:${number}:${number}`
	endEventTime: `${number}:${number}:${number}`
}

export type TContactWithTempId = {
	username: string
	email: string
	phone?: string | null
	date?: null | string
	// avatarUrl?: string
	avatarUrl?: any
}

export type TContact = {
	id: string
} & TContactWithTempId
