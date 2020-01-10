import * as React from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import NoMatch from './NoMatch';
import { ServerContext } from '../server/index';

export interface AppProps {
	staticContext?: ServerContext;
}

/**
 * Takes in routes object and renders given component
 *
 * @class      App
 */
class App extends React.Component<AppProps> {
	render(): JSX.Element {
		return (
			<div>
				<Navbar />

				<Switch>
					{routes.map(
						({ path, exact, component: Component, ...rest }) => (
							<Route
								key={path}
								path={path}
								exact={exact}
								render={(props: AppProps): JSX.Element => (
									<Component {...props} {...rest} />
								)}
							/>
						)
					)}
					<Route render={(): JSX.Element => <NoMatch />} />
				</Switch>
			</div>
		);
	}
}

export default App;
