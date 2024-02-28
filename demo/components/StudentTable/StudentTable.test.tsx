import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentTable from './StudentTable';
import { Provider } from 'react-redux';
import { store } from '@/lib/store/store';
import { mockDataOfStudentTable } from '@/utils/data/mockData';

jest.mock('axios');

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn(),
}));


const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: (selector: unknown) => mockUseSelector(selector),
    useDispatch: () => mockUseDispatch,
}));

describe("StudentTable", () => {
    beforeEach(() => {
        mockUseSelector.mockImplementation(() => mockDataOfStudentTable);
    });
    it("Renders StudentTable Successfully.", () => {
        const { container } = render(<Provider store={store}><StudentTable /></Provider>);
        expect(container).toBeTruthy();
    });

    it('Renders StudentTable component', () => {
        render(<Provider store={store}><StudentTable /></Provider>);
        expect(screen.getByText('FirstName')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('Searches and filters rows based on input', async () => {

        act(() => {
            render(<Provider store={store}><StudentTable /></Provider>);
        })

        await act(async () => {
            const searchInput = screen.getByPlaceholderText('Search...');
            fireEvent.change(searchInput, { target: { value: 'John' } });
        });

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('Male')).toBeInTheDocument();
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    });

})



