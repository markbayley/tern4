import React, { useState, useEffect } from "react";
import { CONFIG } from "./../config.js";
import TopBar from "./TopBar";
import SearchBar from "./SearchBar";
import IconBar from "./IconBar";
import BreadCrumb from "./BreadCrumb";
// import Scroll from "./Scroll";
// import Legend from "./Legend";
import Footer from "./Footer";
import { Col, Row, Button, Image } from "react-bootstrap";
import DateRange from "./DateRange";
// import Query from "./Query";
import Favourite from "./bio-favourites/Favourite";
import ImageSearchEngine from "./bio-image-search/ImageSearchEngine";
import BioMapEngine from "./bio-image-map/BioMapEngine";
import SearchEngine from "./bio-search/SearchEngine";
// import Toggle from "./buttons/Toggle";

import FavouriteHeader from "./bio-favourites/FavouriteHeader";
import FilterHeader from "./bio-image-search/FilterHeader";

import Side from "./test/Side.jsx";


// import { Link, scroller, animateScroll as scroll } from "react-scroll";

// const base_image_url = "https://swift.rc.nectar.org.au/v1/AUTH_05bca33fce34447ba7033b9305947f11/";

/*Photo Gallery*/
/*Photo Gallery Item*/
/*Filter SideBar*/
/*Filter SideBar Item*/

const BioImagesEngine = ({ initFilter }) => {
  const [bioState, setBioState] = useState({
    hits: [],
    aggregation: null,
    filters: {},
    search: {},
  });
  const [selectedFilter, setSelectedFilter] = useState(initFilter);

  const [loading, setLoading] = useState(false);

  const [favourites, setFavourites] = useState([]);

  const [error, setError] = useState({
    isError: false,
    error: null,
  });

  // const [mapParams, setMapParams] = useState({
  //   lat: -26.47,
  //   lng: 134.02,
  //   zoom: 5,
  //   maxZoom: 30,
  //   minZoom: 5,
  // });

  const updateBioState = (bioField, value) => {
    setBioState({ ...bioState, [bioField]: value });
  };

  const fetchFavourites = async () => {
    setLoading(true);
    try {
      const apiRes = await fetch(CONFIG.API_BASE_URL + "favourites");
      const resJSON = await apiRes.json();
      setFavourites(resJSON);
    } catch (error) {
      setError({
        isError: true,
        error: error,
      });
    }
    setLoading(false);
  };

  const fetchSearch = async () => {
    console.log("in fetchSearch(). selectedFilter=", selectedFilter);
    var search_url = CONFIG.API_BASE_URL + "search?1=1";
    for (const [key, value] of Object.entries(selectedFilter)) {
      search_url += "&" + key + "=" + value;
    }
    console.log("ES API. search_url" + search_url);
    setLoading(true);
    try {
      const apiRes = await fetch(search_url);

      // We get the API response and receive data in JSON format...
      const resJSON = await apiRes.json();
      const splitAggregation = resJSON["aggregation"].split(".");
      setBioState({
        search: resJSON,
        hits: resJSON["hits"],
        filters: resJSON["aggregations"],
        aggregation: splitAggregation[0],
      });
    } catch (error) {
      setError({
        isError: true,
        error: error,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("in useEffect(). selectedFilter=", selectedFilter);
    fetchSearch();
  }, [selectedFilter]);

  const filterSiteID = (id) => {
    // this.setState({ selectedFilter: { site_id: id } });
    setSelectedFilter({ site_id: id });
    console.log("filterSiteID", selectedFilter);
  };

  const resetFilter = () => {
    console.log("RESETING FILTER!!");
    setSelectedFilter({});
  };

  const handleFilter = (filterValue) => {
    console.log("in handleFilter(). HELLO MARK", filterValue);
    var arr = filterValue.split("=");
    const fKey = arr[0];
    const fValue = arr[1];
    const miniFilter = { [fKey]: fValue };
    const updatedFilter = { ...selectedFilter, ...miniFilter };
    setSelectedFilter(updatedFilter);
    // if (arr[0] !== "_id") {
    //   // selectedFilter["_id"] = "";
    //   setSelectedFilter({ _id: "" });
    // }
  };

  const handleFavourite = (i) => {
    // const favourites = this.state.favourites;
    // TODO Impliment later!
    console.log("in handleFavourite() i =" + i);
    alert(i); //image_type=photopoint
  };


  /*Map Image Toggle*/
  const Toggle = () => {
    const searchmodes = ["Map", "Images"];
    const Map = ["Map"];
    const Images = ["Images"];
    const [mySearch, setMySearch] = useState("Map");

    return (
      <>
      <div style={{position: 'absolute', right: '75px', bottom: '180px', zIndex: '10'}} >
      {searchmodes.map((searchmode) => (
        <Button  
          variant="light"
          
          key={searchmode} 
          onClick={() => setMySearch(searchmode)}
        > 
          {searchmode}
        </Button>
      ))}
      
   
    </div>

      <Col fluid 
        
        
        style={{
          height: "80vh",
          padding: "0%",
          margin: "0%",
        }}
      >
        {mySearch === "Map" && (
          <div>
            <BioMapEngine
              bioImageDocuments={bioState.hits}
              handleFilter={handleFilter}
            />
          </div>
        )}
        {mySearch === "Images" && (
          <div>
            <SearchEngine
              bioImageDocuments={bioState.hits}
              aggregation={bioState.aggregation}
              handleFilter={handleFilter}
            />
          </div>
        )}
      </Col>
      </>
    );
  };

  return (
    <div id="map">
      <TopBar />
    
      <SearchBar />
      <Side />
      <IconBar />
      <Row >

        {/*Filter SideBar*/}
        <Col  lg='auto'
          className="filterbar"
        
          style={{ zIndex: "9", margin: "0", paddingRight: "0" }}
        >
          <FilterHeader resetFilter={() => resetFilter()} />

          <ImageSearchEngine
            imageFilters={bioState.filters}
            handleFilter={(i) => handleFilter(i)}
          />
          <DateRange />
          <FavouriteHeader />

          <Favourite
            favourites={favourites}
            handleFavourite={(i) => handleFavourite(i)}
          />
        </Col>
        <Toggle />
        {/*Leaflet Map */}

     

        <div className="map-container">
          {/*End of Leaflet  Map */}
        
          {/*Photo Gallery */}
          <div id="gallery"></div>
        </div>
      </Row>
      <BreadCrumb />
      <Footer />
    </div>
  );
};
export default BioImagesEngine;
