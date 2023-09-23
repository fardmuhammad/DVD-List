import { useSelector } from "react-redux";
import { RootState } from "../_store/store";
import { IDvdListObject } from "../_store/types";
import {
  SCHomeTitle,
  SCFeaturedTitlesContainer,
  SCFeaturedTitle,
  SCFeaturedTitleImage,
  SCFeaturedTitleImageContainer,
  SCFeaturedTitleName,
  SCErrorMessage,
} from "./styles";
import { Link } from "react-router-dom";
import { fallbackImg } from "../utils/types";
import Carousel from "../components/Carousel/carousel";

/* The home page. Home of the carousel */
const Home = () => {
  /* Get the full list to get the featured items */
  const dvdList = useSelector<RootState, IDvdListObject[] | null>(
    (state) => state.lists.dvdMainList
  );

  if (dvdList) {
    /* Find all the featured titles and convert them into React nodes with the links
     * to the details page to feed into the carousel */
    const featuredTitles = dvdList
      .filter((dvdItem) => dvdItem.featured === true)
      .map((dvdItem, index) => {
        return (
          <SCFeaturedTitle
            id={`featuredItem${index}`}
            key={`${dvdItem.name.split(" ").join()}_${dvdItem.id}`}
          >
            <Link to={`details/${dvdItem.id}`}>
              <SCFeaturedTitleImageContainer
                id={`featuredItemImageContainer${index}`}
              >
                <SCFeaturedTitleImage
                  id={`featuredItemImage${index}`}
                  src={dvdItem.image || fallbackImg}
                  alt={dvdItem.name}
                />
              </SCFeaturedTitleImageContainer>
              <SCFeaturedTitleName id={`featuredItemCaption${index}`}>
                {dvdItem.name}
              </SCFeaturedTitleName>
            </Link>
          </SCFeaturedTitle>
        );
      });

    return (
      <>
        {/* If there are no featured titles, tell the user to make more. */}
        {!featuredTitles.length && (
          <SCErrorMessage>
            <h1>Featured Title List is empty.</h1>
            <h2>Use the Admin Mode to add featured titles.</h2>
          </SCErrorMessage>
        )}
        {/* Otherwise, put the featured titles in the Carousel. Hit it. */}
        {!!featuredTitles.length && (
          <>
            <SCHomeTitle id={`Home Page Title`}>
              <h1>{`Featured Title${featuredTitles.length > 1 ? "s" : ""}`}</h1>
            </SCHomeTitle>
            <SCFeaturedTitlesContainer id="FeaturedTitlesContainer">
              <Carousel>{featuredTitles}</Carousel>
            </SCFeaturedTitlesContainer>
          </>
        )}
      </>
    );
  } else {
    /* If the full list isn't there, something really went wrong. Show an error. */
    return (
      <>
        {/* This shouldn't happen since the home page shows up only if the DVDList exists' */}
        <h1>List Not Available.</h1>
        <h2>Please check your connection to list.</h2>
      </>
    );
  }
};

export default Home;
