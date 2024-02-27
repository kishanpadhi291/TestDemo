'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useAppDispatch } from '@/lib/hooks/hooks'
import { apiUrl, Students, dataAdded } from '@/lib/FormSlice'
import { useEffect, useState } from 'react'
import HobbiesDropdown from '@/utils/studentFormUtils/HobbiesDropdown'
import DatePicker from '@/utils/studentFormUtils/DatePicker'
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80vw',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	backgroundColor: '#8EC5FC',
	backgroundImage: 'linear-gradient(62deg, #c9e4ff 0%, #e5caff 100%)',
}

export default function FormModel({
	id,
	onClose,
}: {
	id?: string
	onClose?: React.Dispatch<React.SetStateAction<string | null>>
}) {
	const [open, setOpen] = React.useState(false)
	const [current, setCurrent] = React.useState<Students>()
	const [selectedGender, setSelectedGender] = useState('')
	const [selectedDepartment, setSelectedDepartment] = useState('')
	const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
	const dispatch = useAppDispatch()
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		onClose?.(null)
		id = undefined
	}
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${apiUrl}/${id}`
				)
				setCurrent(response.data.user)
				setSelectedGender(response.data.user?.gender || '')
				setSelectedDepartment(response.data.user?.department || '')
				setSelectedHobbies(response.data.user?.hobbies || [])
				console.log(response.data.user)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		if (id) {
			setOpen(true)
			fetchData()
		}
	}, [id])

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault()
		const formData = new FormData(e.target as HTMLFormElement)
		const student = {
			firstName: formData.get('firstName'),
			middleName: formData.get('middleName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			contactNumber: formData.get('contactNumber'),
			gender: formData.get('gender'),
			collegeName: formData.get('collegeName'),
			department: formData.get('department'),
			dob: formData.get('dob'),
			hobbies: formData.get('hobbies'),
		}
		if (id) {
			const res = await axios.put(`${apiUrl}/${id}`, student)
			if (res.status === 200) {
				alert('Sucessfully updated data')
				dispatch(dataAdded())
				onClose?.(null)
				setOpen(false)
			}
		} else {
			const res = await axios.post(apiUrl, student)
			if (res.status === 201) {
				alert('Sucessfully added data')
				dispatch(dataAdded())
				onClose?.(null)
				setOpen(false)
			}
		}
	}
	return (
		<div>
			<ToastContainer />
			<Box textAlign='center' sx={{ whiteSpace: 'pre' }}>
				<Button
					variant='contained'
					color='primary'
					onClick={handleOpen}
					sx={{ backgroundColor: '#544765' }}
				>
					Add data
				</Button>
			</Box>
			<Modal
				open={open!}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style} className='student-registry-form-container'>
					<Typography
						variant='h3'
						sx={{
							textAlign: 'center',
							marginBottom: '30px',
							fontSize: '2.2rem',
						}}
					>
						Student Registration Form
					</Typography>
					<form onSubmit={submitHandler}>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									label='First Name'
									name='firstName'
									defaultValue={id && current ? current.firstName : ''}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Middle Name'
									name='middleName'
									defaultValue={id && current ? current.middleName : ''}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Surname'
									name='lastName'
									defaultValue={id && current ? current.lastName : ''}
									fullWidth
									required
								/>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									label='Email'
									name='email'
									type='email'
									defaultValue={id && current ? current.email : ''}
									fullWidth
									margin='normal'
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Contact'
									name='contactNumber'
									type='number'
									defaultValue={id && current ? current.contactNumber : ''}
									fullWidth
									margin='normal'
									required
									onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
										e.target.value = Math.max(0, parseInt(e.target.value))
											.toString()
											.slice(0, 10)
									}}
								/>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth margin='normal' required>
									<InputLabel>Gender</InputLabel>
									<Select
										label='Gender'
										name='gender'
										value={selectedGender}
										onChange={(e) => setSelectedGender(e.target.value)}
									>
										<MenuItem value='male'>Male</MenuItem>
										<MenuItem value='female'>Female</MenuItem>
										<MenuItem value='other'>Other</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2}>
							<Grid item xs={8}>
								<TextField
									label='College Name'
									name='collegeName'
									type='text'
									defaultValue={id && current ? current.collegeName : ''}
									fullWidth
									margin='normal'
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth margin='normal' required>
									<InputLabel>Department</InputLabel>
									<Select
										label='Department'
										name='department'
										value={selectedDepartment}
										onChange={(e) => setSelectedDepartment(e.target.value)}
									>
										<MenuItem value='IT'>IT</MenuItem>
										<MenuItem value='CE'>CE</MenuItem>
										<MenuItem value='CS'>CS</MenuItem>
										<MenuItem value='other'>Other</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={2} mt={0.1}>
							<Grid item xs={4}>
								{current && (
									<HobbiesDropdown defaultValue={selectedHobbies} />
								)}
								{!current && (
									<HobbiesDropdown defaultValue={selectedHobbies} />
								)}
							</Grid>
							<Grid item xs={4}>
								{current && (
									<DatePicker
										label='DOB'
										name='dob'
										value={id && current ? current.dob : ''}
									/>
								)}
								{!current && (
									<DatePicker label='DOB' name='dob' value={''} />
								)}
							</Grid>
						</Grid>

						<Grid container justifyContent='center'>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								sx={{ marginTop: 20, backgroundColor: '#544765' }}
							>
								Submit
							</Button>
						</Grid>
					</form>
				</Box>
			</Modal>
		</div>
	)
}
