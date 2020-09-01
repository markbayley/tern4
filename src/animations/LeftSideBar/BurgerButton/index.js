import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Button } from "reactstrap";
import { LeftSideBarContext } from "../LeftSideBarContext";

const BurgerButton = ({ onClick, searchmode }) => {
  const { isShowSidebar } = useContext(LeftSideBarContext);

  return (
    <Button
      className="LeftSideBar__BurgerButton"
      role="button"
      color="toggle"
      onClick={onClick}
  
    >
    <img src="img/chevron.png" height="30px"/>Map
    </Button>
  );
};

BurgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  searchmode: PropTypes.string.isRequired,
};

export default BurgerButton;
