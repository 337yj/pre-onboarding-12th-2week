import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

apiClient.interceptors.request.use(async (config) => {
	if (ACCESS_TOKEN) {
		config.headers['Authorization'] = ACCESS_TOKEN;
		config.headers['X-GitHub-Api-Version'] = '2022-11-28';
	}

	return config;
});

export default apiClient;
