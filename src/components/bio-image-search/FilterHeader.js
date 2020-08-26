import React from "react";
import { Button } from "reactstrap";

const FilterHeader = () => (
  <h5 className="filter-header">
    <Button color="filter">
      <i className="fa fa-filter" />
      {" "}
      Filter
    </Button>
    <Button color="filter">
      <i className="fa fa-star" />
      {" "}
      Favourites
    </Button>
    <Button color="filter">
      <i className="fa fa-check-square" />
      {" "}
      Saved
    </Button>
    {/* Mosheh disabled it - useless with checkbox tree structure now! */}
    {/* <ResetFilter resetFilter={resetFilter} /> */}
  </h5>
);

export default FilterHeader;
