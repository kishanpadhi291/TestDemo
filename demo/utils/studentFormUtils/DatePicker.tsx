'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as DOBDatePicker } from '@mui/x-date-pickers/DatePicker'
import { format, parse } from 'date-fns'
import dayjs from 'dayjs'
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
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DOBDatePicker
				label={label}
				name={name}
				format='DD/MM/YYYY'
				sx={{ width: '100%' }}
				defaultValue={
					value !== ''
						? dayjs(
							format(parse(value!, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
						)
						: null
				}
			/>
		</LocalizationProvider>
	)
}
export default DatePicker
