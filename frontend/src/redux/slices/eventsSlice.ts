import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { TEvent } from '../../../../share/types/events'
import { BASE_URL, EVENTS_ENDPOINT } from '../../constants/config'

const initialState: TEvent[] = []

export const createEvent = createAsyncThunk(
	'events/createEvent',
	async (data: any, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASE_URL}${EVENTS_ENDPOINT}`, data)

			return response.data
		} catch (error: any) {
			rejectWithValue(error.message || 'Unknown error')
		}
	}
)

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {},
})

export default eventsSlice.reducer
