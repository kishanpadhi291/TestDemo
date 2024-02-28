/**
 * FormModel Component
 *
 * This component represents a modal form for student registration or editing.
 *
 * @component
 *
 * @param {object} props - The properties passed to the component.
 * @param {string} [props.id] - The ID of the student for editing. If present, the form is in edit mode.
 * @param {React.Dispatch<React.SetStateAction<string | null>>} [props.onClose] - A function to handle modal closure.
 *
 * @returns {React.ReactElement} The rendered form modal component.
 *
 * @example
 * // Usage of the FormModel component:
 * // Import the FormModel component and use it in your component.
 * import FormModel from './FormModel';
 *
 * // Use the FormModel component with optional parameters.
 * const MyComponent = () => {
 *   const handleClose = (id) => {
 *     // Handle modal closure
 *   };
 *
 *   return (
 *     <FormModel id="123" onClose={handleClose} />
 *   );
 * };
 */
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import { useAppDispatch } from '@/lib/hooks/hooks'
import { apiUrl, Students, dataAdded } from '@/lib/FormSlice'
import HobbiesDropdown from '@/utils/studentFormUtils/HobbiesDropdown/HobbiesDropdown'
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
	const [open, setOpen] = useState(false)
	const [current, setCurrent] = useState<Students>()
	const [firstName, setFirstname] = useState('')
	const [middleName, setMiddleName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [email, setStudentEmail] = useState('')
	const [collegeName, setCollegeName] = useState('')
	const [selectedGender, setSelectedGender] = useState('')
	const [selectedDepartment, setSelectedDepartment] = useState('')
	const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])
	const dispatch = useAppDispatch()

	// Memoized functions using useMemo and useCallback
	const handleOpen = useCallback(() => setOpen(true), [])
	const handleClose = useCallback(() => {
		setOpen(false)
		onClose?.(null)
		id = undefined
	}, [onClose])

	useEffect(() => {
		// Fetch data memoized function
		const fetchData = async () => {
			try {
				const response = await axios.get(`${apiUrl}/${id}`)
				setCurrent(response.data.student)
				setFirstname(response.data.student?.firstName || '')
				setMiddleName(response.data.student?.middleName || '')
				setLastName(response.data.student?.lastName || '')
				setPhoneNumber(response.data.student?.contactNumber || '')
				setStudentEmail(response.data.student?.email || '')
				setCollegeName(response.data.student?.collegeName || '')
				setSelectedGender(response.data.student?.gender || '')
				setSelectedDepartment(response.data.student?.department || '')
				setSelectedHobbies(response.data.student?.hobbies || [])
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		if (id) {
			handleOpen()
			fetchData()
		}
	}, [id, handleOpen])

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
			try {
				const res = await axios.put(`${apiUrl}/${id}`, student)
				if (res.status === 200) {
					dispatch(dataAdded())
					toast.success('Student Data Updated Successfully')
					onClose?.(null)
					setOpen(false)
				} else {
					toast.error('Something went wrong')
				}
			} catch (error) {
				toast.error(
					'Email should be unique, email already registered with a different user'
				)
			}
		} else {
			try {
				const res = await axios.post(apiUrl, student)
				if (res.status === 201) {
					toast.success('Student Added Successfully')
					dispatch(dataAdded())
					onClose?.(null)
					setOpen(false)
				} else {
					toast.error('Something went wrong')
				}
			} catch (error) {
				toast.error(
					'Email should be unique, email already registered with a different user'
				)
			}
		}
	}

	return (
		<div>
			<Box textAlign='center' sx={{ whiteSpace: 'pre' }}>
				<Button
					variant='contained'
					color='primary'
					onClick={handleOpen}
					style={{ backgroundColor: '#544765' }}
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
									value={firstName}
									onChange={(e) => setFirstname(e.target.value)}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Middle Name'
									name='middleName'
									value={middleName}
									onChange={(e) => setMiddleName(e.target.value)}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Surname'
									name='lastName'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
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
									value={email}
									onChange={(e) => setStudentEmail(e.target.value)}
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
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
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
									value={collegeName}
									onChange={(e) => setCollegeName(e.target.value)}
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
								{current && <HobbiesDropdown defaultValue={selectedHobbies} />}
								{!current && <HobbiesDropdown defaultValue={selectedHobbies} />}
							</Grid>
							<Grid item xs={4}>
								{current && (
									<DatePicker
										label='DOB'
										name='dob'
										value={id && current ? current.dob : ''}
									/>
								)}
								{!current && <DatePicker label='DOB' name='dob' value={''} />}
							</Grid>
						</Grid>
						<Grid container justifyContent='center'>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								style={{ marginTop: 20, backgroundColor: '#544765' }}
							>
								{id ? 'Edit' : 'Submit'}
							</Button>
						</Grid>
					</form>
				</Box>
			</Modal>
		</div>
	)
}
