import FormModel from "@/components/FormModel/FormModel";
import { Provider } from 'react-redux';
import { store } from "@/lib/store/store";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('axios');

describe("FormModel", () => {
    it("Renders FormModel Successfully.", () => {
        const { container } = render(<Provider store={store}><FormModel /></Provider>);
        expect(container).toBeTruthy();
    });

    it('Checks for button present in document', () => {
        render(<Provider store={store}><FormModel /></Provider>);
        expect(screen.getByRole('button', { name: 'Add data' })).toBeInTheDocument();
    });

    it('Submits form with valid data', async () => {
        render(<Provider store={store}><FormModel /></Provider>);

        const addDataButton = screen.getByRole('button', { name: 'Add data' });
        expect(addDataButton).toBeInTheDocument();

        fireEvent.click(addDataButton);
        expect(screen.getByText('First Name')).toBeInTheDocument();
        expect(screen.getByText('Middle Name')).toBeInTheDocument();
        expect(screen.getByText('Surname')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('College Name')).toBeInTheDocument();
        expect(screen.getByText('Department')).toBeInTheDocument();
        expect(screen.getByText('Hobbies')).toBeInTheDocument();
    });
});
