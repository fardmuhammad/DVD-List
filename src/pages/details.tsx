import { useSelector } from 'react-redux';
import { RootState } from '../_store/store';
import { INbcListObject } from '../_store/types';
import { useParams } from 'react-router-dom';
import {
	SCDetailsContainer,
	SCDetailsImageContainer,
	SCDetailsImage,
	SCDetailsCaption,
	SCErrorMessage,
} from './styles';
import { fallbackImg } from '../utils/types';

/**
 * The Details Page
 */
export const Details = () => {
	const { id } = useParams();
	const idNum = Number(id) || -1;

	/* Get the full list to check for validity */
	const nbcMainList: INbcListObject[] | null = useSelector<RootState, INbcListObject[] | null>(
		(state) => state.lists.nbcMainList,
	);

	const containerId = 'DetailsPageContainer';

	/* If the main list is null, show an error. */
	if (nbcMainList === null)
		return (
			<SCDetailsContainer id={containerId}>
				<SCErrorMessage id="ListUnavailableError">
					List Unavailable. Check your connection.
				</SCErrorMessage>
			</SCDetailsContainer>
		);

	/* If the item with that ID is not in the list, send another error */
	const listItemIndex: number = nbcMainList.findIndex((item) => item.id === idNum);

	if (listItemIndex === -1)
		return (
			<SCDetailsContainer id={containerId}>
				<SCErrorMessage id="ItemUnavailableError">
					Item unavailable. Return to the home page or go to the main list.
				</SCErrorMessage>
			</SCDetailsContainer>
		);

	/* Otherwise, get the list item and show the goods. */
	const nbcListItem = nbcMainList[listItemIndex];

	return (
		<SCDetailsContainer id={containerId}>
			<SCDetailsCaption id="FeaturedItemTitle">
				<h1>{nbcListItem.name}</h1>
			</SCDetailsCaption>
			<SCDetailsImageContainer id="FeaturedImageContainer">
				<SCDetailsImage
					id="FeaturedImage"
					src={
						nbcListItem.image !== fallbackImg
							? nbcListItem.image
							: `../${nbcListItem.image}`
					}
					alt={nbcListItem.name}
				/>
			</SCDetailsImageContainer>
		</SCDetailsContainer>
	);
};

export default Details;
