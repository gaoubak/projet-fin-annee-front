import axios, { AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@utils/session';

axios.defaults.baseURL = process.env.BACKEND_URL;

axios.interceptors.request.use(config => {
	const token = getToken();
	config.headers.Authorization = `Bearer ${token || ''}`;
	config.headers.Accept = 'application/vnd.api+json';
	return config;
});

const handleResponse = (response: AxiosResponse) => {
	return response.data;
};

const handleError = (error: AxiosError) => {
	throw error;
};

export const getAllStudents = () => {
	return axios.get('/api/students').then(handleResponse).catch(handleError);
};

export const getSingleStudent = (studentId: string) => {
	return axios.get(`/api/students/${studentId}`).then(handleResponse).catch(handleError);
};
