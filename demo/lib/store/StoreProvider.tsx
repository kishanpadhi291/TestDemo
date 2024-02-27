'use client'

import { Provider } from 'react-redux'
import { store } from 'lib/store/store'

/**
 * StoreProvider component wraps the entire application with the Redux store.
 * It utilizes the Provider component from react-redux to make the store available
 * to all components in the component tree.
 *
 * @param {React.ReactNode} children - The child components that will have access to the Redux store.
 * @returns {React.ReactNode} - JSX wrapping the children with the Redux store provider.
 */
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* Use the Provider component to provide the Redux store to the entire component tree. */}
			<Provider store={store}>{children}</Provider>
		</>
	)
}
