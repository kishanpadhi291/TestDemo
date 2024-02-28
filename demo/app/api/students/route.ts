/**
 * @module StudentAPI
 * @description
 * Endpoints for handling student data.
 */
import Student from '@/models/studentModel'
import connectDB from '@/utils/connectDB'
import { NextResponse, NextRequest } from 'next/server'

interface CustomError extends Error {
	code?: number
}

/**
 * @function GET
 * @async
 * @description
 * Fetches all students from the database.
 *
 * @returns {Promise<NextResponse>} - A JSON response with a list of students.
 */
//get all students
export async function GET() {
	try {
		await connectDB()
		const students = await Student.find({}).sort({ _id: - 1 })
		return NextResponse.json(
			{ results: students.length, students },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong!, Try again later' },
			{ status: 400 }
		)
	}
}

/**
 * @function POST
 * @async
 * @param {NextRequest} request - The incoming request object.
 * @description
 * Creates a new student record in the database.
 *
 * @returns {Promise<NextResponse>} - A JSON response indicating success or failure.
 */
//create a new student
export async function POST(request: NextRequest) {
	try {
		await connectDB()
		const {
			firstName,
			middleName,
			lastName,
			email,
			contactNumber,
			gender,
			collegeName,
			department,
			hobbies,
			dob,
		} = await request.json()

		const newStudent = await Student.create({
			firstName,
			middleName,
			lastName,
			email,
			contactNumber,
			gender,
			collegeName,
			department,
			hobbies,
			dob,
		})
		await newStudent.save()
		return NextResponse.json(
			{ message: 'Student Added Successfully!', data: newStudent },
			{ status: 201 }
		)
	} catch (error) {
		if (error instanceof Error && (error as CustomError).code === 11000) {
			return NextResponse.json(
				{ message: 'Email ID is already exist!' },
				{ status: 400 }
			)
		} else {
			return NextResponse.json(
				{ message: 'Something went wrong!, Try again later' },
				{ status: 400 }
			)
		}
	}
}
