import FormDatePicker from '@/components/FormDatePicker'
import MultipleSelectChip from '@/components/MultiSelectDropdown'
import { submitForm } from '@/lib/action'
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

const page = () => {
	return (
		<>
			<Typography variant='h3' style={{ textAlign: 'center' }}>
				Form
			</Typography>
			<form action={submitForm}>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField label='First Name' name='firstname' fullWidth required />
					</Grid>
					<Grid item xs={4}>
						<TextField label='Middle Name' name='middleName' fullWidth />
					</Grid>
					<Grid item xs={4}>
						<TextField label='Surname' name='surname' fullWidth required />
					</Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<TextField
							label='Email'
							name='email'
							type='email'
							fullWidth
							margin='normal'
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label='PhoneNumber'
							name='phonenumber'
							type='text'
							fullWidth
							margin='normal'
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControl fullWidth margin='normal' required>
							<InputLabel>Gender</InputLabel>
							<Select label='Gender' name='gender'>
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
							name='collegename'
							type='text'
							fullWidth
							margin='normal'
							required
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControl fullWidth margin='normal' required>
							<InputLabel>Department</InputLabel>
							<Select label='Department' name='department'>
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
						<MultipleSelectChip />
					</Grid>
					<Grid item xs={4}>
						<FormDatePicker label='Date of Birth' name='dob' />
					</Grid>
				</Grid>

				<Grid container justifyContent='center' mt={1}>
					<Button type='submit' variant='contained' color='primary'>
						Submit
					</Button>
				</Grid>
			</form>
		</>
	)
}

export default page
