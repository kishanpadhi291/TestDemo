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
import {
	addData,
	editStudentData,
	getCurrentData,
	setCurrentData,
} from '@/lib/studentSlice'
import HobbiesDropdown from '@/utils/studentFormUtils/HobbiesDropdown/HobbiesDropdown'
import DatePicker from '@/utils/studentFormUtils/DatePicker'
import './formModel.scss'
import { useSelector } from 'react-redux'
import { StoreState } from '@/lib/store/store'

export default function FormModel({
	id,
	detail,
	onClose,
}: {
	id?: string
	detail?: boolean
	onClose?: React.Dispatch<React.SetStateAction<string | null>>
}) {
	const [open, setOpen] = useState(false)
	const currentStudent = useSelector(
		(state: StoreState) => state.form.currentStudent
	)
	const dispatch = useAppDispatch()

	// Memoized functions using useMemo and useCallback
	const handleOpen = useCallback(() => setOpen(true), [])
	const handleClose = useCallback(() => {
		setOpen(false)
		onClose?.(null)
		if (!detail) {
			dispatch(setCurrentData())
		}
		id = undefined
	}, [onClose])

	useEffect(() => {
		if (id) {
			dispatch(getCurrentData(id))
			handleOpen()
		}
	}, [])

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
				dispatch(editStudentData({ id, student }))
				toast.success('Student Updated Successfully')
				onClose?.(null)
				setOpen(false)
			} catch (error) {
				toast.error(`Error:${error}`)
			}
		} else {
			try {
				dispatch(addData(student))
				toast.success('Student Added Successfully')
				onClose?.(null)
				setOpen(false)
			} catch (error) {
				toast.error(`Error:${error}`)
			}
		}
	}

	return (
		<div className='header-main-wrap'>
			<Box className='header-wrap'>
				<div className='header'>
					<Typography variant='h3' className='header-text'>
						Student List
					</Typography>
				</div>
				<div className='header-button'>
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
					<Typography variant='h3' className='modal-header'>
						Student Registration Form
					</Typography>
					<form onSubmit={submitHandler} className='form-wrap'>
						<Grid container spacing={2}>
							<Grid item xs={4}>
								<TextField
									label='First Name'
									name='firstName'
									defaultValue={currentStudent?.firstName}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Middle Name'
									name='middleName'
									defaultValue={currentStudent?.middleName}
									fullWidth
									required
								/>
							</Grid>
							<Grid item xs={4}>
								<TextField
									label='Surname'
									name='lastName'
									defaultValue={currentStudent?.lastName}
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
									defaultValue={currentStudent?.email}
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
									defaultValue={currentStudent?.contactNumber}
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
										defaultValue={currentStudent?.gender}
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
									defaultValue={currentStudent?.collegeName}
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
										defaultValue={currentStudent?.department}
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
									<HobbiesDropdown defaultValue={currentStudent?.hobbies} />
								</div>
							</Grid>
							<Grid item xs={4}>
								<DatePicker
									label='DOB'
									name='dob'
									value={id ? currentStudent?.dob : ''}
								/>
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
