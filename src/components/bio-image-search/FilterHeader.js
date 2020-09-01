import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const FilterHeader = () => (
  <div className="filter-header">
    <Nav tabs>
      <NavItem>
        <NavLink href="#" active className="filter-link">
          <i className="fa fa-filter" />
          {" "}
          Filter
        </NavLink>
      </NavItem>
      <NavItem className="filter-item">
        <NavLink href="#" className="filter-link">
          <i className="fa fa-star" />
          {" "}
          Favs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" className="filter-link">
          <i className="fa fa-check-square" />
          {" "}
          Saved
        </NavLink>
      </NavItem>
    </Nav>
  </div>
);

export default FilterHeader;
