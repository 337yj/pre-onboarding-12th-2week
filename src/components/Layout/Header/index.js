import { ORGANIZATION, REPOSITORY } from '../../../api/issue';
import styled, { keyframes } from 'styled-components';

const Header = () => {
	return (
		<CenteredContainer>
			<HeaderContainer>
				{ORGANIZATION} / {REPOSITORY}
			</HeaderContainer>
		</CenteredContainer>
	);
};

const CenteredContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 16vh;
`;

const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 30px;
	font-weight: bold;
`;

export default Header;
