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
	if (response.status === 200 || response.status === 201) {
		return response.data;
	}
	return false;
};

const handleError = (error: AxiosError) => {
	console.error('Error:', error);
	return false;
};

export type OrchestraDataAttributes = {
    name: string;
    email: string;
    members_count: number;
    has_been_invited: boolean;
};

export type OrchestraDataPostProps = {
    data: {
        attributes: OrchestraDataAttributes;
    };
};

export type OrchestraDataPutProps = {
    data: {
        attributes: Partial<OrchestraDataAttributes>;
    };
};

export const getSingleOrchestra = (orchestraId: string) => {
	return axios.get(`/api/orchestras/${orchestraId}`).then(handleResponse).catch(handleError);
};

export const createOrchestra = (orchestraData: OrchestraDataPostProps) => {
	return axios.post('/api/orchestras', orchestraData).then(handleResponse).catch(handleError);
};
