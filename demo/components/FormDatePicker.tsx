'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const FormDatePicker = ({ label, name }: { label: string; name: string }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker label='Date of Birth' name='dob' format='DD/MM/YYYY' />
		</LocalizationProvider>
	)
}
export default FormDatePicker
