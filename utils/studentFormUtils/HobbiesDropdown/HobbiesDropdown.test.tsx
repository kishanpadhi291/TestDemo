// import React from 'react'
// import { render } from '@testing-library/react'
// import HobbiesDropdown from './HobbiesDropdown'

// describe('HobbiesDropdown', () => {
// 	it('Renders HobbiesDropdown without crashing', () => {
// 		const { container } = render(<HobbiesDropdown />)
// 		expect(container).toBeTruthy()
// 	})

// 	it('Sets default values correctly in HobbiesDropdown', () => {
// 		const defaultValue = ['Reading']
// 		const { getByLabelText } = render(
// 			<HobbiesDropdown defaultValue={defaultValue} />
// 		)

// 		const selectedChips =
// 			getByLabelText('Hobbies').querySelectorAll('.MuiChip-label')
// 		expect(selectedChips).toHaveLength(defaultValue.length)
// 		selectedChips.forEach((chip, index) => {
// 			expect(chip.textContent).toBe(defaultValue[index])
// 		})
// 	})
// })

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HobbiesDropdown from './HobbiesDropdown'

describe('HobbiesDropdown component', () => {
	// Mocking data for hobbies
	const mockHobbies = 'Reading,Coding,Gardening,Traveling'

	it('renders HobbiesDropdown component with default values', () => {
		render(<HobbiesDropdown />)
		expect(screen.getByLabelText('Hobbies')).toBeInTheDocument()
		// Add more assertions as needed
	})

	it('renders HobbiesDropdown component with default values provided', () => {
		render(<HobbiesDropdown defaultValue={'Reading'} />)
		expect(screen.getByText('Reading')).toBeInTheDocument()
		expect(screen.getByText('Coding')).toBeInTheDocument()
		// Add more assertions as needed
	})

	it('renders chips when hobbies are selected', () => {
		render(<HobbiesDropdown defaultValue={'Coding'} />)
		expect(screen.getByText('Coding')).toBeInTheDocument()
		// Add more assertions as needed
	})

	it('updates selected hobbies on user interaction', () => {
		render(<HobbiesDropdown />)
		const dropdown = screen.getByLabelText('Hobbies')

		userEvent.click(dropdown)
		userEvent.click(screen.getByText('Reading'))

		expect(screen.getByText('Reading')).toBeInTheDocument()

		userEvent.click(dropdown)
		// Add more assertions as needed
	})

	it('handles onChange prop correctly', () => {
		const onChangeMock = jest.fn()
		render(<HobbiesDropdown defaultValue={'Coding'} />)
		const dropdown = screen.getByLabelText('Hobbies')

		userEvent.click(dropdown)
		userEvent.click(screen.getByText('Coding'))

		expect(onChangeMock).toHaveBeenCalledWith('Coding')

		userEvent.click(dropdown)
		// Add more assertions as needed
	})

	// Add more test cases as needed to cover different scenarios
})
