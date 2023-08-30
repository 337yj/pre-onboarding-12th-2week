import React, { useState, useEffect, useContext } from 'react';
import { getIssueList } from '../../api/issue';
import { Banner, IssueItem } from '../../components/Common';

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
			</ul>
		</main>
	);
};

export default Home;
