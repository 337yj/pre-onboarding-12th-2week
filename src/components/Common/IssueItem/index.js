import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
			<div>
				<h2 onClick={goToDetail(`detail/${number}`)}>{`#${number} ${title}`}</h2>
				<p>{`작성자: ${user.login} / 작성일: ${created_at.slice(0, 10)}`}</p>
			</div>
			<div>
				<span>{comments}</span>
			</div>
		</article>
	);
};

export default IssueItem;
