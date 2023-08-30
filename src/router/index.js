import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage, IssueDetailPage, NotFoundPage } from '../pages';

const router = (
	<Route>
		<Route path="/" element={<HomePage />} />
		<Route path="detail/:id" element={<IssueDetailPage />} />
		<Route path="/*" element={<NotFoundPage />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
