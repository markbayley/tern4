/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import BurgerButton from '../BurgerButton';
import { LeftSideBarContext } from '../index';
import './style.scss';
import TopSection from '../TopSection';

const LeftSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(LeftSideBarContext);
  return (
    <div className={`LeftSideBar__LeftSection LeftSideBar__LeftSection--${isShowSidebar ? 'show' : 'hide'}`}>
    
      <div className="LeftSideBar__LeftSection__topWrapper">
        <BurgerButton
          onClick={() => setIsShowSidebar(false)}
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

export default LeftSection;
