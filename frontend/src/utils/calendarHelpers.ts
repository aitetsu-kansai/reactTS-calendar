export const getWeekNumber = (date: Date): number => {
	const temp = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	)
	const dayNum = temp.getUTCDay() || 7

	temp.setUTCDate(temp.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1))
	return Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7)
}

export const getDatesOfISOWeek = (week: number, year: number): Date[] => {
	const jan4 = new Date(year, 0, 4)
	const firstMonday = new Date(jan4)
	firstMonday.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1)

	const targetDate = new Date(firstMonday)

	targetDate.setDate(firstMonday.getDate() + (week - 1) * 7)

	return Array.from({ length: 7 }, (_, i) => {
		const d = new Date(targetDate)
		d.setDate(targetDate.getDate() + i)
		console.log(d)

		return d
	})
}
