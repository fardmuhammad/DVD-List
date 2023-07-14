import { createSlice } from '@reduxjs/toolkit';
import { INbcObject, INbcListObject } from '../../_store/types';

export interface nbcState {
    nbcList: INbcListObject[],
}
// Initial state value: an empty string of NBC List Objects
const initialState: nbcState = {
    nbcList: [],
};

// Each of the action objects will have a type, so this will be the base for the action payloads.
interface NbcActionObject {
    type: string,
}

// Adding an title will include a user-created NBC Object (minus an id, which will be created here).
interface NbcAddActionObject extends NbcActionObject {
    payload: INbcObject,
}

// Removing a title will include an id number of the existing object.
interface NbcRemoveActionObject extends NbcActionObject {
    payload: number,
}

// This will load the initial objects from the JSON
interface NbcInitializeActionObject extends NbcActionObject {
    payload: INbcListObject[],
}

// Maximum number of items in the list...
// and an ID generator choosing from 100x the number of items to decrease repeats.

const MAX_ITEMS = 1024;
const randomGenerator = () => Math.ceil(Math.random() * MAX_ITEMS * 100);

export const listSlice = createSlice({
    name: 'masterList',
    initialState,
    reducers: {

        // Adding a title. If there are already MAX_ITEMS in the array, then politely fail
        // and tell the user that no more can be added.
        addTitle: (state, action: NbcAddActionObject) => {
            if (state.nbcList.length >= MAX_ITEMS) {
                alert(`Sorry, no more than ${MAX_ITEMS} titles please.`);
                return state;
            }
            // If there is still room, create a new id that's not already in the array.
            let id = randomGenerator()
            while (state.nbcList.findIndex(item => item.id === id) !== -1) {
                id = randomGenerator();
            }

            // Create the new NBC List object, and add the user information in with the new id.
            const newNbcItem: INbcListObject = {
                id,
                ...action.payload,
            }
            state.nbcList.push(newNbcItem);
        },

        // We just need the id number for this one.
        removeTitle: (state, action: NbcRemoveActionObject) => {
            // This shouldn't happen, but if the array is empty, let the user know there's nothing to delete.
            if (state.nbcList.length <= 0) {
                alert(`Sorry, there are no more items to remove.`);
                return state;
            }
            
            // Find the index of the item with that particular id.
            const idIndex = state.nbcList.findIndex(item => item.id === action.payload);
            
            // If there are no items with that id, then tell the user it's not available to be removed.
            if (idIndex === -1) {
                alert('That\'s odd. That item is not available to be removed.')
                return state;
            }

            // Otherwise, "delete the wife".
            state.nbcList.splice(idIndex, 1);
        },

        // Clear the list (may not be needed)
        clear: (state) => {
            state.nbcList = [];
        },

        initialize: (state, action: NbcInitializeActionObject) => {
            state.nbcList = [...action.payload];
        }
    },
});

export const {addTitle, removeTitle, clear, initialize} = listSlice.actions;

export default listSlice.reducer;
