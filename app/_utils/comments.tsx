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

export type CommentDataAttributes = {
    content: string;
};

export type CommentDataPostProps = {
    data: {
        attributes: CommentDataAttributes;
    };
};

export type CommentDataPutProps = {
    data: {
        attributes: Partial<CommentDataAttributes>;
    };
};

export const getAllComments = (ticketId: string) => {
	return axios
		.get(`/api/tickets/${ticketId}/comments`)
		.then(handleResponse)
		.catch(handleError);
};

export const createComment = (ticketId: string, commentData: CommentDataPostProps) => {
	return axios
		.post(`/api/tickets/${ticketId}/comments`, commentData)
		.then(handleResponse)
		.catch(handleError);
};

export const updateComment = (commentId: string, updatedCommentData: CommentDataPutProps) => {
	return axios
		.put(`/api/comments/${commentId}`, updatedCommentData)
		.then(handleResponse)
		.catch(handleError);
};

export const deleteComment = (commentId: string) => {
	return axios
		.delete(`/api/comments/${commentId}`)
		.then(handleResponse)
		.catch(handleError);
};
