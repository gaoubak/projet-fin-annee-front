import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export const instance = axios.create({
	baseURL: BACKEND_URL,
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
			localStorage.setItem('XSRF-TOKEN', xsrfToken);
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

export const login = async (email: string, password: string) => {
	const response = await instance.post('/login', {
		data: {
			attributes: {
				email: email,
				password: password,
			},
		},
	});

	if (response.status === 200) {
		// store user details
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response;
};

export const isUserLoggedIn = () => {
	return JSON.parse(localStorage.getItem('user') || '{}');
};

export const logout = async () => {
	const response = await instance.post('/logout');
	localStorage.removeItem('user');
	return response;
};

export const getToken = () => {
	if (typeof localStorage !== 'undefined' && localStorage !== null) {
		const user = JSON.parse(localStorage.getItem('user') || '{}');
		return user.token || null;
	} else {
		return null;
	}
};
