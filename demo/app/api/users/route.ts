import User from '@/models/userModel'
import connectDB from '@/utils/connectDB'
import { NextResponse, NextRequest } from 'next/server'

//get all users
export async function GET() {
	await connectDB()
	const users = await User.find()
	return NextResponse.json({ results: users.length, users })
}

//create a new user
export async function POST(request: NextRequest) {
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

	const newUser = await User.create({
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
	await newUser.save()
	return NextResponse.json(
		{ message: 'User Created Successfully!', data: newUser },
		{ status: 201 }
	)
}
