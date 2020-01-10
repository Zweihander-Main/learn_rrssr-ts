import fetch from 'isomorphic-fetch';

export interface GitHubUsersResponse {
	name?: string;
	followers: number;
	location?: string;
	company?: string;
	avatar_url: string;
	login: string;
	html_url?: string;
	following: number;
}

export interface GitHubRepoItem {
	name: string;
	owner: GitHubUsersResponse;
	html_url: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
}

export interface GitHubRepos {
	message?: string;
	items: Array<GitHubRepoItem>;
}

/**
 * Fetch repos from GitHub, return array of repos
 *
 * @param      {string}  language  The language
 */
export function fetchPopularRepos(
	language = 'all'
): Promise<Array<GitHubRepoItem>> {
	const encodedURI = encodeURI(
		`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
	);

	return fetch(encodedURI)
		.then((data: Response) => data.json())
		.then((repos: GitHubRepos) => repos.items)
		.catch((error: string) => {
			console.warn(error);
			return null;
		});
}
