import { createSlice } from '@reduxjs/toolkit'
import { TEvent } from '../../types/events'

const initialState: TEvent[] = []

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {},
})

export default eventsSlice.reducer
