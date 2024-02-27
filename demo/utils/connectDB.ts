/**
 * @function
 * @async
 * @description
 * Establishes a connection to MongoDB using Mongoose.
 * It reads the MongoDB connection string from the environment variables.
 *
 * @throws {Error} Throws an error and exits the process if the connection fails.
 *
 * @example
 * // Import the connectDB function
 * import connectDB from '@/path/to/connectDB';
 *
 * // Call the function to connect to the database
 * connectDB();
 */

// src/utils/connectDB.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB!)
	} catch (error) {
		console.error('MongoDB connection error:', error)
		process.exit(1)
	}
}

export default connectDB
