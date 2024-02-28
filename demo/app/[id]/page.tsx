/**
 * Details Page Component
 *
 * This is a Next.js dynamic page component that renders the details of a student based on the 'id' parameter.
 *
 * @component
 *
 * @param {object} params - The parameters object containing the 'id' parameter.
 * @param {object} params.params - The 'params' object with 'id' parameter.
 * @param {string} params.params.id - The unique identifier for the student.
 *
 * @returns {React.ReactNode} The rendered details page component.
 *
 * @throws {Error} Throws an error if there is an issue fetching data from the API.
 *
 * @example
 * // Usage in a Next.js page:
 * // This component is automatically invoked by Next.js for the dynamic route /details/[id].
 * // It receives the 'id' parameter from the route and fetches student details from the API.
 * // It renders the details page with student information.
 * const DetailsPage = ({ params }) => {
 *   const content = page({ params });
 *   return <>{content}</>;
 * };
 *
 * // The 'params' object should have the 'id' parameter.
 * const id = '123';
 * const content = page({ params: { id } });
 * // Render the content wherever needed.
 */
import React from 'react'
import Card from '@/components/Card/Card'
import { CardContent, Typography } from '@mui/material'
import './detailsPage.scss'
import { apiUrl } from '@/lib/FormSlice'
import axios from 'axios'

// This is a Next.js dynamic page component.
// It receives the `params` object with 'id' parameter.

const page = async ({ params }: { params: { id: string } }) => {
	// Extract the `id` from the route parameters.
	const id = params.id
	// const response = await fetch(`${apiUrl}/${id}`, { cache: 'no-store' }) //will not store cache
	// const data = await response.json()

	const { data } = await axios.get(`${apiUrl}/${id}`)

	// Render the details page.
	return (
		<div className='details'>
			{/* Card component for styling */}
			<Card>
				{/* Heading section */}
				<div className='heading'>
					<Typography variant='h3' style={{ marginTop: '15px' }}>Details</Typography>
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
