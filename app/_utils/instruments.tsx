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

const handleResponse = (response: AxiosResponse) => response.data;
const handleError = (error: AxiosError) => {
	console.error('Error:', error);
	return false;
};

export type InstrumentDataAttributes = {
    description: string;
    quantity: number;
    state: string;
    type: string;
};

export type InstrumentDataPostProps = {
    data: {
        attributes: InstrumentDataAttributes;
    };
};

export type InstrumentDataPutProps = {
    data: {
        id: string;
        attributes: Partial<InstrumentDataAttributes>;
    };
};

export const getInstruments = () => {
	return axios.get('/api/instruments').then(handleResponse).catch(handleError);
};

export const getInstrument = (instrumentId: string) => {
	return axios.get(`/api/instruments/${instrumentId}`).then(handleResponse).catch(handleError);
};

export const createInstrument = (instrumentData: InstrumentDataPostProps) => {
	return axios.post('/api/instruments', instrumentData).then(handleResponse).catch(handleError);
};

export const updateInstrument = (instrumentId: string, updatedInstrumentData: InstrumentDataPutProps) => {
	return axios.patch(`/api/instruments/${instrumentId}`, updatedInstrumentData).then(handleResponse).catch(handleError);
};

export const deleteInstrument = (instrumentId: string) => {
	return axios.delete(`/api/instruments/${instrumentId}`).then(handleResponse).catch(handleError);
};
