// src/models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'FirstName is required'],
	},
	middleName: {
		type: String,
		required: [true, 'MiddleName is required'],
	},
	lastName: {
		type: String,
		required: [true, 'LastName is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	contactNumber: {
		type: Number,
		required: [true, 'ContactNumber is required'],
		minLength: [10, 'contact number must be 10 digit only'],
		maxLength: [10, 'contact number must be 10 digit only'],
	},
	gender: {
		type: String,
		enum: ['male', 'female', 'other'],
		required: [true, 'Gender is required'],
	},
	collegeName: {
		type: String,
		required: [true, 'College Name is required'],
	},
	department: {
		type: String,
		required: [true, 'Department is required'],
	},
	hobbies: {
		type: [String],
		required: [true, 'Hobbies are required'],
	},
	dob: {
		type: String,
		required: [true, 'Date of Birth is required'],
	},
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
