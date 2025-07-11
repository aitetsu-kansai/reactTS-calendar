import { addToast } from '@heroui/react'
import { Dispatch } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { TInfo } from '../../../share/types/types'
import { addInfo, removeInfo } from '../redux/slices/infoSlice'

export const showInfo = (
	info: TInfo,
	dispatch: Dispatch,
	endContent?: ReactNode | null
) => {
	addToast({
		title: info.infoMessage,
		color: info.infoType || 'default',
		endContent: endContent ? endContent : null,
	})
	dispatch(addInfo(info))
	setTimeout(() => {
		dispatch(removeInfo())
	}, 2500)
}
