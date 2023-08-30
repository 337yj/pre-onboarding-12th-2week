import React, { useState, useEffect, useContext } from 'react';
import { getIssueList } from '../../api/issue';
import { Banner, IssueItem } from '../../components/Common';
import Loading from '../../components/Common/Loding';
import useObserver from '../../hook/useObserver';

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
						<li key={`${issue.number}-${idx}`}>
							<IssueItem issue={issue} />
							{isBannerVisible && <Banner />}
						</li>
					);
				})}
				{loading && <Loading />}
				<div ref={targetRef} style={{ height: '50px' }} />
			</ul>
		</main>
	);
};

export default Home;
