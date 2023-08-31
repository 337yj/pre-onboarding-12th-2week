import { marked } from 'marked';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../api/issue';
import { IssueItem, Loading } from '../../components';
import styled from 'styled-components';

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

	const htmlBody = marked(issueDetail.body);

	return (
		<Wrapper>
			<div>
				<CenteredContainer>
					<Img src={issueDetail.user.avatar_url} alt="avartar image" />
					<IssueItem issue={issueDetail} />
				</CenteredContainer>
			</div>
			<Content dangerouslySetInnerHTML={{ __html: htmlBody }} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	border: 1px solid var(--color-placeholder);
	border-radius: 20px;
	padding: 24px;
`;

const CenteredContainer = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;

	margin-bottom: 20px;
`;

const Img = styled.img`
	height: 20vh;
	padding-right: 16px;
`;

const Content = styled.p`
	border-top: 1px solid var(--color-placeholder);
	padding-top: 20px;
`;

export default IssueDetail;
