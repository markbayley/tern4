/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import BurgerButton from "../BurgerButton";
import { LeftSideBarContext } from "../LeftSideBarContext";
import "./style.scss";
import SearchEngine from "../../../components/bio-search/SearchEngine";
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
      <ul className="LeftSideBar__LeftSection__menuWrapper">
        <li>
          <a
            href="#"
          >
        
            <img src="img/map1.png" />
          </a>
        </li>
        <li>
          <a
            href="#"
          >
          
          </a>
        </li>
   
      </ul>
    
    </div>
  );
};

LeftSection.propTypes = {
  searchmode: PropTypes.string.isRequired,
};

export default LeftSection;
