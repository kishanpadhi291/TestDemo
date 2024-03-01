import axios from "axios";
interface studentProps {
    firstName: FormDataEntryValue | null;
    middleName: FormDataEntryValue | null;
    lastName: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    contactNumber: FormDataEntryValue | null;
    gender: FormDataEntryValue | null;
    collegeName: FormDataEntryValue | null;
    department: FormDataEntryValue | null;
    hobbies: FormDataEntryValue | null;
    dob: FormDataEntryValue | null;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    timeout: 8000,
    headers: {
        Accept: 'application/json',
    },
});

export const getStudentsAPI = async () => axiosInstance.get('/')
export const getStudentByIdAPI = async (id: string) => axiosInstance.get(`/${id}`)
export const createStudentAPI = async (student: studentProps) => axiosInstance.post('/', student)
export const editStudentAPI = async (id: string, student: studentProps) => axiosInstance.put(`/${id}`, student)
export const deleteStudentAPI = async (id: string) => axiosInstance.delete(`/${id}`)
