import { styled } from 'styled-components';

const textColor = '#121212';

export const SCHomeTitle = styled.div`
	text-align: center;
	font-size: 28px;
	font-weight: bold;
	margin: 15px auto 0;
`;

export const SCFeaturedTitlesContainer = styled.div`
	margin: 60px auto 60px;
	display: flex;
	flex-wrap: nowrap;
	overflow: hidden;
	flex-direction: row;
	background-color: #f1f1f1;
	width: 300px;
	height: 402px;
`;

export const SCFeaturedTitle = styled.div`
	position: relative;
	& > a {
		cursor: zoom-in;
	}
`;

export const SCFeaturedTitleImageContainer = styled.div``;

export const SCFeaturedTitleImage = styled.img`
	width: 300px;
`;

export const SCFeaturedTitleName = styled.div`
	text-align: right;
	font-weight: normal;
	position: absolute;
	width: calc(100% - 25px);
	right: 0;
	padding: 5px 20px 5px 5px;
	bottom: 20px;
	background-color: rgba(0, 0, 0, 0.45);
	text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.45);
	color: #fbfbfb;
`;

export const SCDetailsContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

export const SCDetailsImageContainer = styled.div`
	width: 850px;
	height: 1133px;
	border: 1px solid #121212;
	margin: 60px auto;
`;

export const SCDetailsImage = styled.img`
	width: 850px;
	box-sizing: border-box;
`;

export const SCDetailsCaption = styled.div`
	margin: 0 auto;
	font-size: 28px;
	font-weight: bold;
	color: ${textColor};
	margin: 15px auto 0;
`;

export const SCErrorMessage = styled.div`
	font-weight: bold;
	color: darkred;
	font-size: 18px;
	margin: 30px auto;
	text-align: center;
	& > h1 {
		color: darkred;
		font-size: 32px;
	}
	& > h2 {
		color: #220000;
		font-size: 20px;
	}
`;

export const SCMainList = styled.div`
	margin-bottom: 60px;
`;

export const SCDisplayListTable = styled.div`
	display: flex;
	margin-left: auto;
	flex-direction: column;
`;

export const SCDisplayListBody = styled.div<{ $isAdmin: boolean }>`
	display: grid;
	grid-template-columns: ${(props) =>
		props.$isAdmin ? `140px 360px 200px 100px 100px` : `140px 460px 200px 100px`};
	border: 1px solid #121212;
`;

export const SCDisplayListCell = styled.div`
	box-sizing: border-box;
	border: 1px solid #121212;
	height: 155px;
	overflow: hidden;
	font-size: 18px;
	&.image {
		padding: 10px;
	}
	&.featured {
		padding: 60px 27px;
	}
	&.text {
		padding: 60px 10px;
	}
`;

export const SCDisplayListImage = styled.img`
	margin: 0px 10px;
	border: 1px solid #121212;
`;

export const SCDisplayListCellText = styled.div`
	display: block;
	margin: auto;
`;

export const SCDisplayListDeleteCell = styled.div`
	background-color: #cc9999;
	box-sizing: border-box;
	border: 1px solid #121212;
	padding: 51px 27px;
`;

export const SCDisplayListDeleteCellButton = styled.button`
	background-color: transparent;
	border: none;
	font-size: 24px;
	cursor: pointer;
	box-sizing: border-box;
`;

export const SCDisplayListHeader = styled.div`
	box-sizing: border-box;
	border: 1px solid #121212;
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: center;
	font-weight: bold;
	color: #fbfbfb;
	background-color: #888899;
`;

export const SCDisplayListDeleteHeader = styled.div`
	padding-top: 5px;
	padding-bottom: 5px;
	text-align: center;
	font-weight: bold;
	color: #fbfbfb;
	background-color: #cc0000;
	box-sizing: border-box;
	border: 1px solid #121212;
`;

export const SCDisplayListSelection = styled.select`
	width: 250px;
	margin-right: 15px;
	font-size: 20px;
`;

export const SCDisplayListControls = styled.div<{ $isAdmin: boolean }>`
	margin: 15px ${(props) => (props.$isAdmin ? ` 95px ` : `185px`)} 10px;
`;

export const SCDisplayListControl = styled.div`
	display: inline;
`;

export const SCDisplayListMain = styled.div`
	width: 900px;
	margin: 0 auto;
`;

export const SCDisplayListAddTitleButton = styled.button`
	font-size: 20px;
`;
