export type TCalendarLayout = 'week' | 'day' | 'month' | 'year'

export type TCalendarInfo<T> = {
	currentDate: string
	currentDay: number
	currentYear: number
	currentMonth: string
	visibleMonth: number
	visibleWeek: number
	focusedDate: T | null
	calendarLayout: TCalendarLayout
}
