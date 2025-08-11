import { FC } from 'react'
import { TypeChildren } from '../../../../share/types/props'

type TChildren = {
	visible: boolean
} & TypeChildren

const Sidebar: FC<TChildren> = ({ children, visible }) => {
	return (
		<div
			className={`text-center max-w-0 h-screen ${visible ? 'max-w-100' : ''}`}
		>
			{children}
		</div>
	)
}

export default Sidebar
