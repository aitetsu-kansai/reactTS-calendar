import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TContact } from '../../../../share/types/events'
import { BASE_URL, CONTACTS_ENDPOINT } from '../../constants/config'
import { showInfo } from '../../utils/showInfo'
import { RootState } from '../store'

export const fetchContacts = createAsyncThunk<TContact[]>(
	'contacts/fetchContacts',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.get<TContact[]>(`${BASE_URL}${CONTACTS_ENDPOINT}`)
			if (res.data) {
				return res.data
			} else {
				return rejectWithValue('Unknown error')
			}
		} catch (error: any) {
			showInfo(
				{
					infoType: 'danger',
					infoMessage: `Something went wrong: ${error}`,
				},
				dispatch
			)
			return rejectWithValue(error.message || 'Unknown error')
		}
	}
)

export const createContact = createAsyncThunk<any, FormData>(
	'contacts/createContact',
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const res = await axios.post(`${BASE_URL}${CONTACTS_ENDPOINT}`, data)
			showInfo(
				{ infoMessage: 'The contact was added', infoType: 'success' },
				dispatch
			)
			return res
		} catch (error: any) {
			showInfo(
				{ infoMessage: `Something went wrong: ${error}`, infoType: 'danger' },
				dispatch
			)
			return rejectWithValue(error.message || 'Unknown error')
		}
	}
)

export const deleteContact = createAsyncThunk<string, string>(
	'contacts/deleteContact',
	async (id, { rejectWithValue, signal }) => {
		try {
			const res = await axios.delete<string>(
				`${BASE_URL}${CONTACTS_ENDPOINT}${id}`,
				{ signal }
			)
			if (!res.data) {
				return rejectWithValue("Can't delete contact. Server error.")
			}
			return id
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
)

const initialState: TContact[] = []

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(
			fetchContacts.fulfilled,
			(state, action: PayloadAction<TContact[]>) => {
				console.log(action.payload)
				return (state = action.payload)
			}
		),
			builder.addCase(deleteContact.fulfilled, (state, action) => {
				return state.filter(contact => contact.id !== action.payload)
			}),
			builder.addCase(deleteContact.rejected, () => {
				console.log('rejected')
			}),
			builder.addCase(
				createContact.fulfilled,
				(state, action: PayloadAction<any>) => {
					console.log(action.payload)
					state.push(action.payload)
				}
			)
	},
})

export const selectContacts = (state: RootState) => state.contacts

export default contactsSlice.reducer
