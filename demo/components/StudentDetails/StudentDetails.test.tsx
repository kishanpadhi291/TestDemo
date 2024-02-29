import { render, screen, waitFor, cleanup } from '@testing-library/react';
import StudentDetails from './StudentDetails';
import { getStudentByIdAPI } from '@/lib/api/api';
import { mockDataOfDetailPage } from '@/utils/data/mockData';
import { act } from 'react-dom/test-utils';

jest.mock('@/lib/api/api', () => ({
    getStudentByIdAPI: jest.fn(),
}));

describe('StudentDetail component', () => {
    beforeEach(() => {
        (getStudentByIdAPI as jest.Mock).mockReset();
    });

    afterEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    // it('renders loading spinner initially', async () => {
    //     (getStudentByIdAPI as jest.Mock).mockResolvedValueOnce({ data: mockDataOfDetailPage });
    //     render(<StudentDetails id="1" />);
    //     await act(async () => {
    //         expect(screen.getByTestId('loader')).toBeInTheDocument();
    //         await waitFor(() => expect(screen.queryByTestId('loader')).not.toBeInTheDocument());
    //     });
    // });

    it('renders student details after loading', async () => {
        (getStudentByIdAPI as jest.Mock).mockResolvedValueOnce({ data: mockDataOfDetailPage });
        render(<StudentDetails id="1" />);
        await waitFor(() => expect(screen.getByText('Details')).toBeInTheDocument());
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('Email:')).toBeInTheDocument();
    });

});
