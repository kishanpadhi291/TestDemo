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
import { getCurrentData } from '@/lib/studentSlice'
import { CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useRouter } from 'next/navigation'
import FormModel from '../FormModel/FormModel'
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
	const [isLoading, setIsLoading] = useState(true)
	const [editId, setEditId] = useState<string | null>(null)
	const router = useRouter()
	const curStudent = useSelector(
		(state: StoreState) => state.form.currentStudent
	)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getCurrentData(id))
		setIsLoading(false)
	}, [])
	useEffect(() => {
		dispatch(getCurrentData(id))
	}, [editId])
	const onClickHandler = () => {
		router.push('/')
	}
	const onClickEditHandler = () => {
		setEditId(id)
	}
	return (
		<>
			{isLoading ? (
				<div className='loader' data-testid='loader'>
					<CircularProgress />
				</div>
			) : (
				<div className='details'>
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
									<div>
										{curStudent!.firstName} {curStudent!.middleName}{' '}
										{curStudent!.lastName}
									</div>
								</div>
								<div className='item-wrap'>
									<div>Email:</div>
									<div>{curStudent!.email}</div>
								</div>
								<div className='item-wrap'>
									<div>PhoneNumber:</div>
									<div> {curStudent!.contactNumber}</div>
								</div>
								<div className='item-wrap'>
									<div>Gender:</div>
									<div> {curStudent!.gender}</div>
								</div>
								<div className='item-wrap'>
									<div>College: </div>
									<div>{curStudent!.collegeName}</div>
								</div>
								<div className='item-wrap'>
									<div>Department:</div>
									<div>{curStudent!.department}</div>
								</div>
								<div className='item-wrap'>
									<div>Hobbies:</div>
									<div>{curStudent!.hobbies}</div>
								</div>
								<div className='item-wrap'>
									<div>DOB:</div>
									<div>{curStudent!.dob}</div>
								</div>
							</div>
						</CardContent>
						<button onClick={onClickHandler}>Back</button>
						<button onClick={onClickEditHandler}>Edit</button>
						{editId && (
							<FormModel id={editId} onClose={setEditId} detail={true} />
						)}
					</Card>
				</div>
			)}
		</>
	)
}

export default StudentDetail
