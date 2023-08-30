import { ORGANIZATION, REPOSITORY } from '../../../api/issue';

// import styles from './header.module.scss';

const Header = () => {
	return (
		<header>
			{ORGANIZATION}/{REPOSITORY}
		</header>
	);
};

export default Header;
