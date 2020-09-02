import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ImageMarker from "./ImageMarker";
// import BreadCrumb from "../BreadCrumb";

// TODO: this component is almost pointless, there is no real need to wrap Marker
//       within ImageMarkerEngine and ImageMarker
const ImageMarkerEngine = ({ site, selected }) => {
  // site.doc_count, site.key
  const site_vocab = useSelector((state) => state.search.vocabs.site_id);

  // var sitePosition = bioImageDocument.centre_point;
  const sitePosition = site_vocab[site.key].centre_point.coordinates;
  const locType = site_vocab[site.key].centre_point.type;

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

  return (
    <ImageMarker
      sitePosition={siteCordinates}
      id={site_vocab[site.key].value}
      name={site_vocab[site.key].label}
      count={site.doc_count}
      selected={selected}
    />
  );
};

ImageMarkerEngine.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ImageMarkerEngine;
