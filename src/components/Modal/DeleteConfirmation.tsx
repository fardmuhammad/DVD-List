import { Modal } from './Modal';

import {
	SCModalTitleSection,
	SCModalFormButtonSection,
	SCModalButton,
	SCModalMainContentSection,
} from './styles';

/* Format of the React props */
interface IDeleteConfirmationProps {
	name: string;
	onClose: () => void;
	onDelete: () => void;
	id: string;
}

/* Delete Confirmation Modal */
export const DeleteConfirmation = ({ name, onClose, onDelete, id }: IDeleteConfirmationProps) => {
	/* Close button handler */
	const closeModal = () => {
		onClose();
	};

	/* Delete confirmation */
	const confirmDelete = () => {
		onDelete();
		onClose();
	};

	/* Let's dance. */
	return (
		<Modal onClose={closeModal} id={`MainModal${id}`}>
			<>
				<SCModalTitleSection id="AddModalTitleSection">
					<h1>Are you sure?</h1>
					<h2>
						Do you wish to erase <em>{name}</em>?
					</h2>
				</SCModalTitleSection>
				<SCModalMainContentSection>
					<SCModalFormButtonSection id="AddModalButtonSection">
						<SCModalButton id="AddModalCancelButton" onClick={closeModal}>
							No, go back.
						</SCModalButton>
						<SCModalButton
							className="confirm"
							id="AddModalConfirmButton"
							onClick={confirmDelete}
						>
							Yes, delete it.
						</SCModalButton>
					</SCModalFormButtonSection>
				</SCModalMainContentSection>
			</>
		</Modal>
	);
};
