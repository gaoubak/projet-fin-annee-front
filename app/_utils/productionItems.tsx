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
	console.error('Error:', error);
	throw error;
};

export type ProductionItemDataAttributes = {
    description: string;
    quantity: number;
    state: string;
    type: string;
};

export type ProductionItemDataPostProps = {
    data: {
        attributes: ProductionItemDataAttributes;
    };
};

export type ProductionItemDataPutProps = {
    data: {
        id: string;
        attributes: Partial<ProductionItemDataAttributes>;
    };
};

export const getProductionItems = () => {
	return axios.get('/api/production-items').then(handleResponse).catch(handleError);
};

export const getProductionItem = (productionItemId: string) => {
	return axios.get(`/api/production-items/${productionItemId}`).then(handleResponse).catch(handleError);
};

export const createProductionItem = (productionItemData: ProductionItemDataPostProps) => {
	return axios.post('/api/production-items', productionItemData).then(handleResponse).catch(handleError);
};

export const updateProductionItem = (productionItemId: string, updatedProductionItemData: ProductionItemDataPutProps) => {
	return axios.patch(`/api/production-items/${productionItemId}`, updatedProductionItemData).then(handleResponse).catch(handleError);
};

export const deleteProductionItem = (productionItemId: string) => {
	return axios.delete(`/api/production-items/${productionItemId}`).then(handleResponse).catch(handleError);
};
