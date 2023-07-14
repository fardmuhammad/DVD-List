import { createSlice } from '@reduxjs/toolkit';
import { INbcUserObject, INbcListObject, ETitleCategory, ESortOption } from '../../_store/types';

/* State structure for Redux Store */
export interface nbcState {
	nbcMainList: INbcListObject[] | null;
	nbcDisplayList: INbcListObject[] | null;
	availableFilters: ETitleCategory[];
	currentFilter: ETitleCategory;
	currentSort: ESortOption;
}

/* Initial state value: an empty string of NBC List Objects */
const initialState: nbcState = {
	nbcMainList: null,
	nbcDisplayList: null,
	availableFilters: [],
	currentFilter: ETitleCategory.all,
	currentSort: ESortOption.titleAscending,
};

/* Each of the action objects will have a type, so this will be the base for the action payloads. */
interface INbcActionObject {
	type: string;
}

/* Adding a title to the main list will include a user-created NBC Object (minus an id, which will be created here)
 * and the filters/sort will not be used so it shows at the top of the list. */
interface INbcAddActionObject extends INbcActionObject {
	payload: {
		newUserObject: INbcUserObject;
	};
}

/* This action will delete the object given by its ID. */
interface INbcRemoveActionObject extends INbcActionObject {
	payload: {
		removeId: number;
	};
}

/* This action will load the initial objects from the JSON and set the main/display lists */
interface INbcInitializeActionObject extends INbcActionObject {
	payload: {
		newList: INbcListObject[];
	};
}

/* This action will set the current filter for the display list. */
interface INbcFilterActionObject extends INbcActionObject {
	payload: {
		newFilter: ETitleCategory;
	};
}

/* This action will sort the display list */
interface INbcSortActionObject extends INbcActionObject {
	payload: {
		sortOption: ESortOption;
	};
}

/* Maximum number of items in the list...
 * and an ID generator choosing from 100x the number of items to decrease repeats. */

const MAX_ITEMS = 1024;
const randomGenerator = () => Math.ceil(Math.random() * MAX_ITEMS * 100);

/*  */
/**
 * Get the filters currently available in the list object. Called when the main list changes.
 * @param nbcList - The main list of NBC List objects
 * @returns An array of unique filters for all the list objects (sorted in alphabetical order)
 */
const getFilters = (nbcList: INbcListObject[]) => {
	return Array.from(new Set(nbcList.map((item) => item.category as ETitleCategory))).sort();
};

/**
 * List sort function.
 * @param nbcList The Display list of Objects
 * @param sortOption The Option (encoded in the ESortOption Object)
 * @returns A sorted version of the list according to the option selected.
 */
const sortList = (nbcList: INbcListObject[], sortOption: ESortOption): INbcListObject[] => {
	const sortValue = Number(sortOption.charAt(1));
	const ascend: boolean = sortValue % 2 === 0;
	const byTitle: boolean = sortValue < 2;
	const sortedList = [...nbcList];
	sortedList.sort((item1, item2) => {
		const prop = byTitle ? 'name' : 'category';
		if (item1[prop] < item2[prop]) {
			return ascend ? -1 : 1;
		}
		if (item1[prop] > item2[prop]) {
			return ascend ? 1 : -1;
		}
		return 0;
	});
	return sortedList;
};

/**
 * The Redux Slice.
 */
