import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { RootState } from './_store/store';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from './features/list/listSlice';
import Navbar from './components/NavBar/Navbar';
import Home from './pages/home';
import Details from './pages/details';
import MainList from './pages/mainList';
import { INbcListObject } from './_store/types';
import { styled } from 'styled-components';
import './App.css';

type LoadingStates = 'loading' | 'loaded' | 'fail';

const SCLoadingTitle = styled.div``;
const SCErrorTitle = styled.div``;
const SCPageContainer = styled.div`
	margin-top: 80px;
	height: calc(100vh - 80px);
	overflow-y: scroll;
	background-color: lightgray;
`;

/* This is where the magic happens. */
const App = () => {
	const dispatch = useDispatch();
	const [loadingState, setLoadingState] = useState<LoadingStates>('loading');
	const nbcList = useSelector<RootState, INbcListObject[] | null>(
		(state) => state.lists.nbcMainList,
	);

	/* On load, get the NBC data in the `./json/nbc.json' file
	 * Oh, and don't think I didn't notice the 'Law &amp; Order' when loading in the JSON.
	 * The DOMParser fixes that. */
	useEffect(() => {
		const getNbcData = async () => {
			try {
				setLoadingState('loading');
				const response = await fetch('/json/nbc.json');
				const json = await response.json();
				const doc = new DOMParser().parseFromString(JSON.stringify(json), 'text/html');
				const unescapedString = doc.documentElement.textContent || '';
				const { items } = JSON.parse(unescapedString);
				dispatch(initialize({ newList: items as INbcListObject[] }));
			} catch (e) {
				setLoadingState('fail');
			}
		};

		getNbcData();
	}, []);

	useEffect(() => {
		if (nbcList !== null) {
			setLoadingState('loaded');
		} else {
			setLoadingState('loading');
		}
	}, [nbcList]);

	const homePageContents = (): React.ReactNode => {
		let homePageContentElement: React.ReactNode;

		switch (loadingState) {
			case 'fail':
				/* If the load fails somehow, we can't move on. */
				homePageContentElement = (
					<SCErrorTitle id="LoadFailError">
						<h1>List not available.</h1>
					</SCErrorTitle>
				);
				break;
			case 'loaded':
				/* If it's loaded, we're on our way. */
				homePageContentElement = (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/details/:id" element={<Details />} />
						<Route path="/list" element={<MainList />} />
					</Routes>
				);
				break;
			default:
				/* If it's loading, let the user know it's being loaded. */
				homePageContentElement = (
					<SCLoadingTitle id="LoadingText">
						<h1>Loading...</h1>
					</SCLoadingTitle>
				);
		}
		return homePageContentElement;
	};

	/* Let's ROCK THIS JOINT */
	return (
		<>
			<Navbar />
			<SCPageContainer id="pageContainer" className="pageContainer">
				{homePageContents()}
			</SCPageContainer>
		</>
	);
};

export default App;
