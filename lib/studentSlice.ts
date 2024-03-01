import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
export interface Students {
	_id?: string
	firstName?: string
	middleName?: string
	lastName?: string
	email?: string
	contactNumber?: number
	gender?: string
	collegeName?: string
	department?: string
	hobbies?: string
	dob?: string
}

const initialState: {
	students: Students[]
	currentStudent: Students | null | undefined
	changed: number
} = {
	students: [
		{
			_id: 'c32d8b45-92fe-44f6-8b61-42c2107dfe87',
			firstName: 'kishan',
			middleName: 's',
			lastName: 'padhi',
			email: 'kishapdhi291@gmail.com',
			contactNumber: 7785496365,
			gender: 'male',
			collegeName: 'Depstar',
			department: 'IT',
			hobbies: 'Cycling',
			dob: '10/08/2001',
		},
		{
			_id: 'c3267b45-92fe-44f6-8b61-42c2107dfe87',
			firstName: 'sara',
			middleName: 's',
			lastName: 'patel',
			email: 'sara@gmail.com',
			contactNumber: 7785496370,
			gender: 'female',
			collegeName: 'Depstar',
			department: 'IT',
			hobbies: 'Cycling',
			dob: '14/04/2002',
		},
	],
	currentStudent: null,
	changed: 0,
}

const studentSlice = createSlice({
	initialState,
	name: 'studentSlice',
	reducers: {
		getCurrentData: (state, action) => {
			const Student = state.students.find(
				(student) => student._id === action.payload
			)
			const targetStudent = { ...Student }
			state.currentStudent = targetStudent
		},
		setCurrentData: (state) => {
			state.currentStudent = null
		},
		addData: (state, action) => {
			let studentUuid = uuidv4()
			action.payload['_id'] = studentUuid
			state.students.push(action.payload)
		},
		editStudentData: (state, action) => {
			state.students = state.students.map((student) => {
				if (student._id === action.payload.id) {
					return { _id: action.payload.id, ...action.payload.student }
				}
				return student
			})
		},

		deleteData: (state, action) => {
			state.students = state.students.filter(
				(student) => student._id !== action.payload
			)
		},
	},
})

export const {
	addData,
	editStudentData,
	getCurrentData,
	setCurrentData,
	deleteData,
} = studentSlice.actions
export default studentSlice.reducer
