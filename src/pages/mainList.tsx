import { useEffect, useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	addMainTitle,
	removeTitle,
	filterDisplayList,
	dvdState,
	sortDisplayList,
} from '../features/list/listSlice';
import {
	SCDisplayListTable,
	SCDisplayListHeader,
	SCDisplayListDeleteHeader,
	SCDisplayListBody,
	SCDisplayListCell,
	SCDisplayListCellText,
	SCDisplayListImage,
	SCDisplayListDeleteCell,
	SCMainList,
	SCErrorMessage,
	SCHomeTitle,
	SCDisplayListAddTitleButton,
	SCDisplayListSelection,
	SCDisplayListControls,
	SCDisplayListControl,
	SCDisplayListMain,
	SCDisplayListDeleteCellButton,
} from './styles';
import { RootState } from '../_store/store';
import {
	ETitleCategory,
	TitleDisplayCategories,
	ESortOption,
	DisplaySortOptions,
} from '../_store/types';
import { fallbackImg } from '../utils/types';
import Emoji from '../utils/emoji';
import { DeleteConfirmation } from '../components/Modal/DeleteConfirmation';
import { AddNewTitleFormModal } from '../components/Modal/AddNewTitleForm';

/* The main list. This is gonna be fun. Both the regular and Admin Mode versions are here */
const MainList = () => {
	/* Admin mode toggle */
	const [isAdmin, setIsAdmin] = useState(false);

	/* Selected title ID for confirm deletion modal (a little bonus) */
	const [selectedId, setSelectedId] = useState(-1);

	/* Show modal toggles */
	const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
	const [showAddFormModal, setShowAddFormModal] = useState(false);

	/* URL Params to detect Admin Mode */
	const [searchParams] = useSearchParams();

	/* Reduxy Goodness */
	const dispatch = useDispatch();

	/* Close button handler for Confirm Delete Modal */
	const closeConfirmModal = () => {
		setShowDeleteConfirmModal(false);
	};

	/* Close button for Add Title Modal */
	const closeAddFormModal = () => {
		setShowAddFormModal(false);
	};

	/* Confirm button handler for Delete Modal */
	const deleteConfirmHandler = () => {
		dispatch(removeTitle({ removeId: selectedId }));
		setSelectedId(-1);
	};

	/* Add Form Submit Handler for adding new title to the Redux Store */
	const addNewFormHandler = (name: string, category: ETitleCategory, featured: boolean) => {
		dispatch(
			addMainTitle({
				newUserObject: {
					name,
					category,
					featured,
					image: fallbackImg,
				},
			}),
		);
		closeAddFormModal();
	};

	/* Be on the lookout for the url params */
	useEffect(() => {
		const adminVal = searchParams.get('admin') === 'true';
		setIsAdmin(adminVal);
	}, [searchParams]);

	/* We're gonna need all of these to handle the Redux lists */
	const {
		dvdDisplayList: displayList,
		currentFilter,
		availableFilters,
		currentSort,
		dvdMainList,
	} = useSelector<RootState, dvdState>((state) => state.lists);

	/* Critical failure- the lists are nulls (not empty arrays) */
	if (displayList === null || dvdMainList === null) {
		return (
			<SCMainList id="mainListPage">
				<SCErrorMessage id="unavailableListError">
					The List of DVDs is unavailable
				</SCErrorMessage>
			</SCMainList>
		);
	}

	/* Add Title Button in Main List Handler */
	const addNewTitleButtonHandler = () => {
		setShowAddFormModal(true);
	};

	/* Delete Button in Table Handler */
	const deleteButtonHandler = (id: number) => {
		setSelectedId(id);
		setShowDeleteConfirmModal(true);
	};

	/* The Good Stuff */
	return (
		<SCMainList id="mainListPage">
			{/* Show the Delete Confirm Modal when needed */}
			{showDeleteConfirmModal && (
				<DeleteConfirmation
					onClose={closeConfirmModal}
					onDelete={deleteConfirmHandler}
					name={
						displayList.find((item) => item.id === selectedId)?.name ||
						'<Unknown Title>'
					}
					id={'DeleteConfirmationModal'}
				/>
			)}
			{/* Show the Add Form Modal when needed */}
			{showAddFormModal && (
				<AddNewTitleFormModal
					onClose={closeAddFormModal}
					onConfirm={addNewFormHandler}
					id={'AddTitleModal'}
				/>
			)}
			<SCHomeTitle>
				<h1>Master DVD List</h1>
				{isAdmin && <h2>Admin features activated</h2>}
			</SCHomeTitle>
			<SCDisplayListMain>
				<SCDisplayListControls $isAdmin={isAdmin}>
					<SCDisplayListControl>
						{/* Filter Dropdown- Keep the filters updated depending on what's available in the main list */}
						<SCDisplayListSelection
							id="filterMenu"
							onChange={(event: ChangeEvent<HTMLSelectElement>) => {
								dispatch(
									filterDisplayList({
										newFilter: event.target.options[event.target.selectedIndex]
											.value as ETitleCategory,
									}),
								);
							}}
							value={displayList.length === 0 ? '' : currentFilter}
							disabled={dvdMainList.length === 0}
						>
							<option value="" disabled>
								Please select a filter:
							</option>
							<option value="all">All</option>
							{availableFilters.map((filter) => (
								<option value={filter} key={filter}>
									{TitleDisplayCategories[filter]}
								</option>
							))}
						</SCDisplayListSelection>
					</SCDisplayListControl>
					<SCDisplayListControl>
						{/* Sort Dropdown */}
						<SCDisplayListSelection
							id="sortMenu"
							disabled={displayList.length === 0}
							value={currentSort}
							onChange={(event: ChangeEvent<HTMLSelectElement>) => {
								dispatch(
									sortDisplayList({
										sortOption: event.target.options[event.target.selectedIndex]
											.value as ESortOption,
									}),
								);
							}}
						>
							<option value={ESortOption.titleAscending}>
								{DisplaySortOptions[ESortOption.titleAscending]}
							</option>
							<option value={ESortOption.titleDescending}>
								{DisplaySortOptions[ESortOption.titleDescending]}
							</option>
							<option value={ESortOption.categoryAscending}>
								{DisplaySortOptions[ESortOption.categoryAscending]}
							</option>
							<option value={ESortOption.categoryDescending}>
								{DisplaySortOptions[ESortOption.categoryDescending]}
							</option>
						</SCDisplayListSelection>
					</SCDisplayListControl>
					{/* Add New Title Button- only for Admin Mode */}
					{isAdmin && (
						<SCDisplayListControl>
							<SCDisplayListAddTitleButton
								id="addTitleButton"
								onClick={addNewTitleButtonHandler}
							>
								Add New Title
							</SCDisplayListAddTitleButton>
						</SCDisplayListControl>
					)}
				</SCDisplayListControls>
				{/* If the display list is empty, it may be from someone deleting the last item in a category when filtered for
				 *  that category. Keep an eye on the main list. If it's empty, too, then more titles are needed*/}
				{!displayList.length && (
					<SCErrorMessage id="DisplayListEmptyError">
						{`Nothing to show. ${
							isAdmin
								? `Add a title${
										dvdMainList.length ? ', or select a different filter.' : '.'
								  }`
								: 'Use Admin Mode to add a title.'
						}`}
					</SCErrorMessage>
				)}
				{/* The Table- with an extra column for delete buttons in Admin Mode */}
				{!!displayList.length && (
					<SCDisplayListTable id="TableMain">
						<SCDisplayListBody id="TableBody" $isAdmin={isAdmin}>
							{/* Headers */}
							<SCDisplayListHeader id="TableHeaderImage">
								Image Preview
							</SCDisplayListHeader>
							<SCDisplayListHeader id="TableHeaderTitle">Title</SCDisplayListHeader>
							<SCDisplayListHeader id="TableHeaderCategory">
								Category
							</SCDisplayListHeader>
							<SCDisplayListHeader id="TableHeaderFeatured">
								Featured
							</SCDisplayListHeader>
							{isAdmin && (
								<SCDisplayListDeleteHeader id="TableHeaderDelete">
									Delete
								</SCDisplayListDeleteHeader>
							)}
							{/* Show all the items in the current display list */}
							{displayList.map((dvdItem, index) => {
								const row = [
									<SCDisplayListCell
										className="image"
										id={`TableRow${index}Image`}
										key={`${dvdItem.name}_${dvdItem.id}_image`}
									>
										<SCDisplayListImage
											src={dvdItem.image || fallbackImg}
											width="100"
											height="auto"
											alt={dvdItem.name}
										/>
									</SCDisplayListCell>,
									<SCDisplayListCell
										className="text"
										id={`TableRow${index}Name`}
										key={`${dvdItem.name}_${dvdItem.id}_name`}
									>
										<SCDisplayListCellText>
											{dvdItem.name}
										</SCDisplayListCellText>
									</SCDisplayListCell>,
									<SCDisplayListCell
										className="text"
										id={`TableRow${index}Category`}
										key={`${dvdItem.name}_${dvdItem.id}_category`}
									>
										{TitleDisplayCategories[dvdItem.category as ETitleCategory]}
									</SCDisplayListCell>,
									<SCDisplayListCell
										className="featured"
										id={`TableRow${index}Featured`}
										key={`${dvdItem.name}_${dvdItem.id}_featured`}
									>
										{dvdItem.featured === true ? <Emoji symbol="✅" /> : ''}
									</SCDisplayListCell>,
								];
								if (isAdmin)
									row.push(
										<SCDisplayListDeleteCell
											id={`TableRow${index}Delete`}
											key={`${dvdItem.name}_${dvdItem.id}_delete`}
										>
											<SCDisplayListDeleteCellButton
												id={`TableRow${index}DeleteButton`}
												onClick={() => deleteButtonHandler(dvdItem.id)}
											>
												<Emoji symbol="❌" />
											</SCDisplayListDeleteCellButton>
										</SCDisplayListDeleteCell>,
									);
								return row;
							})}
						</SCDisplayListBody>
					</SCDisplayListTable>
				)}
			</SCDisplayListMain>
		</SCMainList>
	);
};

export default MainList;
