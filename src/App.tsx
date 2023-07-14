import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { RootState } from './_store/store';
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from './features/list/listSlice';
import Navbar from './components/Navbar';
import Home from './pages/home';
import MainList from './pages/mainList';
import { INbcListObject } from './_store/types';

const App = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getNbcData = async() => {
            console.log('getting nbc data');
            const response = await fetch('/json/nbc.json');
            const jsonResults = await response.json();
            dispatch(initialize(jsonResults as INbcListObject[]));
            setIsLoading(false);
        }
    
        getNbcData();
    }, []);

    return (
        <>
        <Navbar />
        <div id='pageContainer' className='pageContainer'>
            {isLoading && <h1>Loading...</h1>}
            {!isLoading && (
                <Routes>
                    <Route path='/' element={<Home />} />
                    {/* <Route path='/details' element={<h1>Details Page</h1>} /> */}
                    <Route path='/list' element={<MainList />} />
                </Routes>
            )}
        </div>
        </>
    );
}

export default App;
