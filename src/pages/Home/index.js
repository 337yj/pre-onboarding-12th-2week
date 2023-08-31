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
			<Wrap>
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
			</Wrap>
		</main>
	);
};

const Wrap = styled.ul`
	border: 1px solid var(--color-placeholder);
	border-radius: 20px;
`;

const List = styled.li`
	padding: 24px;
	border-bottom: 1px solid var(--color-placeholder);
`;

export default Home;
