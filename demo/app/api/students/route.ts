import Student from '@/models/studentModel';
import connectDB from '@/utils/connectDB'
import { NextResponse, NextRequest } from 'next/server'

interface CustomError extends Error {
	code?: number;
}

//get all students
export async function GET() {
	try {
		await connectDB()
		const students = await Student.find()
		return NextResponse.json({ results: students.length, students }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!, Try again later' }, { status: 400 })
	}
}

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
		return NextResponse.json({ message: 'Student Added Successfully!', data: newStudent }, { status: 201 })
	} catch (error) {
		if (error instanceof Error && (error as CustomError).code === 11000) {
			return NextResponse.json({ message: 'Email ID is already exist!' }, { status: 400 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!, Try again later' }, { status: 400 })
		}
	}
}
