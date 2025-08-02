export type TBirthKey = {
	label: string
	key: string
}

export type TColors =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
	| ''

export type TInfo = {
	infoMessage: string
	infoType: TColors
}
