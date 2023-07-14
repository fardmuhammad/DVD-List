import { useState } from 'react';
import { ETitleCategory, TitleDisplayCategories } from '../../_store/types';
import { Modal } from './Modal';

import {
	SCModalForm,
	SCModalTitleSection,
	SCModalButton,
	SCModalFormInput,
	SCModalFormInputLabel,
	SCModalFormSelect,
	SCModalFormSelectOption,
	SCModalFormInputSection,
	SCModalFormButtonSection,
} from './styles';

/* Format of the React Props */
interface IAddNewTitleFormProps {
	onClose: () => void;
	onConfirm: (name: string, category: ETitleCategory, featured: boolean) => void;
	id: string;
}

export const AddNewTitleFormModal = ({ onClose, onConfirm, id }: IAddNewTitleFormProps) => {
	/* The title, category, and Featured toggle to be sent to the store. */
	/* Any and all Redux references aren't in here because we are making this agnostic */
	const [enteredTitle, setEnteredTitle] = useState('');
	const [currentCategory, setCurrentCategory] = useState<ETitleCategory>(ETitleCategory.drama);
	const [isFeatured, setIsFeatured] = useState(false);

	/* Close button action */
	const closeModal = () => {
		onClose();
	};

	/* Title form input handler */
	const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEnteredTitle(event.target.value);
	};

	/* Category dropdown handler */
	const changeCategoryHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentCategory(event.target.value as ETitleCategory);
	};

	/* Featured checkbox handler */
	const changeFeaturedHandler = () => {
		setIsFeatured((state) => !state);
	};

	/* Submit button handler */
	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();
		onConfirm(enteredTitle || 'untitled', currentCategory, isFeatured);
	};

	/* Get all the categories to choose from, indexed by the ETitleCategory enum */
	const masterFilterList = Object.entries(TitleDisplayCategories).map(([k, v]) => ({
		value: k,
		display: v,
	}));

	/* Let's light this candle */
	return (
		<Modal onClose={closeModal} id={id}>
			<>
				<SCModalTitleSection id="AddTitleModalTitle">
					<h1>Adding a New Title!</h1>
				</SCModalTitleSection>
				<SCModalForm>
					<form onSubmit={submitFormHandler} id="AddTitleModalForm">
						<SCModalFormInputSection>
							<SCModalFormInputLabel htmlFor="titleInput">
								Title
							</SCModalFormInputLabel>
							<SCModalFormInput
								id="titleInput"
								type="text"
								onChange={changeTitleHandler}
								value={enteredTitle}
								autoFocus
							/>
						</SCModalFormInputSection>
						<SCModalFormInputSection>
							<SCModalFormInputLabel htmlFor="categorySelect">
								Category
							</SCModalFormInputLabel>
							<SCModalFormSelect
								id="categorySelect"
								value={currentCategory}
								onChange={changeCategoryHandler}
							>
								{masterFilterList.map((filter) => {
									if (filter.value !== 'all')
										return (
											<SCModalFormSelectOption
												value={filter.value}
												key={filter.value}
											>
												{filter.display}
											</SCModalFormSelectOption>
										);
								})}
							</SCModalFormSelect>
						</SCModalFormInputSection>
						<SCModalFormInputSection>
							<SCModalFormInputLabel className="sameLine" htmlFor="featuredToggle">
								Featured Title?
							</SCModalFormInputLabel>
							<SCModalFormInput
								className="sameLine short"
								id="featuredToggle"
								type="checkbox"
								checked={isFeatured}
								onChange={changeFeaturedHandler}
							/>
						</SCModalFormInputSection>
						<SCModalFormButtonSection>
							<SCModalButton id="AddTitleModalCancel" onClick={closeModal}>
								Cancel
							</SCModalButton>
							<input id="submitBtn" type="submit" value="Create New Title" />
						</SCModalFormButtonSection>
					</form>
				</SCModalForm>
			</>
		</Modal>
	);
};
