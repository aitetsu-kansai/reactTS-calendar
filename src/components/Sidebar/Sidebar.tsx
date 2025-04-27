import { FC } from 'react'
// import { TypeChildren } from '../../types/props'

type TypeChildren = {
	children: React.ReactNode
	visible: boolean
}

const Sidebar: FC<TypeChildren> = ({ children, visible }) => {
	return (
		<div className={`text-center pt-2 ${visible ? 'bg-blue-500' : ''}`}>
			{children}
		</div>
	)
}

export default Sidebar
