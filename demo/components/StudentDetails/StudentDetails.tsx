/**
 * StudentDetail Component
 *
 * This component displays detailed information about a student.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the student to retrieve details for.
 *
 * @returns {React.ReactElement} The rendered student detail component.
 *
 * @example
 * // Usage of the StudentDetail component:
 * // Import the StudentDetail component and use it in your component.
 * import StudentDetail from './StudentDetail';
 *
 * // Use the StudentDetail component.
 * const MyComponent = () => {
 *   return (
 *     <StudentDetail id="studentId" />
 *   );
 * };
 */
'use client'
import Card from '@/components/Card/Card'
import { Students } from '@/lib/studentSlice'
import { CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { getStudentByIdAPI } from '@/lib/api/api'
/**
 * @typedef {Object} StudentData
 * @property {Students} student - The detailed information about the student.
 */

/**
 * StudentDetail Component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.id - The ID of the student to retrieve details for.
 *
 * @returns {React.ReactElement} The rendered student detail component.
 */

const StudentDetail = ({ id }: { id: string }) => {
	const [studentData, setStudentData] = useState<{ student: Students }>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await getStudentByIdAPI(id!)
			setStudentData(data)
			setIsLoading(false)
		}
		fetchData()
	}, [])

	return (
		<>
			{isLoading ? (<div className="loader" data-testid="loader"><CircularProgress /></div>) : <div className='details'>
				{/* Card component for styling */}
				<Card>
					{/* Heading section */}
					<div className='heading'>
						<Typography variant='h3'>Details</Typography>
					</div>

					{/* Card content section */}
					<CardContent className='card-content-wrapper'>
						<div className='card-item'>
							<div className='item-wrap'>
								<div>Name:</div>
								<div>{studentData?.student.firstName} {studentData?.student.middleName}{' '}
									{studentData?.student.lastName}</div>
							</div>
							<div className='item-wrap'>
								<div>Email:</div>
								<div>{studentData?.student.email}</div>
							</div>
							<div className='item-wrap'>
								<div>PhoneNumber:</div>
								<div> {studentData?.student.contactNumber}
								</div>
							</div>
							<div className='item-wrap'>
								<div>Gender:</div>
								<div> {studentData?.student.gender}</div>
							</div>
							<div className='item-wrap'>
								<div>College: </div>
								<div>{studentData?.student.collegeName}</div>
							</div>
							<div className='item-wrap'>
								<div>Department:</div>
								<div>{studentData?.student.department}</div>
							</div>
							<div className='item-wrap'>
								<div>Hobbies:</div>
								<div>{studentData?.student.hobbies.join(', ')}</div>
							</div>
							<div className='item-wrap'>
								<div>DOB:</div>
								<div>{studentData?.student.dob}</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>}
		</>
	)
}

export default StudentDetail
