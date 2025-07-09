import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './slices/contactsSlice'
import infoReducer from './slices/infoSlice'
import uiReducer from './slices/uiSlice'

const store = configureStore({
	reducer: {
		ui: uiReducer,
		contacts: contactsReducer,
		info: infoReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
