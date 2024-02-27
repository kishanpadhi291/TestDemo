import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Define the shape of the Students object
export interface Students {
	_id: string
	firstName: string
	middleName: string
	lastName: string
	email: string
	contactNumber: number
	gender: string
	collegeName: string
	department: string
	hobbies: [string]
	dob: string
}

// Define the initial state of the formSlice
const initialState: {
	students: Students[]
	added: number
} = {
	students: [],
	added: 0,
}

// Define the API URL for fetching data
export const apiUrl = process.env.NEXT_PUBLIC_API_URL!

// Create an asynchronous thunk for fetching students data
export const getStudents = createAsyncThunk(
	'Form/students',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(apiUrl)
			return response.data.students
		} catch (error) {
			// If an error occurs during the API request, reject the promise with the error value
			return rejectWithValue(error)
		}
	}
)

// Create a slice of the Redux store for form-related state
const formSlice = createSlice({
	initialState,
	name: 'formSlice',
	reducers: {
		// Reducer for updating the 'added' count when data is added
		dataAdded: (state) => {
			state.added = state.added + 1
		},
	},
	// Handle extra actions like fetching data using createAsyncThunk
	extraReducers: (builder) => {
		// Add a case for the fulfilled action of getStudents thunk to update students state
		builder.addCase(getStudents.fulfilled, (state, action: any) => {
			state.students = action.payload
		})
	},
})

// Export the dataAdded action and the reducer for use in other parts of the application
export const { dataAdded } = formSlice.actions
export default formSlice.reducer
