import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";
import SearchBar from "./searchbar/SearchBar";
import Favourite from "./bio-favourites/Favourite";
import ImageSearchEngine from "./bio-image-search/ImageSearchEngine";
import BioMapEngine from "./bio-image-map/BioMapEngine";
import SearchEngine from "./bio-search/SearchEngine";
import FilterHeader from "./bio-image-search/FilterHeader";
import { fetchSearchAction, fetchFacetsAction, setSearchModeAction } from "../store/reducer";
import LeftSideBar from "../animations/LeftSideBar";
// import MobileSidebar from "./test/MobileSidebar";

/* Map Image Toggle */
function Toggle() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="main-toggle">
        <Button variant="round" onClick={() => dispatch(setSearchModeAction("Map"))}>
          Map
        </Button>
        <Button variant="round" onClick={() => dispatch(setSearchModeAction("Images"))}>
          Image
        </Button>
      </div>
    </>
  );
}

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

      <LeftSideBar searchmode={searchMode} />
      <Row>
        {/* Filter SideBar */}
        <Col xs="auto" className="filter-bar">
          <FilterHeader />
          <ImageSearchEngine />
          {/* <MobileSidebar /> */}
          <Favourite />
        </Col>
        <Toggle />
        <Col className="scroll-images">
          {/* Leaflet Map or Photo Gallery */}
          {searchMode === "Map"
            ? <BioMapEngine />
            : <SearchEngine />}
        </Col>
        {/* <div > */}
      </Row>
    </>
  );
};

export default BioImagesEngine;
