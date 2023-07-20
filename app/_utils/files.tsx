import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from '@utils/session';

axios.defaults.baseURL = process.env.BACKEND_URL;

axios.interceptors.request.use((config) => {
	const token = getToken();
	config.headers.Authorization = `Bearer ${token || ''}`;
	config.headers.Accept = 'application/vnd.api+json';
	return config;
});

const handleResponse = (response: AxiosResponse) => response.data;
const handleError = (error: AxiosError) => {
	console.error('Error:', error);
	return false;
};

export type FileData = {
    id: number;
    type: string;
    attributes: {
        name: string;
        original_name?: string;
        type: string;
        url: string;
        mime_type?: string;
        size?: number;
    };
    relationships: unknown[];
};

export type CreateFileFromURLData = {
    data: {
        attributes: {
            name: string;
            url: string;
        };
    };
};

export type UploadFileData = {
    files: File;
    type: 'audio' | 'video' | 'avatar' | 'document';
};

export type UpdateFileData = {
    data: {
        attributes: {
            name: string;
            url: string;
        };
    };
};

export const getFile = (fileId: string) => {
	return axios.get(`/api/files/${fileId}`).then(handleResponse).catch(handleError);
};

export const createFileFromURL = (data: CreateFileFromURLData) => {
	return axios.post('/api/files', data).then(handleResponse).catch(handleError);
};

export const uploadFile = (file: File, type: 'audio' | 'video' | 'avatar' | 'document') => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('type', type);

	return axios.post('/api/files', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	}).then(handleResponse).catch(handleError);
};

export const deleteFile = (fileId: string) => {
	return axios.delete(`/api/files/${fileId}`).then(handleResponse).catch(handleError);
};
