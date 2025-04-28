import { FC } from 'react'
// import { TypeChildren } from '../../types/props'

type TypeChildren = {
	children: React.ReactNode
	visible: boolean
}

const Sidebar: FC<TypeChildren> = ({ children, visible }) => {
	return (
		<div
			className={`text-center pt-2 max-w-0 h-screen transition-all duration-300 ${
				visible ? 'max-w-100' : ''
			}`}
		>
			{children}
		</div>
	)
}

export default Sidebar
