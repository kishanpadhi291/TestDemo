import { configureStore } from '@reduxjs/toolkit'
import formSlice, { Students } from '../FormSlice'

export interface StoreState {
	form: {
		students: Students[]
		added: number
		currentStudent: Students
	}
}

export const store = configureStore({
	reducer: {
		form: formSlice,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
