import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../api/issue';
import { IssueItem, Loading } from '../../components';

const IssueDetail = () => {
	const { id } = useParams();
	const [issueDetail, setIssueDetail] = useState(null);
	const [loading, setLoading] = useState(false);

	const getIssueDetail = async () => {
		setLoading(true);
		const { data } = await getIssue(id);
		setIssueDetail(data);
		setLoading(false);
	};

	useEffect(() => {
		getIssueDetail();
	}, []);

	if (!issueDetail || loading) {
		return <Loading />;
	}

	return (
		<div>
			<div>
				<img src={issueDetail.user.avatar_url} alt="avartar image" />
				<IssueItem issue={issueDetail} />
			</div>
			<p>{issueDetail.body}</p>
		</div>
	);
};

export default IssueDetail;
