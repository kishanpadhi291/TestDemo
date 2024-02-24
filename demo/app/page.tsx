// import Form from '@/components/Form'
import Table from '@/components/Table'
import { Box, Button } from '@mui/material'
import Link from 'next/link'

const page = () => {
	return (
		<>
			<Box textAlign='center' mt={2}>
				<Button
					component={Link}
					href='/Form'
					variant='contained'
					color='primary'
				>
					Add data
				</Button>
			</Box>
			<Table />
		</>
	)
}

export default page