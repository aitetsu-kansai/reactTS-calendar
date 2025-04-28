import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TypeUI = {
	sidebarsStatus: {
		isLeftSidebarVisible: boolean
		isRightSidebarVisible: boolean
	}
}

const initialState: TypeUI = {
	sidebarsStatus: {
		isLeftSidebarVisible: true,
		isRightSidebarVisible: true,
	},
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state, action: PayloadAction<string>) => {
			action.payload === 'left'
				? (state.sidebarsStatus.isLeftSidebarVisible =
						!state.sidebarsStatus.isLeftSidebarVisible)
				: (state.sidebarsStatus.isRightSidebarVisible =
						!state.sidebarsStatus.isRightSidebarVisible)
		},
	},
})

export const {toggleSidebar} = uiSlice.actions

export const selectSidebarsStatus = (state: RootState) =>
	state.ui.sidebarsStatus

export default uiSlice.reducer
