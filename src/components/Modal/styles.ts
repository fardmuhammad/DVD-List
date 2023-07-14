import { styled } from 'styled-components';

export const SCModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
	background-color: rgba(0, 0, 0, 0.64);
`;

export const SCModal = styled.div`
	position: fixed;
	top: 20vh;
	left: 20%;
	width: 60%;
	background-color: #fbfbfb;
	padding: 1rem;
	border-radius: 14px;
	z-index: 120;
	animation: slide-down 200ms ease-out forwards;

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-3rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
`;

export const SCModalMainContentSection = styled.div`
	width: 600px;
	margin: auto;
`;

export const SCModalForm = styled.div`
	width: 600px;
	margin: auto;
	font-size: 18px;
`;

export const SCModalTitleSection = styled.div`
	text-align: center;
`;

export const SCModalButtonSection = styled.ul``;

export const SCModalButtonWrapper = styled.li``;

export const SCModalButton = styled.button``;

export const SCModalCloseButton = styled.button`
	border: none;
	background-color: transparent;
	font-size: 18px;
	cursor: pointer;
`;

export const SCModalFormInputSection = styled.div`
	margin-bottom: 15px;
`;

export const SCModalFormButtonSection = styled.div`
	margin: 15px 175px 10px;
	width: 600px;
	& > button {
		font-size: 18px;
		margin-right: 25px;
		color: #fbfbfb;
		background-color: #cc0000;
		border: none;
		height: 30px;
		border-radius: 5px;
		cursor: pointer;
		&.confirm {
			background-color: #009900;
		}
	}
	& > input {
		font-size: 18px;
		color: #fbfbfb;
		background: #009900;
		border: none;
		height: 30px;
		border-radius: 5px;
		cursor: pointer;
	}
`;

export const SCModalFormInputLabel = styled.label`
	display: block;
	&.sameLine {
		margin-right: 15px;
		display: inline;
	}
`;

export const SCModalFormInput = styled.input`
	font-size: 18px;
	width: 300px;
	&.sameLine {
		display: inline;
	}
	&.short {
		width: auto;
	}
`;

export const SCModalFormSelect = styled.select`
	font-size: 18px;
`;

export const SCModalFormSelectOption = styled.option``;
