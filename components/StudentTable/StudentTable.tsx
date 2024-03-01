/**
 * StudentTable Component
 *
 * This component displays a table of student data with search, edit, and delete functionalities.
 *
 * @component
 *
 * @returns {React.ReactElement} The rendered student table component.
 *
 * @example
 * // Usage of the StudentTable component:
 * // Import the StudentTable component and use it in your component.
 * import StudentTable from './StudentTable';
 *
 * // Use the StudentTable component.
 * const MyComponent = () => {
 *   return (
 *     <StudentTable />
 *   );
 * };
 */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
	IconButton,
	Container,
	Box,
	Tooltip,
	CircularProgress,
} from '@mui/material'

import './studentTable.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import FormModel from '../FormModel/FormModel'
import { deleteData, editStudentData, setCurrentData } from '@/lib/studentSlice'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useAppDispatch } from 'lib/hooks/hooks'
import { ToastContainer, toast } from 'react-toastify'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

function capitalizeFirstLetter(str: string) {
	return str ? str[0].toUpperCase() + str.slice(1) : ''
}
export default function StudentTable() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const studentsData = useSelector((state: StoreState) => state.form.students)
	const [editData, setEditData] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const columns = [
		{ field: 'name', headerName: 'Name', flex: 1 },
		{ field: 'email', headerName: 'Email', flex: 1 },
		{ field: 'contactNumber', headerName: 'Contact', flex: 1 },
		{ field: 'gender', headerName: 'Gender', flex: 1 },
		{ field: 'collegeName', headerName: 'College', flex: 1 },
		{ field: 'department', headerName: 'Department', flex: 1 },
		{ field: 'hobbies', headerName: 'Hobbies', flex: 1 },
		{ field: 'dob', headerName: 'DOB', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			hideable: false,
			renderCell: (params: any) => (
				<div>
					<Tooltip title='Show'>
						<IconButton onClick={(e) => handleRowClick(params?.id)}>
							<VisibilityIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Edit'>
						<IconButton onClick={(e) => handleEditClick(params?.id)}>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Delete'>
						<IconButton onClick={(e) => handleDeleteClick(params?.id)}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</div>
			),
		},
	]
	const rowsForDataGrid = studentsData
		?.map((row) => ({
			id: row._id,
			name: `${capitalizeFirstLetter(row.lastName!)} ${capitalizeFirstLetter(
				row.firstName!
			)}`,
			email: row.email,
			contactNumber: row.contactNumber,
			gender: row.gender,
			collegeName: row.collegeName,
			department: row.department,
			hobbies: row.hobbies,
			dob: row.dob,
		}))
		.reverse()

	useEffect(() => {
		dispatch(setCurrentData())
		setIsLoading(false)
	}, [studentsData])

	const handleEditClick = useCallback(
		(id: string) => {
			setEditData(id!)
			dispatch(editStudentData(id))
		},
		[] // Empty dependency array as it doesn't depend on external variables
	)

	const handleDeleteClick = useCallback(
		async (id: string) => {
			try {
				const result = confirm('Want to Delete?')
				if (result) {
					dispatch(deleteData(id))
					toast.success('Student Deleted Successfully')
				}
			} catch (error) {
				console.error('Error deleting student:', error)
				toast.error('Failed to delete student')
			}
		},
		[dispatch]
	)

	const handleRowClick = useCallback(
		(id: string) => {
			router.push(`/${id}`)
		},
		[router]
	)

	return (
		<>
			<ToastContainer />
			<Container fixed maxWidth='lg'>
				<Box>
					<FormModel />
				</Box>
				{isLoading ? (
					<div className='loader'>
						<CircularProgress />
					</div>
				) : (
					<div className='table-wrapper'>
						<DataGrid
							rows={rowsForDataGrid}
							columns={columns}
							slots={{
								toolbar: GridToolbar,
							}}
							pagination
						/>
					</div>
				)}
				{editData && <FormModel id={editData} onClose={setEditData} />}
			</Container>
		</>
	)
}
