import React, { useContext } from "react";
import PropTypes from "prop-types";
import BurgerButton from "../BurgerButton";
import { LeftSideBarContext } from "../LeftSideBarContext";
import "./style.scss";

const TopSection = ({ searchmode }) => {
  const { setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className="LeftSideBar__TopSection">
      <BurgerButton
        onClick={() => setIsShowSidebar(true)}
        searchmode={searchmode}
      />
    </div>
  );
};

TopSection.propTypes = {
  searchmode: PropTypes.string.isRequired,
};

export default TopSection;
