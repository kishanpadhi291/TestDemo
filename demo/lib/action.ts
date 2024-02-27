'use server'

import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { apiUrl } from './FormSlice'

export async function submitForm(formData: FormData) {
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
	const res = await axios.post(apiUrl, student)
	if (res.status === 201) {
		revalidatePath('/')
		redirect('/')
	}
}
