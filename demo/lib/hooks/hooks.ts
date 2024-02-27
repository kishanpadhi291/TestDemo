import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'lib/store/store'

// Custom hook: useAppDispatch
// Returns the AppDispatch function from the Redux store,
// which is used to dispatch actions to the Redux store.
export const useAppDispatch: () => AppDispatch = useDispatch
