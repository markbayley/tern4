/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import BurgerButton from "../BurgerButton";
import { LeftSideBarContext } from "../LeftSideBarContext";
import "./style.scss";
import DELETESearchEngine from "../../../components/bio-search/DELETESearchEngine";
import BioMapEngine from "../../../components/bio-image-map/BioMapEngine";

const LeftSection = ({ searchmode }) => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
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
          <DELETESearchEngine embed />

        </div>
      )}
      {searchmode === "Images" && (
        <div>
          <Button
            searchmode={searchmode}
            // onClick={() => setMySearch(searchmode === 'Map')}
            style={{ width: "100%" }}
            color="flat"
          >
            <img src="img/map1.png" width="100%" alt="map" />
            Click the map to view
          </Button>
          <Button
            style={{ width: "100%" }}
            color="flat"
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
