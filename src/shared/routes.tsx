import Home from './Home';
import Grid from './Grid';
import { fetchPopularRepos, GitHubRepoItem } from './api';

export interface Route {
	path: string;
	exact?: boolean;
	component: typeof Home | typeof Grid;
	fetchInitialData?: (path: string) => Promise<Array<GitHubRepoItem>>;
}

const routes: Array<Route> = [
	{
		path: '/',
		exact: true,
		component: Home,
	},
	{
		path: '/popular/:id',
		component: Grid,
		fetchInitialData: (path = ''): Promise<Array<GitHubRepoItem>> =>
			fetchPopularRepos(path.split('/').pop()),
	},
];

export default routes;
