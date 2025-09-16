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

		return d
	})
}

export const getMonthsOfWeek = (week: number, year: number): string[] => {
	const dates = getDatesOfISOWeek(week, year)
	// const months = dates.map(date =>
	// 	date.toLocaleString('en-EN', { month: 'long' })
	// )
	// console.log(months)

	// return [...new Set(months)]

	const months: string[] = []

	for (let i = 0; i < dates.length; i++) {
		const element = dates[i].toLocaleString('en-EN', { month: 'long' })
		months.includes(element) ? false : months.push(element)
	}
	console.log(months)
	return months
}

export const getYearOfWeek = (week: number, year: number): string[] => {
	const dates = getDatesOfISOWeek(week, year)

	const years: string[] = []

	for (let i = 0; i < dates.length; i++) {
		const element = dates[i].toLocaleString('en-EN', { year: 'numeric' })
		years.includes(element) ? false : years.push(element)
	}
	return years
	// console.log(yearss)
	// const years = dates.map(date =>
	// 	date.toLocaleString('en-EN', { year: 'numeric' })
	// )
}
