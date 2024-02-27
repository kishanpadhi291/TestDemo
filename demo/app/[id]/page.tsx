import React from 'react'
import axios from 'axios'
import Card from '@/components/Card/Card'
import { CardContent, Typography } from '@mui/material'
import './detailsPage.scss'
import { apiUrl } from '@/lib/FormSlice'

// This is a Next.js dynamic page component.
// It receives the `params` object with 'id' parameter.
const page = async ({ params }: { params: { id: string } }) => {
	// Extract the `id` from the route parameters.
	const id = params.id

	// Fetch data from the API using the `id`.
	const timestamp = new Date().getTime()
	const apiUrlWithTimestamp = `${apiUrl}/${id}?timestamp=${timestamp}`
	const { data } = await axios.get(apiUrlWithTimestamp)

	// Render the details page.
	return (
		<div className='details'>
			{/* Card component for styling */}
			<Card>
				{/* Heading section */}
				<div className='heading'>
					<Typography variant='h2'>Details</Typography>
				</div>

				{/* Card content section */}
				<CardContent>
					{/* Displaying student information */}
					<Typography variant='body1'>
						Name: {data.student.firstName} {data.student.middleName}{' '}
						{data.student.lastName}
					</Typography>
					<Typography variant='body1'>Email: {data.student.email}</Typography>
					<Typography variant='body1'>
						PhoneNumber: {data.student.contactNumber}
					</Typography>
					<Typography variant='body1'>Gender: {data.student.gender}</Typography>
					<Typography variant='body1'>
						College: {data.student.collegeName}
					</Typography>
					<Typography variant='body1'>
						Department: {data.student.department}
					</Typography>
					<Typography variant='body1'>
						Hobbies: {data.student.hobbies.join(', ')}
					</Typography>
					<Typography variant='body1'>DOB: {data.student.dob}</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

// Export the page component for Next.js to use.
export default page
