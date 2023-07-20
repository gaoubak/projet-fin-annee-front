import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8000',
	headers: {
		Accept: 'application/vnd.api+json',
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: true,
});

const refreshCSRFToken = async () => {
	try {
		await instance.get('/sanctum/csrf-cookie');

		const xsrfTokenCookie = document.cookie
			.split('; ')
			.find((row) => row.startsWith('XSRF-TOKEN='));
		if (xsrfTokenCookie) {
			const xsrfToken = xsrfTokenCookie.split('=')[1];
			instance.defaults.headers.common['X-XSRF-TOKEN'] = xsrfToken;
		}
	} catch (error) {
		console.error('Failed to refresh CSRF token:', error);
	}
};

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (error.response && error.response.status === 419) {
			await refreshCSRFToken();
			return instance(error.config);
		}
		return Promise.reject(error);
	}
);

export default instance;
