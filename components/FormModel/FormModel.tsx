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
import React, { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
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
import { useAppDispatch } from '@/lib/hooks/hooks'
import { Students, dataAdded } from '@/lib/studentSlice'
import HobbiesDropdown from '@/utils/studentFormUtils/HobbiesDropdown/HobbiesDropdown'
import DatePicker from '@/utils/studentFormUtils/DatePicker'
import { createStudentAPI, editStudentAPI, getStudentByIdAPI } from '@/lib/api/api'
import './formModel.scss'

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
				const response = await getStudentByIdAPI(id!)
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
				const res = await editStudentAPI(id, student)
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
				const res = await createStudentAPI(student)
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
		<div className='header-main-wrap'>
			<Box className="header-wrap">
				<div className="header" >
					<Typography variant='h3' className='header-text'>
						Student List
					</Typography>
				</div>
				<div className="header-button">
					<Button
						variant='contained'
						color='primary'
						onClick={handleOpen}
						className='add-student-btn'
					>
						Add Student
					</Button>
				</div>
			</Box>
			<Modal
				open={open!}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box className='student-registry-form-container'>
					<Typography
						variant='h3'
						className='modal-header'
					>
						Student Registration Form
					</Typography>
					<form onSubmit={submitHandler} className='form-wrap'>
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
								<div className='hobbies-wrap'>
									{current && <HobbiesDropdown defaultValue={selectedHobbies} />}
									{!current && <HobbiesDropdown defaultValue={selectedHobbies} />}
								</div>
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
								className='submit-btn'
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
