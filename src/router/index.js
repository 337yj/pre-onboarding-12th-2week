import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage, IssueDetailPage } from '../pages';

const router = (
	<Route>
		<Route path="/" element={<HomePage />} />
		<Route path="detail/:id" element={<IssueDetailPage />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
