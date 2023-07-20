import axios, { AxiosResponse, AxiosError } from 'axios';
import { getToken } from '@utils/session';

axios.defaults.baseURL = process.env.BACKEND_URL;

axios.interceptors.request.use(config => {
	const token = getToken();
	config.headers.Authorization = `Bearer ${token || ''}`;
	config.headers.Accept = 'application/vnd.api+json';
	config.headers['Content-Type'] = 'application/vnd.api+json';
	return config;
});

const handleResponse = (response: AxiosResponse) => {
	return response.data;
};

const handleError = (error: AxiosError) => {
	throw error;
};

export type TicketDataPostProps = {
    data: {
        attributes: {
            name: string;
            status: string;
            description: string;
        };
        relationships?: {
            files?: {
                data?: {
                    id: string;
                    type: string;
                }[];
            };
        };
    };
};

export type TicketDataPutProps = {
    data: {
        id: string;
        attributes: {
            name?: string;
            status?: string;
            description?: string;
        };
        relationships?: {
            files?: {
                data?: {
                    id: string;
                    type: string;
                }[];
            };
        };
    };
};

export const getUserIdTickets = (userId: string) => {
	return axios.get(`/api/users/${userId}/tickets`).then(handleResponse).catch(handleError);
};

export const getProjectIdTickets = (projectId: string) => {
	return axios.get(`/api/projects/${projectId}/tickets`).then(handleResponse).catch(handleError);
};

export const getUserIdTicket = (userId: string, ticketId: string) => {
	return axios.get(`/api/users/${userId}/tickets/${ticketId}`).then(handleResponse).catch(handleError);
};

export const getProjectIdTicket = (projectId: string, ticketId: string) => {
	return axios.get(`/api/projects/${projectId}/tickets/${ticketId}`).then(handleResponse).catch(handleError);
};

export const createTicketForProject = (projectId: string, ticketData: TicketDataPostProps) => {
	return axios.post(`/api/projects/${projectId}/tickets`, ticketData).then(handleResponse).catch(handleError);
};

export const updateTicket = (ticketId: string, ticketData: TicketDataPutProps) => {
	return axios.put(`/api/tickets/${ticketId}`, ticketData).then(handleResponse).catch(handleError);
};

export const deleteTicket = (ticketId: string) => {
	return axios.delete(`/api/tickets/${ticketId}`).then(handleResponse).catch(handleError);
};
