import React, { useState, useEffect, useContext } from 'react';
import { getIssueList } from '../../api/issue';
import { Banner, IssueItem } from '../../components/Common';
import Loading from '../../components/Common/Loading';
import useObserver from '../../hook/useObserver';
import styled from 'styled-components';

const Home = () => {
	const [issueList, setIssueList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [nextPage, setNextPage] = useState(true);
	const [page, setPage] = useState(1);

	const getIssues = async () => {
		setLoading(true);
		const { data } = await getIssueList({ sort: 'comments', page, state: 'open' });

		if (data.length === 0) {
			setNextPage(false);
		} else {
			setIssueList((prev) => [...prev, ...data]);
			setPage((prev) => prev + 1);
		}
		setLoading(false);
	};

	console.log(issueList);
	useEffect(() => {
		getIssues();
	}, []);

	const loadMore = async () => {
		if (nextPage && !loading) {
			await getIssues();
		}
	};

	const targetRef = useObserver(loadMore, [nextPage, loading]);

	return (
		<main>
			<ul>
				{issueList.map((issue, idx) => {
					const isBannerVisible = (idx + 1) % 4 === 0;
					return (
						<List key={`${issue.number}-${idx}`}>
							<IssueItem issue={issue} />
							{isBannerVisible && <Banner />}
						</List>
					);
				})}
				{loading && <Loading />}

				<div ref={targetRef} />
			</ul>
		</main>
	);
};

const List = styled.li`
	margin-top: 24px;
`;

export default Home;
