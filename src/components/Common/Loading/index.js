import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
	return (
		<LoadingContainer>
			<LoadingIcon />
			<p>Loading</p>
		</LoadingContainer>
	);
};

const LoadingContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 50vh;
`;

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
	animation: ${rotate} 1s linear infinite;
	font-size: 40px;
	margin-bottom: 20px;
`;

export default Loading;
