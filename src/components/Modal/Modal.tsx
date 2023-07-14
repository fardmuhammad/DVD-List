import Emoji from '../../utils/emoji';
import { SCModalBackground, SCModal, SCModalCloseButton } from './styles';
import ReactDOM from 'react-dom';

/* Modal Background Format of React Props */
interface IModalBackgroundProps {
	onClick: () => void;
	id: string;
}

/* Modal Background Object */
const ModalBackground = ({ onClick, id }: IModalBackgroundProps) => {
	return <SCModalBackground onClick={() => onClick()} id={id} />;
};

/* Modal Overlay Format for React Props */
interface IModalOverlayProps {
	onClose: () => void;
	children?: React.ReactNode;
	id: string;
}

/* Modal Overlay (Superstructure for the individual forms) */
export const ModalOverlay = ({ onClose, id, children }: IModalOverlayProps) => {
	return (
		<SCModal id={id}>
			<SCModalCloseButton id={'ModalClose'} onClick={onClose}>
				<Emoji label="closeModal" symbol="✖️" />
			</SCModalCloseButton>
			{children}
		</SCModal>
	);
};

/* Using React Portals, the overlays and background for the modal are in a div much higher up in Z
 * than the app. Making it more accessible and just a better overall structure.
 */
const portalElement = document.getElementById('overlays')!;

/* Properties format for Modal Object */
interface IModalProps {
	onClose: () => void;
	children?: React.ReactNode;
	id: string;
}

/* Modal Object- The Whole Thing */
export const Modal = ({ onClose, id, children }: IModalProps) => {
	return (
		<>
			{ReactDOM.createPortal(
				<ModalBackground id={`MODAL_BACKGROUND_${id}`} onClick={onClose} />,
				portalElement,
			)}
			{ReactDOM.createPortal(
				<ModalOverlay id={`MODAL_OVERLAY_${id}`} onClose={onClose}>
					{children}
				</ModalOverlay>,
				portalElement,
			)}
		</>
	);
};
