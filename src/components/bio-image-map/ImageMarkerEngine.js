import React from "react";
import PropTypes from "prop-types";
import ImageMarker from "./ImageMarker";
// import BreadCrumb from "../BreadCrumb";

const ImageMarkerEngine = ({ bioImageDocument, siteLocation }) => {
  let popup = "";
  // var sitePosition = bioImageDocument.centre_point;
  const sitePosition = bioImageDocument.location.coordinates;
  const locType = bioImageDocument.location.type;

  const siteCordinates = [];
  if (locType === "polygon") {
    // Take lat/lon from the first coords
    // TODO Have asked Wilma to look at this if we should be expecting
    // that some sites have polygons instead of lat/lon
    siteCordinates.push(sitePosition[0][0][1]);
    siteCordinates.push(sitePosition[0][0][0]);
  } else {
    siteCordinates.push(sitePosition[1]);
    siteCordinates.push(sitePosition[0]);
  }

  popup = bioImageDocument.image_type.label;

  return (
    <ImageMarker
      value={popup}
      siteLocation={siteLocation}
      site={siteLocation}
      sitePosition={siteCordinates}
      id={siteLocation}
      key={siteLocation}
      label={siteLocation}
      name={bioImageDocument.site_id.label}
      images={bioImageDocument.image_type.label}
      plot={bioImageDocument.plot.label}
      site_visit_id={bioImageDocument.site_visit_id}
    />
  );
};

ImageMarkerEngine.propTypes = {
  bioImageDocument: PropTypes.objectOf(PropTypes.any).isRequired,
  siteLocation: PropTypes.string.isRequired,
};

export default ImageMarkerEngine;
