import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from '../components';
import { HomePage, IssueDetailPage, NotFoundPage } from '../pages';

const router = (
	<Route element={<Layout />}>
		<Route path="/" element={<HomePage />} />
		<Route path="detail/:id" element={<IssueDetailPage />} />
		<Route path="/*" element={<NotFoundPage />} />
	</Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(router));

export default rootRouter;
