import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWeekNumber } from '../../utils/calendarHelpers'
import { RootState } from '../store'

const today = new Date()

const initialState = {
	currentDate: today,
	currentYear: today.getFullYear(),
	visibleWeek: getWeekNumber(today),
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		switchNextWeek: state => {
			state.visibleWeek += 1
		},
		switchPreviousWeek: (state, action?: PayloadAction<number>) => {
			state.visibleWeek -= action?.payload ? action.payload : 1
		},
	},
})

export const selectCalendar = (state: RootState) => state.calendar
export const { switchNextWeek, switchPreviousWeek } = calendarSlice.actions

export default calendarSlice.reducer
