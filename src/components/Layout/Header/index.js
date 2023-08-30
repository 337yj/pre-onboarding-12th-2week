import { ORGANIZATION, REPOSITORY } from '../../../api/issue';

const Header = () => {
	return (
		<header>
			{ORGANIZATION}/{REPOSITORY}
		</header>
	);
};

export default Header;
