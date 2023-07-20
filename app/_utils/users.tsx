import axios, { AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@utils/session';

const BACKEND_URL = process.env.BACKEND_URL;

axios.defaults.baseURL = BACKEND_URL;
axios.defaults.headers.common['Accept'] = 'application/vnd.api+json';

axios.interceptors.request.use(config => {
	const token = getToken();
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

export type UserAttributes = {
  name: string,
  email: string,
  role: string
};

export type userDataCreateProps = {
  data: {
    users: UserAttributes[]
  }
};

export type userDataUpdateProps = {
  data: {
    attributes: Partial<UserAttributes>
  }
}

const handleResponse = (response: AxiosResponse) => {
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	return false;
};

const handleError = (error: AxiosError) => {
	if (error.response?.status === 401) {
		return false;
	}
	throw error;
};

export const getUser = async (id: string) => {
	return axios.get(`/api/users/${id}`).then(handleResponse).catch(handleError);
};

export const getCurrentUser = () => {
	return localStorage && localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user') as string)
		: {};
};

export const getUserRelationship = async (userId: string, relationship: string) => {
	return axios.get(`/api/users/${userId}/relationships/${relationship}`).then(handleResponse).catch(handleError);
};

export const updateUserRelationship = async (userId: string, relationship: string, data: userDataCreateProps | userDataUpdateProps) => {
	return axios.patch(`/api/users/${userId}/relationships/${relationship}`, data).then(handleResponse).catch(handleError);
};

export const getAuthUser = async () => {
	return axios.get('/api/user').then(handleResponse).catch(handleError);
};

export const getSingleUser = async (userId: string) => {
	return axios.get(`/api/users/${userId}`).then(handleResponse).catch(handleError);
};

export const getAllUsers = async () => {
	return axios.get('/api/users').then(handleResponse).catch(handleError);
};

export const createUser = async (userData: userDataCreateProps) => {
	return axios.post('/api/users', userData).then(handleResponse).catch(handleError);
};

export const updateUser = async (userId: string, userData: userDataUpdateProps) => {
	return axios.patch(`/api/users/${userId}`, userData).then(handleResponse).catch(handleError);
};

export const deleteUser = async (userId: string) => {
	return axios.delete(`/api/users/${userId}`).then(handleResponse).catch(handleError);
};

export const getAllRoles = async () => {
	return axios.get('/roles').then(handleResponse).catch(handleError);
};

export const isCurrentRouteAllowed = (role: string, route: string) => {
	if (role === 'admin') {
		return true;
	}
	if (role === route) {
		return true;
	}
	return false;
};
