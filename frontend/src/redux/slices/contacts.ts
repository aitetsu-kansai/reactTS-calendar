import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { TContact } from '../../../../share/types/events'
import { RootState } from '../store'

export const fetchContacts = createAsyncThunk<TContact[], string>(
	'contacts/fetchContacts',
	async (url: string, { rejectWithValue }) => {
		try {
			const res = await axios.get<TContact[]>(url)
			if (res.data) {
				return res.data
			} else {
				return rejectWithValue('Unknown error')
			}
		} catch (error: any) {
			return rejectWithValue(error.message || 'Unknown error')
		}
	}
)

export const deleteContact = createAsyncThunk<string, string>(
	'contacts/deleteContact',
	async (id: string, { rejectWithValue }) => {
		try {
			const res = await axios.delete<string>(
				`http://localhost:5000/contacts/${id}`
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
	reducers: {
		addContact: (state, action: PayloadAction<TContact>) => {
			if (action.payload) {
				state.push(action.payload)
			}
		},
		removeContact: (state, action: PayloadAction<string>) => {
			if (action.payload) {
				return state.filter(el => el.id === action.payload)
			}
		},
	},
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
			})
	},
})

export const { addContact, removeContact } = contactsSlice.actions

export const selectContacts = (state: RootState) => state.contacts

export default contactsSlice.reducer
