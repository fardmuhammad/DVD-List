import type { RootState } from "../../_store/store";
import { useSelector, useDispatch } from 'react-redux';
import { initialize } from './listSlice';
import { INbcListObject } from "../../_store/types";
import { useEffect } from "react";

export function ListLoader() {
    const dispatch = useDispatch();

    useEffect(() => {
        const getNbcData = async() => {
            console.log('getting nbc data');
            const response = await fetch('/json/nbc.json');
            const jsonResults = await response.json();
            dispatch(initialize(jsonResults as INbcListObject[]))
        }
    
        getNbcData();
    }, []);

    return(<></>);
}
