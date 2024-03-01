/**
 * @module studentSlice
 * @description Redux slice for managing form-related state, including fetching student data and handling data addition.
 * @requires reduxjs/toolkit
 * @requires axios
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getStudentsAPI } from './api/api'

/**
 * @typedef {Object} Students - The shape of the Students object.
 * @property {string} _id - The unique identifier for a student.
 * @property {string} firstName - The first name of the student.
 * @property {string} middleName - The middle name of the student.
 * @property {string} lastName - The last name of the student.
 * @property {string} email - The email address of the student.
 * @property {number} contactNumber - The contact number of the student.
 * @property {string} gender - The gender of the student.
 * @property {string} collegeName - The name of the college the student belongs to.
 * @property {string} department - The department of the student.
 * @property {string[]} hobbies - An array of hobbies of the student.
 * @property {string} dob - The date of birth of the student.
 */
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

/**
 * @type {Object} InitialState - The initial state of the studentSlice.
 * @property {Students[]} students - An array of Students objects representing student data.
 * @property {number} added - A count representing the number of times data has been added.
 */
// Define the initial state of the studentSlice
const initialState: {
	students: Students[]
	added: number
} = {
	students: [],
	added: 0,
}

/**
 * API URL for fetching data.
 * @constant {string}
 */
// Define the API URL for fetching data
export const apiUrl = process.env.NEXT_PUBLIC_API_URL!

/**
 * An asynchronous thunk for fetching students data.
 *
 * @function
 * @name getStudents
 * @async
 * @param {undefined} _ - The first parameter is not used in this thunk.
 * @param {Object} thunkAPI - The `thunkAPI` object provides access to the `dispatch` and `getState` functions.
 * @returns {Promise<Students[], AxiosError>} A promise that resolves to an array of Students objects.
 *   If an error occurs during the API request, the promise is rejected with an AxiosError.
 */
// Create an asynchronous thunk for fetching students data
export const getStudents = createAsyncThunk(
	'Form/students',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getStudentsAPI()
			return response.data.students
		} catch (error) {
			// If an error occurs during the API request, reject the promise with the error value
			return rejectWithValue(error)
		}
	}
)

/**
 * Redux slice for managing form-related state.
 *
 * @constant {Object}
 * @name studentSlice
 * @type {import('@reduxjs/toolkit').Slice}
 * @property {InitialState} initialState - The initial state of the studentSlice.
 * @property {Object} reducers - Redux reducers for the studentSlice.
 * @property {Function} reducers.dataAdded - Reducer for updating the 'added' count when data is added.
 * @property {Object} extraReducers - Additional reducers for handling asynchronous actions.
 * @property {Function} extraReducers.getStudents.fulfilled - Reducer for updating the students state when the getStudents thunk is fulfilled.
 */
// Create a slice of the Redux store for form-related state
const studentSlice = createSlice({
	initialState,
	name: 'studentSlice',
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

/**
 * Action creator for updating the 'added' count when data is added.
 *
 * @function
 * @name dataAdded
 * @type {import('@reduxjs/toolkit').ActionCreatorWithoutPayload}
 * @returns {Object} The Redux action for updating the 'added' count.
 */

/**
 * @type {import('@reduxjs/toolkit').Reducer<InitialState>}
 */
// Export the dataAdded action and the reducer for use in other parts of the application
export const { dataAdded } = studentSlice.actions
export default studentSlice.reducer
