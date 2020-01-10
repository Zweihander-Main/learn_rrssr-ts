import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import routes, { Route } from '../shared/routes';
import { GitHubRepoItem } from '../shared/api';

export interface ServerContext extends StaticRouterContext {
	data?: Array<GitHubRepoItem>;
}

const app = express();

app.use(cors());
app.use(express.static('public'));

/**
 * Render router and app
 */
app.get('*', (req, res, next) => {
	const activeRoute = routes.find((route: Route) =>
		matchPath(req.url, route.path)
	);

	if (!activeRoute) {
		return null;
	}

	const promise: Promise<void | Array<
		GitHubRepoItem
	>> = activeRoute.fetchInitialData
		? activeRoute.fetchInitialData(req.path)
		: Promise.resolve();

	promise
		.then((data: void | Array<GitHubRepoItem>) => {
			const context: ServerContext = { data } as ServerContext;

			const markup = renderToString(
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			);

			res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `);
		})
		.catch(next);
});

let port = process.env.PORT;
if (!port || port === null || port === '') {
	port = '3000';
}

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`Server is listening on port: ${port}`);
});
