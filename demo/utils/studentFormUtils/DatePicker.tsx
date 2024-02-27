// Import necessary components and libraries for date picking
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as DOBDatePicker } from '@mui/x-date-pickers/DatePicker'
import { format, parse } from 'date-fns'
import dayjs from 'dayjs'

// DatePicker component for rendering a date picker with specific formatting
const DatePicker = ({
	label,
	name,
	value,
}: {
	label: string
	name: string
	value?: string
}) => {
	return (
		// Wrap the DatePicker component with LocalizationProvider using Day.js as the date adapter
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			{/* Render the actual date picker component */}
			<DOBDatePicker
				label={label} // Display label for the date picker
				name={name} // Assign a unique name for the date picker
				format='DD/MM/YYYY' // Specify the format for displaying dates
				sx={{ width: '100%' }} // Apply styles to the date picker component
				defaultValue={
					value !== ''
						? dayjs(
								format(parse(value!, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
						  )
						: dayjs()
				} // Set the default value based on the provided value or use the current date
			/>
		</LocalizationProvider>
	)
}

// Export the DatePicker component for use in other parts of the application
export default DatePicker
