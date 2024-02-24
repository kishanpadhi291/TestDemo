'use client'
import React, { useCallback, useMemo, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	makeStyles,
	TablePagination,
} from '@mui/material'

interface food {
	name: string
	calories: number
	fat: number
	carbs: number
	protein: number
}

const originalRows: food[] = [
	{ name: 'Pizza', calories: 200, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Hot Dog', calories: 300, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Burger', calories: 400, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Hamburger', calories: 500, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Fries', calories: 600, fat: 6.0, carbs: 24, protein: 4.0 },
	{ name: 'Ice Cream', calories: 700, fat: 6.0, carbs: 24, protein: 4.0 },
]

export default function BasicTable() {
	const [rows, setRows] = useState<food[]>(originalRows)
	const [searched, setSearched] = useState<string>('')
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
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

	const requestSearch = useCallback((searchedVal: string) => {
		setSearched(searchedVal)
		const filteredRows = originalRows.filter((row) => {
			return row.name.toLowerCase().includes(searchedVal.toLowerCase())
		})
		setRows(filteredRows)
	}, [])

	const getRowsForCurrentPage = useMemo(() => {
		const startIndex = page * rowsPerPage
		const endIndex = startIndex + rowsPerPage
		return rows.slice(startIndex, endIndex)
	}, [page, rows, rowsPerPage])

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
								<TableCell style={{ fontWeight: 'bold' }}>
									Food (100g serving)
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Calories
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Fat&nbsp;(g)
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Carbs&nbsp;(g)
								</TableCell>
								<TableCell align='right' style={{ fontWeight: 'bold' }}>
									Protein&nbsp;(g)
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{getRowsForCurrentPage.map((row) => (
								<TableRow key={row.name}>
									<TableCell component='th' scope='row'>
										{row.name}
									</TableCell>
									<TableCell align='right'>{row.calories}</TableCell>
									<TableCell align='right'>{row.fat}</TableCell>
									<TableCell align='right'>{row.carbs}</TableCell>
									<TableCell align='right'>{row.protein}</TableCell>
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
		</>
	)
}
