// import React from 'react';
// import { act, render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import StudentTable from './StudentTable';
// import { Provider } from 'react-redux';
// import { store } from '@/lib/store/store';
// import { mockDataOfStudentTable } from '@/utils/data/mockData';

// jest.mock('axios');

// jest.mock('next/navigation', () => ({
//     ...jest.requireActual('next/navigation'),
//     useRouter: jest.fn(),
// }));

// const mockUseSelector = jest.fn();
// const mockUseDispatch = jest.fn();

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useSelector: (selector: unknown) => mockUseSelector(selector),
//     useDispatch: () => mockUseDispatch,
// }));

// describe("StudentTable", () => {
//     beforeEach(() => {
//         mockUseSelector.mockImplementation(() => mockDataOfStudentTable);
//     });
//     it("Renders StudentTable Successfully.", () => {
//         const { container } = render(<Provider store={store}><StudentTable /></Provider>);
//         expect(container).toBeTruthy();
//     });

//     it('Renders StudentTable component', () => {
//         render(<Provider store={store}><StudentTable /></Provider>);
//         expect(screen.getByText('Name')).toBeInTheDocument();
//         expect(screen.getByText('Email')).toBeInTheDocument();
//         expect(screen.getByText('Contact')).toBeInTheDocument();
//     });

//     it('Filters rows based on input', async () => {
//         act(() => {
//             render(<Provider store={store}><StudentTable /></Provider>);
//         })
//         expect(screen.getByText('John')).toBeInTheDocument();
//         expect(screen.getByText('john@example.com')).toBeInTheDocument();
//         expect(screen.getByText('123-456-7890')).toBeInTheDocument();
//     });

// })

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import StudentTable from './StudentTable'
import { deleteData, editStudentData, setCurrentData } from '@/lib/studentSlice'
import { store } from '@/lib/store/store'
import { mockDataOfStudentTable } from '@/utils/data/mockData'

jest.mock('next/navigation', () => ({
	...jest.requireActual('next/navigation'),
	useRouter: jest.fn(),
}))

const mockUseSelector = jest.fn()
const mockUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: (selector: unknown) => mockUseSelector(selector),
	useDispatch: () => mockUseDispatch,
}))

describe('StudentTable Component', () => {
	beforeEach(() => {
		mockUseSelector.mockImplementation(() => mockDataOfStudentTable)
	})
	it('Renders StudentTable Successfully.', () => {
		const { container } = render(
			<Provider store={store}>
				<StudentTable />
			</Provider>
		)
		expect(container).toBeTruthy()
	})

	// it('renders StudentTable component', () => {
	//   render(
	//     <Provider store={store}>
	//       <StudentTable />
	//     </Provider>
	//   );

	//     it('Renders StudentTable component', () => {
	//         render(<Provider store={store}><StudentTable /></Provider>);
	//         expect(screen.getByText('Name')).toBeInTheDocument();
	//         expect(screen.getByText('Email')).toBeInTheDocument();
	//         expect(screen.getByText('Contact')).toBeInTheDocument();
	//     });

	//     it('Filters rows based on input', async () => {
	//         act(() => {
	//             render(<Provider store={store}><StudentTable /></Provider>);
	//         })
	//         expect(screen.getByText('John')).toBeInTheDocument();
	//         expect(screen.getByText('john@example.com')).toBeInTheDocument();
	//         expect(screen.getByText('123-456-7890')).toBeInTheDocument();
	//     });

	// Test if the component renders without crashing
	// expect(screen.getByText('Actions')).toBeInTheDocument()
	// })

	// it('displays loader while loading', () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<StudentTable />
	// 		</Provider>
	// 	)

	// 	// Test if the loader is displayed while loading
	// 	expect(screen.getByTestId('loader')).toBeInTheDocument()
	// })

	// it('displays table after loading', async () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<StudentTable />
	// 		</Provider>
	// 	)

	// 	// Simulate the loading completion
	// 	await act(async () => {
	// 		await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull())
	// 	})

	// 	// Test if the table is displayed after loading
	// 	expect(screen.getByTestId('data-grid')).toBeInTheDocument()
	// })

	// it('handles edit click', async () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<StudentTable />
	// 		</Provider>
	// 	)

	// 	// Simulate the loading completion
	// 	await act(async () => {
	// 		await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull())
	// 	})

	// 	// Mock edit function and click the edit button
	// 	const editMock = jest.spyOn(store, 'dispatch')
	// 	fireEvent.click(screen.getByTitle('Edit'))

	// 	// Test if edit function is called
	// 	expect(editMock).toHaveBeenCalledWith(
	// 		editStudentData(mockDataOfStudentTable)
	// 	)
	// })

	// it('handles delete click', async () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<StudentTable />
	// 		</Provider>
	// 	)

	// 	// Simulate the loading completion
	// 	await act(async () => {
	// 		await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull())
	// 	})

	// 	// Mock delete function and click the delete button
	// 	const deleteMock = jest.spyOn(store, 'dispatch')
	// 	window.confirm = jest.fn(() => true)
	// 	fireEvent.click(screen.getByTitle('Delete'))

	// 	// Test if delete function is called
	// 	expect(deleteMock).toHaveBeenCalledWith(deleteData(mockDataOfStudentTable))

	// 	// Test if success toast is displayed
	// 	await waitFor(() =>
	// 		expect(
	// 			screen.getByText('Student Deleted Successfully')
	// 		).toBeInTheDocument()
	// 	)
	// })

	// it('handles row click', async () => {
	// 	render(
	// 		<Provider store={store}>
	// 			<StudentTable />
	// 		</Provider>
	// 	)

	// 	// Simulate the loading completion
	// 	await act(async () => {
	// 		await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull())
	// 	})

	// 	// Mock router push function and click a row
	// 	const pushMock = jest.fn()
	// 	jest.mock('next/navigation', () => ({
	// 		useRouter: () => ({ push: pushMock }),
	// 	}))

	// 	fireEvent.click(screen.getByTitle('Show'))

	// 	// Test if router push function is called
	// 	expect(pushMock).toHaveBeenCalledWith(`/${mockDataOfStudentTable}`)
	// })
})
