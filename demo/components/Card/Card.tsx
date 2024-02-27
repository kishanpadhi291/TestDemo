import React, { ReactNode } from 'react'
import './card.scss'

// Define the prop types for the Card component
interface CardProps {
	children: ReactNode
}

// Card component that wraps its children in a styled container
const Card: React.FC<CardProps> = ({ children }) => {
	return (
		<div className='card-container'>
			{/* Render the child components */}
			{children}
		</div>
	)
}

// Export the Card component for use in the application.
export default Card
