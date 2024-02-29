import { render } from '@testing-library/react';
import DetailsPage from './page';

describe('DetailsPage component', () => {
  it('Renders details page with student information', async () => {
    render(await DetailsPage({ params: { id: '123' } }))
  });
});
