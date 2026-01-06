import { FC } from 'react'
import { TypeChildren } from '../../../../share/types/props'

type TChildren = {
	visible: boolean
} & TypeChildren

const Sidebar: FC<TChildren> = ({ children, visible }) => {
	return (
		<div
			className={`
      h-screen 
      transition-all duration-400 ease
      overflow-hidden
      ${visible ? 'w-[300px] opacity-100' : 'w-0 opacity-0'}
    `}
		>
			{children}
		</div>
	)
}

export default Sidebar
