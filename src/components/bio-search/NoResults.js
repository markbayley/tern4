import React from "react";
import { Button } from "react-bootstrap";

const NoResults = () => (
  <div className="no-result">
    Sorry, we could not find any results matching your search term!
    <div className="no-result-button">
      <Button variant="filter"> Search Again?</Button>
    </div>
  </div>
);

export default NoResults;
