import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const IssueItem = ({ issue }) => {
	const { number, title, user, created_at, comments } = issue;

	const navigate = useNavigate();

	const goToDetail = (path) => {
		return () => {
			navigate(path);
		};
	};

	return (
		<article>
			<Div>
				<h2 onClick={goToDetail(`detail/${number}`)}>{`#${number} ${title}`}</h2>
				<Comment>{comments}</Comment>
			</Div>

			<p>{`작성자: ${user.login} / 작성일: ${created_at.slice(0, 10)}`}</p>
		</article>
	);
};

const Div = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 12px;
`;

const Comment = styled.div`
	padding: 4px 10px;
	margin-left: 16px;
	border-radius: 20px;
	background-color: var(--color-primary);
	color: var(--color-white);
	font-size: 14px;
	font-weight: bold;
`;

export default IssueItem;
