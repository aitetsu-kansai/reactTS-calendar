import { addToast } from '@heroui/react'
import { Dispatch } from '@reduxjs/toolkit'
import { TInfo } from '../../../share/types/types'
import { addInfo, removeInfo } from '../redux/slices/infoSlice'

export const showInfo = (info: TInfo, dispatch: Dispatch) => {
	addToast({
		title: info.infoMessage,
		color: info.infoType || 'default',
		timeout: 2500,
	})
	dispatch(addInfo(info))
	setTimeout(() => {
		dispatch(removeInfo())
	}, 2500)
}
