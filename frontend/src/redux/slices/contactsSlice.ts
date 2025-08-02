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
			return res.data
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

export const updateContact = createAsyncThunk<any, any>(
	'contacts/updateContact',
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.patch(
				`${BASE_URL}${CONTACTS_ENDPOINT}${data.id}`,
				data
			)

			if (!res.data) {
				return rejectWithValue("Can't update the contact. Server error.")
			}
			return res.data
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
				return (state = action.payload)
			}
		),
			builder.addCase(deleteContact.fulfilled, (state, action) => {
				return state.filter(contact => contact.id !== action.payload)
			}),
			builder.addCase(deleteContact.rejected, (_, action) => {
				console.error('Failed to delete contact:', action.error)
			}),
			builder.addCase(
				createContact.fulfilled,
				(state, action: PayloadAction<TContact>) => {
					state.push(action.payload)
				}
			),
			builder.addCase(createContact.rejected, (_, action) => {
				console.error('Failed to create contact:', action.error)
			}),
			builder.addCase(updateContact.fulfilled, (state, action) => {
				const contactIndex = state.findIndex(el => el.id === action.payload.id)
				if (contactIndex !== -1) {
					state[contactIndex] = { ...state[contactIndex], ...action.payload }
				}
			})
		builder.addCase(updateContact.rejected, (_, action) => {
			console.error('Failed to update contact:', action.error)
		})
	},
})

export const selectContacts = (state: RootState) => state.contacts

export default contactsSlice.reducer
