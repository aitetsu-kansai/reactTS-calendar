import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWeekNumber } from '../../utils/calendarHelpers'
import { RootState } from '../store'
import { DateValue } from '@heroui/react'
import { TCalendarInfo } from '../../../../share/types/calendar'

const today = new Date()

const initialState:TCalendarInfo<DateValue> = {
	currentDate: today.toISOString(),
	currentDay: today.getDate(),
	currentYear: today.getFullYear(),
	currentMonth: today.toLocaleDateString('en-EN', { month: 'long' }),
	visibleMonth: 1,
	visibleWeek: getWeekNumber(today),
	focusedDate: null,
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
		setVisibleWeek: (state, action: PayloadAction<number>) => {
			state.visibleWeek = action.payload
		},
		setFocusedDate: (state, action:PayloadAction<DateValue>) => {
			state.focusedDate = action.payload
		}
	},
})

export const selectCalendar = (state: RootState) => state.calendar
export const {
	switchNextWeek,
	switchPreviousWeek,
	switchToCurrentWeek,
	setVisibleWeek,
	setFocusedDate
} = calendarSlice.actions

export default calendarSlice.reducer
