import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TContact } from '../../types/events'
import { RootState } from '@reduxjs/toolkit/query'

const initialState: TContact[] = []

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		addContact: (state, action:PayloadAction<TContact>) => {
			if (action.payload){

			}
		}
	},
})

// export {} = contactsSlice.actions


export default contactsSlice.reducer