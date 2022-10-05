import axios from 'axios';
import { subscribe, unsubscribe, responseInterceptor } from './backend/responseInterceptor';
import { autoAddCsrfToken } from './backend/csrfToken';
import defaultRequestHeaders from './backend/defaultRequestHeaders';

let axiosInstance = axios.create({
	baseURL: process.env.APP_ROOT || '',
});

defaultRequestHeaders(axiosInstance);
autoAddCsrfToken(axiosInstance);
responseInterceptor(axiosInstance);

export { subscribe, unsubscribe };

// sample request format
export function getExample({ date, page, success, error }) {
	axiosInstance({
		url: '/getexample',
		method: 'post',
		data: {
			date,
			page,
		},
	})
		.then(success)
		.catch(error ? error : () => {});
}
