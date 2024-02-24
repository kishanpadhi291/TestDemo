'use server'
export async function submitForm(formData: FormData) {
	console.log(formData.get('firstname'))
	console.log(formData.get('middleName'))
	console.log(formData.get('surname'))
	console.log(formData.get('email'))
	console.log(formData.get('phonenumber'))
	console.log(formData.get('gender'))
	console.log(formData.get('collegename'))
	console.log(formData.get('department'))
	console.log(formData.get('dob'))
	console.log(formData.get('hobbies'))
}
