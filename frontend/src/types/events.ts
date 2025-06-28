import { DateValue } from '@heroui/react'

export type TEvent = {
	description: string
	date: `${number}-${number}-${number}`
	startEventTime: `${number}:${number}:${number}`
	endEventTime: `${number}:${number}:${number}`
}

export type TContact = {
	username: string
	email: string
	phone: string | null
	date: `${number}-${number}-${number}` | null | DateValue | any
	avatarUrl: string
}
