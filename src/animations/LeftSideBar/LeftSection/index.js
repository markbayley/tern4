/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import BurgerButton from "../BurgerButton";
import { LeftSideBarContext } from "../LeftSideBarContext";
import "./style.scss";
import SearchEngine from "../../../components/bio-search/SearchEngine";
import BioMapEngine from "../../../components/bio-image-map/BioMapEngine";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchAction, setSearchModeAction } from "../../../store/reducer";

const LeftSection = ({ searchmode }) => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);

  const dispatch = useDispatch()
  return (
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? "show" : "hide"}`}>

      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
          searchmode={searchmode}
        />
      </div>
      {searchmode === "Map" && (
        <div className="scroll">
          <SearchEngine embed />

        </div>
      )}
      {searchmode === "Images" && (
        <div>
          <Button
            searchmode={searchmode}
            // onClick={() => setMySearch(searchmode === 'Map')}
            style={{ width: "100%" }}
            variant="flat"
            onClick={() => dispatch(setSearchModeAction("Map"))}
          >
            <img src="img/map1.png" width="100%" alt="map" />
            Click the map to view
          </Button>
          <Button
            style={{ width: "100%" }}
            variant="flat"
          >
            <BioMapEngine embed />

          </Button>
        </div>
      )}

    </div>
  );
};

LeftSection.propTypes = {
  searchmode: PropTypes.string.isRequired,
};

export default LeftSection;