export const listSlice = createSlice({
	name: 'masterList',
	initialState,
	reducers: {
		/* Setting the lists. */
		initialize: (state, action: INbcInitializeActionObject) => {
			const {
				payload: { newList },
			} = action;
			state.nbcMainList = [...newList];
			state.nbcDisplayList = sortList([...newList], state.currentSort);
			state.availableFilters = getFilters(state.nbcMainList);
		},

		/* Adding a title. If there are already MAX_ITEMS in the array, then politely fail
		 * and tell the user that no more can be added. */
		addMainTitle: (state, action: INbcAddActionObject) => {
			const {
				payload: { newUserObject },
			} = action;
			if (state.nbcMainList && state.nbcDisplayList) {
				if (state.nbcMainList.length >= MAX_ITEMS) {
					alert(`Sorry, no more than ${MAX_ITEMS} titles please.`);
					return;
				}
				/* If there is still room, create a new id that's not already in the array. */
				const id = randomGenerator();

				/* Create the new NBC List object, and add the user information in with the new id. */
				const newNbcItem: INbcListObject = {
					id,
					...newUserObject,
				};

				/* This is odd section. We want to add it to the top of the list, but what if
				 * the item isn't a part of the current filter (a drama in a field of comedies?)
				 * My solution is to reset the display list to show all titles in alphabetical ascending order
				 * And then place the new title on top. */

				/* So we reset the filter and sort, which should set the values in the main list page dropdowns. */
				state.currentFilter = ETitleCategory.all;
				state.currentSort = ESortOption.titleAscending;

				/* Next, we get the main list and sort it by title ascending. */
				state.nbcDisplayList = sortList([...state.nbcMainList], ESortOption.titleAscending);

				/* Then we add it to BOTH lists to maintain fidelity. */
				state.nbcMainList.unshift(newNbcItem);
				state.nbcDisplayList.unshift(newNbcItem);

				/* Then we check for any new filters from the new title. */
				state.availableFilters = getFilters(state.nbcMainList);
			} else {
				alert('The list is unavailable. Please check your connection');
			}
		},

		/**
		 * Removing the title from the master list.
		 * @param state Current state
		 * @param action The Remove Action Object
		 * @returns void
		 */
		removeTitle: (state, action: INbcRemoveActionObject) => {
			const {
				payload: { removeId },
			} = action;
			if (state.nbcMainList && state.nbcDisplayList) {
				/* This shouldn't happen, since an empty list should nave no delete buttons,
				 * but if the array is empty, let the user know there's nothing to delete. */
				if (state.nbcMainList.length <= 0) {
					alert(`Sorry, there are no more items to remove.`);
					return;
				}

				/* If the display is empty (which would be impossible since the button wouldn't be there)
				 * Tell them and do nothing. */
				if (state.nbcDisplayList.length <= 0) {
					alert(`You've selected an item that's not displayed.`);
					return;
				}

				const mainRemoveIndex = state.nbcMainList.findIndex(
					(nbcItem) => nbcItem.id === removeId,
				);
				const dispRemoveIndex = state.nbcDisplayList.findIndex(
					(nbcItem) => nbcItem.id === removeId,
				);

				/* If there are no items with that id, then tell the user it's not available to be removed. */
				if (mainRemoveIndex === -1) {
					alert("That's odd. That item is not available to be removed.");
					return;
				}

				/* Otherwise, "delete the wife". */
				state.nbcMainList.splice(mainRemoveIndex, 1);

				/* If the display doesn't have it (which would be impossible since the button wouldn't be there)
				 * fail softly. */

				if (dispRemoveIndex !== -1) state.nbcDisplayList.splice(dispRemoveIndex, 1);

				/* We don't need to reset sort or active filters, but we do need to adjust the available ones. */
				state.availableFilters = getFilters(state.nbcMainList);
			} else {
				/* If either list is null, fail. */
				alert('The list is unavailable. Please check your connection');
				return;
			}
		},

		/**
		 * Filter the display list.
		 * Since the filter list is constantly updating, this should not result in empty lists... theoretically.
		 * @param state current state
		 * @param action The Filter Action Object
		 * @returns void
		 */
		filterDisplayList: (state, action: INbcFilterActionObject) => {
			const {
				payload: { newFilter },
			} = action;

			if (state.nbcMainList && state.nbcMainList.length) {
				const tempMaster = [...state.nbcMainList];
				const filteredList =
					newFilter === 'all'
						? [...tempMaster]
						: tempMaster.filter((item) => item.category === newFilter);
				state.nbcDisplayList = sortList([...filteredList], state.currentSort);
				state.currentFilter = newFilter;
			} else {
				/* If the master list doesn't exist or is empty, there's nothing to filter. */
				alert(
					state.nbcMainList !== null
						? 'The list is empty. Nothing to filter'
						: 'The list is unavailable',
				);
				return;
			}
		},

		/**
		 * Sorts the display list (without adding or subtracting).
		 * @param state Current State
		 * @param action The Sort Action Object
		 */
		sortDisplayList: (state, action: INbcSortActionObject) => {
			if (state.nbcDisplayList && state.nbcDisplayList.length) {
				const {
					payload: { sortOption },
				} = action;
				state.currentSort = sortOption;
				state.nbcDisplayList = sortList([...state.nbcDisplayList], sortOption);
			}
		},
	},
});

export const { addMainTitle, removeTitle, initialize, filterDisplayList, sortDisplayList } =
	listSlice.actions;

export default listSlice.reducer;
