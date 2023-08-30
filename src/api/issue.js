import apiClient from './apiClient';

export const ORGANIZATION = 'facebook';
export const REPOSITORY = 'react';

export const getIssueList = async (params) => {
	return await apiClient.get(`repos/${ORGANIZATION}/${REPOSITORY}/issues`, {
		params,
	});
};

export const getIssue = async (id) => {
	return await apiClient.get(`repos/${ORGANIZATION}/${REPOSITORY}/issues/${id}`);
};
