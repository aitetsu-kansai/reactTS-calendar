import { createSlice } from '@reduxjs/toolkit'

type TFilter = {
	contacts: {
		filterCategory: 'date' | 'phone' | 'username' | 'email' | ''
		filterText: string
	}
}

const initialState: TFilter = {
	contacts: {
		filterCategory: '',
		filterText: '',
	},
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {},
})
