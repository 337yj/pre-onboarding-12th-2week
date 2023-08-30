import axios from 'axios';

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;

const apiClient = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
	if (accessToken) {
		config.headers['Authorization'] = `Bearer ${accessToken}`;
		config.headers['X-GitHub-Api-Version'] = '2022-11-28';
	}

	return config;
});

export default apiClient;
