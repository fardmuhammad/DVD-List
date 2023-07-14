import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const MainList = () => {


    const [isAdmin, setIsAdmin] = useState(false);
    
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const adminVal = searchParams.get('admin') === 'true';
        setIsAdmin(adminVal);    
    }, [searchParams]);
    
    
    return (
        <>
        <h1>This is the main list page!</h1>
        {isAdmin && (<h2>The admin section is active</h2>)}
        </>
    )
}

export default MainList;
