import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TContact, TEvent } from '../../types/events'

interface EventState {
	events: TEvent[]
	contacts: TContact[]
}

const initialState: EventState = {
	events: [],
	contacts: [],
}

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		addContact: (state, action: PayloadAction<any>) => {
			state.contacts.push(action.payload)
		},
	},
})

export default eventsSlice.reducer
