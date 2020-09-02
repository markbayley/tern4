import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import SearchBar from "./searchbar/SearchBar";
import Favourite from "./bio-favourites/Favourite";
import ImageSearchEngine from "./bio-image-search/ImageSearchEngine";
import BioMapEngine from "./bio-image-map/BioMapEngine";
import SearchEngine from "./bio-search/SearchEngine";
import FilterHeader from "./bio-image-search/FilterHeader";
import {
  fetchSearchAction,
  fetchFacetsAction,
  setSearchModeAction,
} from "../store/reducer";

/* Map Image Toggle */
// function Toggle() {
//   const dispatch = useDispatch();

//   return (
//     <div className="main-toggle">
//       <Button
//         size="sm"
//         color="round"
//         onClick={() => dispatch(setSearchModeAction("Map"))}
//       >
//         Map
//       </Button>
//       <Button
//         size="sm"
//         color="round"
//         onClick={() => dispatch(setSearchModeAction("Images"))}
//       >
//         Images
//       </Button>
//     </div>
//   );
// }

const BioImagesEngine = () => {
  const dispatch = useDispatch();
  const searchMode = useSelector((state) => state.ui.searchResults.searchMode);

  // trigger initial search to populate facets results
  useEffect(() => {
    dispatch(fetchSearchAction());
    dispatch(fetchFacetsAction());
  }, [dispatch]);

  return (
    <>
      <SearchBar />
      <Row>
        {/* Filter SideBar */}
        <Col xs="auto" className="filter-bar">
          <FilterHeader />
          <ImageSearchEngine />
          <Favourite />
        </Col>
        {/* <Toggle /> */}
        <Col className="scroll-images">
          {/* Leaflet Map or Photo Gallery */}
          {searchMode === "Map" ? (
            <>
              <BioMapEngine />
              <Button
                className="main-toggle"
                size="sm"
                color="round"
                onClick={() => dispatch(setSearchModeAction("Images"))}
              >
                Images
              </Button>{" "}
            </>
          ) : (
            <>
              <SearchEngine />
              <Button
                className="main-toggle"
                size="md"
                color="round"
                onClick={() => dispatch(setSearchModeAction("Map"))}
              >
                Map
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default BioImagesEngine;
