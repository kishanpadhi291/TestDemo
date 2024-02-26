import FormModel from '@/components/FormModel'
import Table from '@/components/Table'
import connectDB from '@/utils/connectDB'

// connectDB()

const page = () => {
	return (
		<>
			<FormModel />
			<Table />
		</>
	)
}
export default page
