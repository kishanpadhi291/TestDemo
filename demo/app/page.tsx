import StudentTable from '@/components/StudentTable/StudentTable'
import { ToastContainer, toast } from 'react-toastify'

// This is a Next.js page component.
// It renders the StudentTable component and includes the ToastContainer for notifications.
const page = () => {
	return (
		<>
			{/* ToastContainer for displaying notifications */}
			<ToastContainer />

			{/* StudentTable component to display student data */}
			<StudentTable />
		</>
	)
}

// Export the page component for Next.js to use.
export default page
