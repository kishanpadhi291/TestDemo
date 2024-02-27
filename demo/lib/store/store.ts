import { configureStore } from '@reduxjs/toolkit'
import formSlice, { Students } from '../FormSlice'

// Define the structure of the Redux store state.
export interface StoreState {
	form: {
		students: Students[] // Array of student data
		added: number // Counter for tracking additions
	}
}

// Configure the Redux store using @reduxjs/toolkit.
export const store = configureStore({
	reducer: {
		form: formSlice, // Combine with the formSlice reducer
	},
})

// Define the type of the dispatch function for actions.
export type AppDispatch = typeof store.dispatch

// Define the type for the RootState, representing the entire Redux store state.
export type RootState = ReturnType<typeof store.getState>
