import { styled } from 'styled-components';

export const SCCarouselContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid #888888;
	box-sizing: border-box;
	& > * {
		box-sizing: border-box;
	}
`;

export const SCCarouselWrapper = styled.div`
	display: flex;
	width: 100%;
	position: relative;
`;

export const SCCarouselButton = styled.button`
	position: absolute;
	z-index: 10;
	top: 50%;
	height: 90%;
	transform: translateY(-50%);
	background-color: transparent;
	border: none;
	&.leftButton {
		left: 0;
	}
	&.rightButton {
		right: 0;
	}
	cursor: pointer;
`;

export const SCCarouselButtonGraphic = styled.div`
	padding: 0;
	margin: 0;
	left: 0;
	top: 0;
	width: 42px;
	height: 42px;
	font-size: 30px;
`;

export const SCCarouselContentWrapper = styled.div`
	overflow: hidden;
	width: 100%;
`;

export const SCCarouselContent = styled.div<{ $currentidx: number }>`
	display: flex;
	transition: all 250ms linear;
	-ms-overflow-style: none;
	scrollbar-width: none;
	transform: translateX(-${(props) => props.$currentidx * 100}%);
	&::-webkit-scrollbar {
		display: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	& > * {
		width: 100%;
		flex-shrink: 0;
		flex-grow: 1;
	}
`;
