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

// Types
export type ProjectDataPostProps = {
    data: {
        attributes: {
            name: string;
            status?: string;
            description: string;
            type: string;
            team_in_charge?: string;
        };
        relationships?: {
            files?: {
                data: { id: number; type: string }[];
            };
            users?: {
                data: { id: number; type: string }[];
            };
            production_items?: {
                data: { id: number; type: string }[];
            };
            orchestra?: {
                data: { id: number; type: string };
            };
            professor?: {
                data: { id: number; type: string };
            };
            instruments?: {
                data: { id: number; type: string }[];
            };
        };
    };
};

export type ProjectDataPutProps = {
    data: {
        attributes?: {
            name?: string;
            status?: string;
            description?: string;
            type?: string;
            team_in_charge?: string;
        };
        relationships?: {
            files?: {
                data: { id: number; type: string }[];
            };
            users?: {
                data: { id: number; type: string }[];
            };
            production_items?: {
                data: { id: number; type: string }[];
            };
            orchestra?: {
                data: { id: number; type: string };
            };
            professor?: {
                data: { id: number; type: string };
            };
            instruments?: {
                data: { id: number; type: string }[];
            };
        };
    };
};

// Functions
export const getProjectRelationship = (projectId: string, relationship: string) => {
	return axios
		.get(`/api/projects/${projectId}/relationships/${relationship}`)
		.then(handleResponse)
		.catch(handleError);
};

export const updateProjectRelationship = (
	projectId: string,
	relationship: string,
	relationshipData: unknown
) => {
	return axios
		.patch(`/api/projects/${projectId}/relationships/${relationship}`, relationshipData)
		.then(handleResponse)
		.catch(handleError);
};

export const getSingleProject = (projectId: string) => {
	return axios.get(`/api/projects/${projectId}`).then(handleResponse).catch(handleError);
};

export const getAllUserProjects = (userId: string) => {
	return axios.get(`/api/users/${userId}/projects`).then(handleResponse).catch(handleError);
};

export const getAllOwnedProjects = (userId: string) => {
	return axios.get(`/api/users/${userId}/owned-projects`).then(handleResponse).catch(handleError);
};

export const getAllAssignedProjects = (userId: string) => {
	return axios.get(`/api/users/${userId}/assigned-projects`).then(handleResponse).catch(handleError);
};

export const createProject = (userId: string, projectData: ProjectDataPostProps) => {
	return axios.post(`/api/users/${userId}/projects`, projectData).then(handleResponse).catch(handleError);
};

export const updateProject = (projectId: string, projectData: ProjectDataPutProps) => {
	return axios.patch(`/api/projects/${projectId}`, projectData).then(handleResponse).catch(handleError);
};

export const deleteProject = (projectId: string) => {
	return axios.delete(`/api/projects/${projectId}`).then(handleResponse).catch(handleError);
};
