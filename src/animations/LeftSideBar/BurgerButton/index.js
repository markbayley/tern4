import React from 'react';
import './style.scss';

const BurgerButton = ({ onClick }) => {
  return (
    <div
      className="LeftSideBar__BurgerButton"
      role="button"
      onClick={onClick}
  
    >
    <img src="img/chevron.png" height="30px"/>Map
    </div>
  );
};

export default BurgerButton;
