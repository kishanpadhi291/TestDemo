/**
 * @module StudentModel
 * @description
 * Mongoose model representing a student with various fields.
 */

import mongoose from 'mongoose'

/**
 * @typedef {Object} Student
 * @property {string} firstName - The first name of the student.
 * @property {string} middleName - The middle name of the student.
 * @property {string} lastName - The last name of the student.
 * @property {string} email - The email address of the student (must be unique).
 * @property {number} contactNumber - The contact number of the student (must be 10 digits).
 * @property {('male' | 'female' | 'other')} gender - The gender of the student.
 * @property {string} collegeName - The name of the college the student is associated with.
 * @property {string} department - The department in which the student is enrolled.
 * @property {string[]} hobbies - An array of hobbies the student is interested in.
 * @property {string} dob - The date of birth of the student.
 */

/**
 * @constant
 * @type {mongoose.Model<Student>}
 * @description
 * Mongoose model for the 'Student' schema.
 * If the model already exists, reuse it; otherwise, create a new one.
 */

const studentSchema = new mongoose.Schema({
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

const Student =
	mongoose.models.Student || mongoose.model('Student', studentSchema)

export default Student
