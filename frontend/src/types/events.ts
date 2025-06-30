import { DateValue } from '@heroui/react'

export type TEvent = {
	id: string
	description: string
	date: `${number}-${number}-${number}`
	startEventTime: `${number}:${number}:${number}`
	endEventTime: `${number}:${number}:${number}`
}

export type TContactWithoutId = {
	username: string
	email: string
	phone?: string | null
	date?: null | DateValue
	avatarUrl?: string
}

export type TContact = {
	id: string
} & TContactWithoutId
