import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface TypeUI {
	sidebarsStatus: {
		isLeftSidebarVisible: boolean
		isRightSidebarVisible: boolean
	}
	tabs: {
		activeFormTab: 'event' | 'person'
	}
}

const initialState: TypeUI = {
	sidebarsStatus: {
		isLeftSidebarVisible: true,
		isRightSidebarVisible: true,
	},
	tabs: {
		activeFormTab: 'event',
	},
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case 'left':
					state.sidebarsStatus.isLeftSidebarVisible =
						!state.sidebarsStatus.isLeftSidebarVisible
					break

				case 'right':
					state.sidebarsStatus.isRightSidebarVisible =
						!state.sidebarsStatus.isRightSidebarVisible
					break
			}
		},
		toggleFormTab: (state, action: PayloadAction<string>) => {
			switch (action.payload) {
				case state.tabs.activeFormTab:
					break
				case 'event':
					state.tabs.activeFormTab = 'event'
					break

				case 'person':
					state.tabs.activeFormTab = 'person'
					break
			}
		},
	},
})

export const { toggleSidebar, toggleFormTab } = uiSlice.actions

export const selectSidebarsStatus = (state: RootState) =>
	state.ui.sidebarsStatus
export const selectFormTab = (state: RootState) => state.ui.tabs.activeFormTab

export default uiSlice.reducer
