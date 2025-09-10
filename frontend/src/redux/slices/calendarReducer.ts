import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWeekNumber } from '../../utils/calendarHelpers'
import { RootState } from '../store'

const today = new Date()

const initialState = {
	currentDate: today,
	currentYear: today.getFullYear(),
	currentMonth: today.toLocaleDateString('en-EN', { month: 'long' }),
	visibleMonth: 1,
	visibleWeek: getWeekNumber(today),
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		switchNextWeek: (
			state,
			{ payload = 1 }: PayloadAction<number | undefined>
		) => {
			state.visibleWeek += payload
		},
		switchToCurrentWeek: state => {
			state.visibleWeek = getWeekNumber(today)
		},
		switchPreviousWeek: (
			state,
			{ payload = 1 }: PayloadAction<number | undefined>
		) => {
			state.visibleWeek -= payload
		},
	},
})

export const selectCalendar = (state: RootState) => state.calendar
export const { switchNextWeek, switchPreviousWeek, switchToCurrentWeek } = calendarSlice.actions

export default calendarSlice.reducer
