import { styled } from 'styled-components';

export const SCNavBar = styled.nav`
	position: fixed;
	left: 0;
	top: 0;
	padding: 10px;
	width: calc(100% - 20px);
	height: 60px;
	background-color: skyblue;
`;

export const SCNavBarLinks = styled.div`
	margin: auto;
	text-align: center;
	& > a {
		text-decoration: none;
		cursor: pointer;
		font-size: 36px;
		color: #121212;
	}
	& > a:not(:last-child) {
		margin-right: 40px;
	}
`;
