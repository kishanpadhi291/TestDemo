'use client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	TablePagination,
	Tooltip,
	IconButton,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import FormModel from './FormModel'
import { Students, dataAdded, getStudents } from '@/lib/FormSlice'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useAppDispatch } from '@/lib/hooks/hooks'
import axios from 'axios'

export default function BasicTable() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const studentsdata = useSelector((state: StoreState) => state.form.students)
	const added = useSelector((state: StoreState) => state.form.added)
	const [rows, setRows] = useState<Students[]>(studentsdata)
	const [searched, setSearched] = useState<string>('')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [editData, setEditData] = useState<string | null>(null)

	useEffect(() => {
		!studentsdata.length && dispatch(getStudents())
		console.log('table useef', studentsdata)
		setRows(studentsdata)
	}, [studentsdata])
	useEffect(() => {
		dispatch(getStudents())
		setRows(studentsdata)
	}, [added])

	const handleEditClick = (data: string) => {
		console.log('Edit clicked with data:', data)
		setEditData(data!)
	}

	const handleDeleteClick = async (data: string) => {
		console.log('Delete clicked with data:', data)
		const res = await axios.delete(`http://localhost:3000/api/users/${data}`)
		if (res.status === 200) {
			alert('Student deleted successfully')
			dispatch(dataAdded())
		}
	}

	const handleRowClick = (data: string) => {
		console.log('Row clicked with data:', data)
		router.push(`/${data}`)
	}

	const handleChangePage = useCallback((event: unknown, newPage: number) => {
		setPage(newPage)
	}, [])

	const handleChangeRowsPerPage = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRowsPerPage(parseInt(event.target.value, 10))
			setPage(0)
		},
		[]
	)

	const requestSearch = useCallback(
		(searchedVal: string) => {
			setSearched(searchedVal)
			const filteredRows = studentsdata.filter((row) => {
				const lowerSearchedVal = searchedVal.toLowerCase()
				return row.firstName.toLowerCase().includes(lowerSearchedVal)
			})
			setRows(filteredRows)
		},
		[studentsdata]
	)

	const getRowsForCurrentPage = useMemo(() => {
		const startIndex = page * rowsPerPage
		const endIndex = startIndex + rowsPerPage
		return rows.slice(startIndex, endIndex)
	}, [page, rows, rowsPerPage])
	useEffect(() => {
		if (searched === '') {
			setRows(studentsdata)
		}
	}, [searched, studentsdata])
	return (
		<>
			<Paper style={{ margin: '1%' }}>
				<TextField
					variant='outlined'
					fullWidth
					placeholder='Search...'
					value={searched}
					onChange={(e) => requestSearch(e.target.value)}
				/>
				<TableContainer>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell style={{ fontWeight: 'bold' }}>Firstname</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Email
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Gender
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{getRowsForCurrentPage.map((row) => (
								<TableRow
									key={row._id}
									onClick={() => handleRowClick(row._id)}
									style={{ cursor: 'pointer' }}
								>
									<TableCell component='th' scope='row'>
										{row.firstName}
									</TableCell>
									<TableCell align='right'>{row.email}</TableCell>
									<TableCell align='right'>{row.gender}</TableCell>
									<TableCell align='right'>
										<Tooltip title='Edit'>
											<IconButton
												onClick={(e) => {
													e.stopPropagation()
													handleEditClick(row._id)
												}}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title='Delete'>
											<IconButton
												onClick={(e) => {
													e.stopPropagation()
													handleDeleteClick(row._id)
												}}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			{editData && <FormModel id={editData} onClose={setEditData} />}
		</>
	)
}
