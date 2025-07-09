import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TInfo } from '../../../../share/types/types'

const initialState: TInfo = {
	infoMessage: '',
	infoType: '',
}

const infoSlice = createSlice({
	name: 'info',
	initialState,
	reducers: {
		addInfo: (state: TInfo, action: PayloadAction<TInfo>) => {
			return (state = action.payload)
		},
		removeInfo: () => {
			return initialState
		},
	},
})

export const { addInfo, removeInfo } = infoSlice.actions

export default infoSlice.reducer
