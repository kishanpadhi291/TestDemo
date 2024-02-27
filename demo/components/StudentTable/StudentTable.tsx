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
	Container,
	Box,
} from '@mui/material'
import './studentTable.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/navigation'
import FormModel from '../FormModel'
import { Students, apiUrl, dataAdded, getStudents } from '@/lib/FormSlice'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useAppDispatch } from '@/lib/hooks/hooks'
import axios from 'axios'

export default function StudentTable() {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const studentsData = useSelector((state: StoreState) => state.form.students)
	const added = useSelector((state: StoreState) => state.form.added)
	const [rows, setRows] = useState<Students[]>(studentsData)
	const [searched, setSearched] = useState<string>('')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)
	const [editData, setEditData] = useState<string | null>(null)

	useEffect(() => {
		!studentsData.length && dispatch(getStudents())
		console.log('table useef', studentsData)
		setRows(studentsData)
	}, [studentsData])
	useEffect(() => {
		dispatch(getStudents())
		setRows(studentsData)
	}, [added])

	const handleEditClick = (data: string) => {
		console.log('Edit clicked with data:', data)
		setEditData(data!)
	}

	const handleDeleteClick = async (data: string) => {
		console.log('Delete clicked with data:', data)
		const res = await axios.delete(`${apiUrl}/${data}`)
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
			const filteredRows = studentsData.filter((row) => {
				const lowerSearchedVal = searchedVal.toLowerCase()
				return row.firstName.toLowerCase().includes(lowerSearchedVal)
			})
			setRows(filteredRows)
		},
		[studentsData]
	)

	const getRowsForCurrentPage = useMemo(() => {
		const startIndex = page * rowsPerPage
		const endIndex = startIndex + rowsPerPage
		return rows.slice(startIndex, endIndex)
	}, [page, rows, rowsPerPage])
	useEffect(() => {
		if (searched === '') {
			setRows(studentsData)
		}
	}, [searched, studentsData])
	return (
		<>
			<Container fixed maxWidth="lg">
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
					<TextField
						variant='outlined'
						fullWidth
						placeholder='Search...'
						value={searched}
						onChange={(e) => requestSearch(e.target.value)}
						sx={{ margin: '24px 0' }}
					/>
					<FormModel />
				</Box>
				<Paper sx={{ margin: '0 auto' }}>
					<TableContainer>
						<Table aria-label='simple table'>
							<TableHead sx={{ backgroundColor: '#a08eb9' }}			>
								<TableRow>
									<TableCell sx={{ fontWeight: 'bold' }}>Firstname</TableCell>
									<TableCell align='right' sx={{ fontWeight: 'bold' }}>
										Email
									</TableCell>
									<TableCell align='right' sx={{ fontWeight: 'bold' }}>
										Gender
									</TableCell>
									<TableCell align='right' sx={{ fontWeight: 'bold' }}>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{getRowsForCurrentPage.map((row, index) => (
									<TableRow
										key={row._id}
										onClick={() => handleRowClick(row._id)}
										sx={{ cursor: 'pointer' }}
										className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
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
						sx={{ backgroundColor: '#a08eb9' }}
					/>
				</Paper>

				{editData && <FormModel id={editData} onClose={setEditData} />}
			</Container>
		</>
	)
}
