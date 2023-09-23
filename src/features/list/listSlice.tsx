import { createSlice } from "@reduxjs/toolkit";
import {
  IDvdUserObject,
  IDvdListObject,
  ETitleCategory,
  ESortOption,
} from "../../_store/types";

/* State structure for Redux Store */
export interface dvdState {
  dvdMainList: IDvdListObject[] | null;
  dvdDisplayList: IDvdListObject[] | null;
  availableFilters: ETitleCategory[];
  currentFilter: ETitleCategory;
  currentSort: ESortOption;
}

/* Initial state value: an empty string of DVD List Objects */
const initialState: dvdState = {
  dvdMainList: null,
  dvdDisplayList: null,
  availableFilters: [],
  currentFilter: ETitleCategory.all,
  currentSort: ESortOption.titleAscending,
};

/* Each of the action objects will have a type, so this will be the base for the action payloads. */
interface IDvdActionObject {
  type: string;
}

/* Adding a title to the main list will include a user-created DVD Object (minus an id, which will be created here)
 * and the filters/sort will not be used so it shows at the top of the list. */
interface IDvdAddActionObject extends IDvdActionObject {
  payload: {
    newUserObject: IDvdUserObject;
  };
}

/* This action will delete the object given by its ID. */
interface IDvdRemoveActionObject extends IDvdActionObject {
  payload: {
    removeId: number;
  };
}

/* This action will load the initial objects from the JSON and set the main/display lists */
interface IDvdInitializeActionObject extends IDvdActionObject {
  payload: {
    newList: IDvdListObject[];
  };
}

/* This action will set the current filter for the display list. */
interface IDvdFilterActionObject extends IDvdActionObject {
  payload: {
    newFilter: ETitleCategory;
  };
}

/* This action will sort the display list */
interface IDvdSortActionObject extends IDvdActionObject {
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
 * @param dvdList - The main list of DVD List objects
 * @returns An array of unique filters for all the list objects (sorted in alphabetical order)
 */
const getFilters = (dvdList: IDvdListObject[]) => {
  return Array.from(
    new Set(dvdList.map((item) => item.category as ETitleCategory))
  ).sort();
};

/**
 * List sort function.
 * @param dvdList The Display list of Objects
 * @param sortOption The Option (encoded in the ESortOption Object)
 * @returns A sorted version of the list according to the option selected.
 */
const sortList = (
  dvdList: IDvdListObject[],
  sortOption: ESortOption
): IDvdListObject[] => {
  const sortValue = Number(sortOption.charAt(1));
  const ascend: boolean = sortValue % 2 === 0;
  const byTitle: boolean = sortValue < 2;
  const sortedList = [...dvdList];
  sortedList.sort((item1, item2) => {
    const prop = byTitle ? "name" : "category";
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
  name: "masterList",
  initialState,
  reducers: {
    /* Setting the lists. */
    initialize: (state, action: IDvdInitializeActionObject) => {
      const {
        payload: { newList },
      } = action;
      state.dvdMainList = [...newList];
      state.dvdDisplayList = sortList([...newList], state.currentSort);
      state.availableFilters = getFilters(state.dvdMainList);
    },

    /* Adding a title. If there are already MAX_ITEMS in the array, then politely fail
     * and tell the user that no more can be added. */
    addMainTitle: (state, action: IDvdAddActionObject) => {
      const {
        payload: { newUserObject },
      } = action;
      if (state.dvdMainList && state.dvdDisplayList) {
        if (state.dvdMainList.length >= MAX_ITEMS) {
          alert(`Sorry, no more than ${MAX_ITEMS} titles please.`);
          return;
        }
        /* If there is still room, create a new id that's not already in the array. */
        const id = randomGenerator();

        /* Create the new DVD List object, and add the user information in with the new id. */
        const newDvdItem: IDvdListObject = {
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
        state.dvdDisplayList = sortList(
          [...state.dvdMainList],
          ESortOption.titleAscending
        );

        /* Then we add it to BOTH lists to maintain fidelity. */
        state.dvdMainList.unshift(newDvdItem);
        state.dvdDisplayList.unshift(newDvdItem);

        /* Then we check for any new filters from the new title. */
        state.availableFilters = getFilters(state.dvdMainList);
      } else {
        alert("The list is unavailable. Please check your connection");
      }
    },

    /**
     * Removing the title from the master list.
     * @param state Current state
     * @param action The Remove Action Object
     * @returns void
     */
    removeTitle: (state, action: IDvdRemoveActionObject) => {
      const {
        payload: { removeId },
      } = action;
      if (state.dvdMainList && state.dvdDisplayList) {
        /* This shouldn't happen, since an empty list should nave no delete buttons,
         * but if the array is empty, let the user know there's nothing to delete. */
        if (state.dvdMainList.length <= 0) {
          alert(`Sorry, there are no more items to remove.`);
          return;
        }

        /* If the display is empty (which would be impossible since the button wouldn't be there)
         * Tell them and do nothing. */
        if (state.dvdDisplayList.length <= 0) {
          alert(`You've selected an item that's not displayed.`);
          return;
        }

        const mainRemoveIndex = state.dvdMainList.findIndex(
          (dvdItem) => dvdItem.id === removeId
        );
        const dispRemoveIndex = state.dvdDisplayList.findIndex(
          (dvdItem) => dvdItem.id === removeId
        );

        /* If there are no items with that id, then tell the user it's not available to be removed. */
        if (mainRemoveIndex === -1) {
          alert("That's odd. That item is not available to be removed.");
          return;
        }

        /* Otherwise, "delete the wife". */
        state.dvdMainList.splice(mainRemoveIndex, 1);

        /* If the display doesn't have it (which would be impossible since the button wouldn't be there)
         * fail softly. */

        if (dispRemoveIndex !== -1)
          state.dvdDisplayList.splice(dispRemoveIndex, 1);

        /* We don't need to reset sort or active filters, but we do need to adjust the available ones. */
        state.availableFilters = getFilters(state.dvdMainList);
      } else {
        /* If either list is null, fail. */
        alert("The list is unavailable. Please check your connection");
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
    filterDisplayList: (state, action: IDvdFilterActionObject) => {
      const {
        payload: { newFilter },
      } = action;

      if (state.dvdMainList && state.dvdMainList.length) {
        const tempMaster = [...state.dvdMainList];
        const filteredList =
          newFilter === "all"
            ? [...tempMaster]
            : tempMaster.filter((item) => item.category === newFilter);
        state.dvdDisplayList = sortList([...filteredList], state.currentSort);
        state.currentFilter = newFilter;
      } else {
        /* If the master list doesn't exist or is empty, there's nothing to filter. */
        alert(
          state.dvdMainList !== null
            ? "The list is empty. Nothing to filter"
            : "The list is unavailable"
        );
        return;
      }
    },

    /**
     * Sorts the display list (without adding or subtracting).
     * @param state Current State
     * @param action The Sort Action Object
     */
    sortDisplayList: (state, action: IDvdSortActionObject) => {
      if (state.dvdDisplayList && state.dvdDisplayList.length) {
        const {
          payload: { sortOption },
        } = action;
        state.currentSort = sortOption;
        state.dvdDisplayList = sortList([...state.dvdDisplayList], sortOption);
      }
    },
  },
});

export const {
  addMainTitle,
  removeTitle,
  initialize,
  filterDisplayList,
  sortDisplayList,
} = listSlice.actions;

export default listSlice.reducer;
