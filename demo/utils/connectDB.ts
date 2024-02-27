// // src/utils/connectDB.js
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
