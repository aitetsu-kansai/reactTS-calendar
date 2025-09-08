import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './slices/contactsSlice'
import infoReducer from './slices/infoSlice'
import uiReducer from './slices/uiSlice'
import calendarReducer from "./slices/calendarReducer"

const store = configureStore({
	reducer: {
		ui: uiReducer,
		contacts: contactsReducer,
		info: infoReducer,
		calendar: calendarReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
