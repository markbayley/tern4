import React from "react";
import DateRangeFacet from "./DateRangeFacet";
import SelectFacet from "./SelectFacet";
import ImageTypeFacet from "./ImageTypeFacet";

const BioFacets = () => (
  <div>
    <SelectFacet facet="site_id" placeholder="Select Sites" />
    <SelectFacet facet="plot" placeholder="Select Plots" />
    <SelectFacet facet="site_visit_id" placeholder="Select Site Visit Ids" />
    <ImageTypeFacet facet="image_type" placeholder="Select Image Types" />
    <DateRangeFacet />
  </div>
);

export default BioFacets;
