import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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

const initialState: {
	students: Students[]
	added: number
} = {
	students: [],
	added: 0,
}

export const apiUrl = process.env.NEXT_PUBLIC_API_URL!

export const getStudents = createAsyncThunk(
	'Form/students',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(apiUrl)
			console.log(response.data.students)
			return response.data.students
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
const formSlice = createSlice({
	initialState,
	name: 'formSlice',
	reducers: {
		dataAdded: (state) => {
			console.log('added')
			state.added = state.added + 1
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getStudents.fulfilled, (state, action: any) => {
			state.students = action.payload
		})
	},
})
export const { dataAdded } = formSlice.actions
export default formSlice.reducer
