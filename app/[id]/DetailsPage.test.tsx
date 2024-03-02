import { render } from '@testing-library/react'
import DetailsPage from './page'
import { Provider } from 'react-redux'
import { store } from '@/lib/store/store'
import { mockDataOfStudentTable } from '@/utils/data/mockData'
import StudentTable from '@/components/StudentTable/StudentTable'

const mockUseSelector = jest.fn()
const mockUseDispatch = jest.fn()

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: (selector: unknown) => mockUseSelector(selector),
	useDispatch: () => mockUseDispatch,
}))

describe('DetailsPage component', () => {
	beforeEach(() => {
		mockUseSelector.mockImplementation(() => mockDataOfStudentTable)
	})

	it('Renders details page with student information', async () => {
		render(await DetailsPage({ params: { id: '123' } }))
	})

	it('Renders StudentTable Successfully.', () => {
		const { container } = render(
			<Provider store={store}>
				<StudentTable />
			</Provider>
		)
		expect(container).toBeTruthy()
	})
})
