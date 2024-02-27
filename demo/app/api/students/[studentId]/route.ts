import Student from '@/models/studentModel'
import connectDB from '@/utils/connectDB'
import { NextResponse, NextRequest } from 'next/server'

// get student by Id
export async function GET(request: NextRequest, { params }: { params: { studentId: string } }) {
	try {
		await connectDB()
		const { studentId } = params

		const student = await Student.findById({ _id: studentId })
		if (!student) {
			return NextResponse.json(
				{
					message: 'student not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({ status: 'success', student }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!, Try again later' }, { status: 400 })
	}
}

// update student by Id
export async function PUT(request: NextRequest, { params }: { params: { studentId: string } }) {
	try {

		await connectDB()
		const { studentId } = params

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

		const updatedstudent = await Student.findByIdAndUpdate(studentId, {
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

		if (!updatedstudent) {
			return NextResponse.json(
				{
					message: 'student not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({ message: 'student Updated Successfully!' }, { status: 200 })
	} catch (error) {
		if (error instanceof Error && error.name === 'CastError') {
			return NextResponse.json({ message: 'Invalid Email ID!, Email already exist!' }, { status: 400 })
		} else {
			return NextResponse.json({ message: 'Something went wrong!, Try again later' }, { status: 400 })
		}
	}
}

// delete student by Id
export async function DELETE(request: NextRequest, { params }: { params: { studentId: string } }) {
	try {

		await connectDB()
		const { studentId } = params

		const student = await Student.findByIdAndDelete({ _id: studentId })
		if (!student) {
			return NextResponse.json(
				{
					message: 'student not found',
				},
				{ status: 404 }
			)
		}

		return NextResponse.json({ status: 'success', message: 'student Deleted Successfully!' }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ message: 'Something went wrong!, Try again later' }, { status: 400 })
	}

}
