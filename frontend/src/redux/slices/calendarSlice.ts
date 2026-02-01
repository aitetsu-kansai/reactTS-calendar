import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	TCalendarInfo,
	TCalendarLayout,
} from '../../../../share/types/calendar'
import { getWeekNumber } from '../../utils/calendarHelpers'
import { RootState } from '../store'

const today = new Date()
const todayDate = today.toISOString().slice(0, 10)

const initialState: TCalendarInfo = {
	currentDate: todayDate,
	currentDay: today.getDate(),
	currentYear: today.getFullYear(),
	currentMonth: today.toLocaleDateString('en-EN', { month: 'long' }),
	visibleMonth: 1,
	visibleWeek: getWeekNumber(today),
	sidebarFocusedDate: todayDate,
	focusedDate: todayDate,
	calendarLayout: 'week',
}

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		//calendar control
		switchNextWeek: (
			state,
			{ payload = 1 }: PayloadAction<number | undefined>,
		) => {
			state.visibleWeek += payload
		},
		switchToCurrentWeek: state => {
			state.visibleWeek = getWeekNumber(today)
		},
		switchPreviousWeek: (
			state,
			{ payload = 1 }: PayloadAction<number | undefined>,
		) => {
			state.visibleWeek -= payload
		},

		setVisibleWeek: (state, action: PayloadAction<number>) => {
			state.visibleWeek = action.payload
		},
		setFocusedDate: (state, action: PayloadAction<string>) => {
			state.focusedDate = action.payload
		},
		setSidebarFocusedDate: (state, action: PayloadAction<string>) => {
			state.sidebarFocusedDate = action.payload
		},
		switchCalendarLayout: (state, action: PayloadAction<TCalendarLayout>) => {
			state.calendarLayout = action.payload
		},
	},
})

export const selectCalendar = (state: RootState) => state.calendar
export const {
	switchNextWeek,
	switchPreviousWeek,
	switchToCurrentWeek,
	setVisibleWeek,
	setFocusedDate,
	switchCalendarLayout,
	setSidebarFocusedDate
} = calendarSlice.actions

export default calendarSlice.reducer
