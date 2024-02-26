import User from '@/models/userModel'
import connectDB from '@/utils/connectDB'
import { NextResponse, NextRequest } from 'next/server'

// get user by Id
export async function GET(request: NextRequest, { params }: any) {
	// await connectDB()
	const { userId } = params

	const user = await User.findById({ _id: userId })
	if (!user) {
		return NextResponse.json(
			{
				message: 'User not found',
			},
			{ status: 404 }
		)
	}
	return NextResponse.json({ status: 'success', user })
}

// update user by Id
export async function PUT(request: NextRequest, { params }: any) {
	// await connectDB()
	const { userId } = params

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

	const updatedUser = await User.findByIdAndUpdate(userId, {
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

	if (!updatedUser) {
		return NextResponse.json(
			{
				message: 'User not found',
			},
			{ status: 404 }
		)
	}

	return NextResponse.json({
		message: 'User Updated Successfully!',
	})
}

// delete user by Id
export async function DELETE(request: NextRequest, { params }: any) {
	// await connectDB()
	const { userId } = params

	const user = await User.findByIdAndDelete({ _id: userId })
	if (!user) {
		return NextResponse.json(
			{
				message: 'User not found',
			},
			{ status: 404 }
		)
	}
	return NextResponse.json({
		status: 'success',
		message: 'User Deleted Successfully!',
	})
}
