/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import { match } from 'react-router-dom';
import { GitHubRepoItem } from './api';
import { AppProps } from './App';
declare const __isBrowser__: boolean;

interface GridParams {
	id?: string;
}

interface GridProps extends AppProps {
	match?: match<GridParams>;
	fetchInitialData?: (lang: string) => Promise<Array<GitHubRepoItem>>;
}

interface GridState {
	repos: Array<GitHubRepoItem>;
	loading: boolean;
}

/**
 * Renders grid of language repos using passed in data
 *
 * @class      Grid
 */
class Grid extends React.Component<GridProps, GridState> {
	constructor(props: GridProps) {
		super(props);

		let repos;
		if (__isBrowser__) {
			repos = window.__INITIAL_DATA__;
			delete window.__INITIAL_DATA__;
		} else {
			repos = this.props.staticContext.data;
		}

		this.state = {
			repos,
			loading: repos ? false : true,
		};
	}

	componentDidMount = (): void => {
		if (!this.state.repos) {
			this.fetchRepos(this.props.match.params.id);
		}
	};

	componentDidUpdate = (prevProps: GridProps): void => {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchRepos(this.props.match.params.id);
		}
	};

	fetchRepos = (lang: string): void => {
		this.setState(() => ({
			loading: true,
		}));

		this.props.fetchInitialData(lang).then((repos: Array<GitHubRepoItem>) =>
			this.setState(() => ({
				repos,
				loading: false,
			}))
		);
	};

	render(): JSX.Element {
		const { loading, repos } = this.state;

		if (loading === true) {
			return <p>LOADING</p>;
		}

		return (
			<ul style={{ display: 'flex', flexWrap: 'wrap' }}>
				{repos.map(({ name, owner, stargazers_count, html_url }) => (
					<li key={name} style={{ margin: 30 }}>
						<ul>
							<li>
								<a href={html_url}>{name}</a>
							</li>
							<li>@{owner.login}</li>
							<li>{stargazers_count} stars</li>
						</ul>
					</li>
				))}
			</ul>
		);
	}
}

export default Grid;
