import * as React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Render Nav Menu
 *
 * @class      Navbar
 * @return     {JSX.Element}
 */
const Navbar: React.FC = (): JSX.Element => {
	const languages = [
		{
			name: 'All',
			param: 'all',
		},
		{
			name: 'JavaScript',
			param: 'javascript',
		},
		{
			name: 'Ruby',
			param: 'ruby',
		},
		{
			name: 'Python',
			param: 'python',
		},
		{
			name: 'Java',
			param: 'java',
		},
	];

	return (
		<ul>
			{languages.map(({ name, param }) => (
				<li key={param}>
					<NavLink
						activeStyle={{ fontWeight: 'bold' }}
						to={`/popular/${param}`}
					>
						{name}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default Navbar;
