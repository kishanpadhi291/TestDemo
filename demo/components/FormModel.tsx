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
import { apiUrl, dataAdded, getStudentsById } from '@/lib/FormSlice'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'
import { useRouter } from 'next/navigation'
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
	backgroundImage: 'linear-gradient(62deg, #c9e4ff 0%, #e5caff 100%)'
}

export default function FormModel({
	id,
	onClose,
}: {
	id?: string
	onClose?: React.Dispatch<React.SetStateAction<string | null>>
}) {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const current = useSelector((state: StoreState) => state.form.currentStudent)
	const dispatch = useAppDispatch()
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		onClose?.(null)
		id = undefined
	}

	React.useEffect(() => {
		if (id) {
			setOpen(true)
			dispatch(getStudentsById(id))
		}
	}, [id, current])
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
			const res = await axios.put(
				`${apiUrl}/${id}`,
				student
			)
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
				<Button variant='contained' color='primary' onClick={handleOpen} style={{ backgroundColor: '#544765' }}>
					Add data
				</Button>
			</Box>
			<Modal
				open={open!}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={style}>
					<Typography variant='h3' style={{
						textAlign: 'center',
						marginBottom: '30px',
						fontSize: '2.2rem',
					}}>
						Student Registration Form
					</Typography>
					<form onSubmit={submitHandler}>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									label='First Name'
									name='firstName'
									defaultValue={id ? current.firstName : ''}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Middle Name'
									name='middleName'
									defaultValue={id ? current.middleName : ''}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Surname'
									name='lastName'
									defaultValue={id ? current.lastName : ''}
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
									defaultValue={id ? current.email : ''}
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
									defaultValue={id ? current.contactNumber : ''}
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
										defaultValue={id ? current.gender : ''}
									>
										{/* <MenuItem value='select' disabled>Select</MenuItem> */}
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
									defaultValue={id ? current.collegeName : ''}
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
										defaultValue={id ? current.department : ''}
									>
										{/* <MenuItem value='select' disabled>Select</MenuItem> */}
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
								<HobbiesDropdown defaultValue={id ? current.hobbies : undefined} />
							</Grid>
							<Grid item xs={4}>
								<DatePicker
									label='DOB'
									name='dob'
									value={id ? current.dob : ''}
								/>
							</Grid>
						</Grid>

						<Grid container justifyContent='center'>
							<Button type='submit' variant='contained' color='primary' style={{ marginTop: 20, backgroundColor: '#544765' }}>
								Submit
							</Button>
						</Grid>
					</form>
				</Box>
			</Modal>
		</div>
	)
}
