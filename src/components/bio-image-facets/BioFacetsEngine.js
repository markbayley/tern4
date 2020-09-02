import React from "react";
import ReactDateRangeFacet from "./ReactDateRangeFacet";
import SelectFacet from "./SelectFacet";
import ImageTypeSelectFacet from "./ImageTypeSelectFacet";

const BioFacetsEngine = () => (
  <div>
    <SelectFacet facet="site_id" placeholder="Select Sites" />
    <SelectFacet facet="plot" placeholder="Select Plots" />
    <SelectFacet facet="site_visit_id" placeholder="Select Site Visit Ids" />
    <ImageTypeSelectFacet facet="image_type" placeholder="Select Image Types" />
    <ReactDateRangeFacet />
  </div>
);

export default BioFacetsEngine;
