import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import DetailsPage from './page';
import { mockDataOfDetailPage } from '@/utils/data/mockData';

jest.mock('axios');

describe('DetailsPage component', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({ data: mockDataOfDetailPage });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders details page with student information', async () => {

    render(await DetailsPage({ params: { id: '123' } }))

    await waitFor(() => {
      expect(screen.getByText(/Name:/i)).toHaveTextContent('John Doe Smith');
      expect(screen.getByText(/Email:/i)).toHaveTextContent('john.smith@example.com');
      expect(screen.getByText(/PhoneNumber:/i)).toHaveTextContent('1234567890');
      expect(screen.getByText(/Gender:/i)).toHaveTextContent('Male');
      expect(screen.getByText(/College:/i)).toHaveTextContent('Example College');
      expect(screen.getByText(/Department:/i)).toHaveTextContent('Computer Science');
      expect(screen.getByText(/Hobbies:/i)).toHaveTextContent('Reading, Gaming');
      expect(screen.getByText(/DOB:/i)).toHaveTextContent('1990-01-01');
    });
  });

  it('Fetches data from the API with the correct URL', async () => {
    render(await DetailsPage({ params: { id: '123' } }))

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/123`)
      );
    });
  });
});
