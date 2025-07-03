import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TContact, TContactWithTempId } from '../../../../share/types/events'
import { RootState } from '../store'

const initialState: (TContactWithTempId | TContact)[] = []

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		addContact: (state, action: PayloadAction<TContactWithTempId>) => {
			if (action.payload) {
				state.push(action.payload)
			}
		},
	},
})

export const { addContact } = contactsSlice.actions

export const selectContacts = (state: RootState) => state.contacts

export default contactsSlice.reducer
