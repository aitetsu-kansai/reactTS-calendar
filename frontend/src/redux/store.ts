import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './slices/contacts'
import uiReducer from './slices/uiSlice'

const store = configureStore({
	reducer: {
		ui: uiReducer,
		contacts: contactsReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
