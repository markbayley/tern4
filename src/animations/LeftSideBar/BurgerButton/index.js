import React, { useContext } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { LeftSideBarContext } from "../index";

const BurgerButton = ({ onClick, searchmode }) => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);

  return (
    <Button
      className="LeftSideBar__BurgerButton"
      role="button"
      variant="toggle"
      onClick={onClick}
    >
      {isShowSidebar && <i className="fa fa-chevron-right"></i>}
      {!isShowSidebar &&
        (searchmode === "Map" ? (
          <>
            <i className="fa fa-chevron-left"></i>Data{" "}
          </>
        ) : (
          <>
            <i className="fa fa-chevron-left"></i>Map{" "}
          </>
        ))}
    </Button>
  );
};

export default BurgerButton;
