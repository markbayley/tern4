import React from "react";
import PropTypes from "prop-types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "./Map.scss";

const ImageMarker = (props) => {
  const {
    id, name, sitePosition, count, selected,
  } = props;

  const className = `custom-marker ${selected ? "custom-marker-selected" : ""} ${count ? "" : "custom-marker-disabled"}`;

  return (
    <Marker
      icon={L.divIcon({
        html: "  ",
        className,
        iconSize: L.point(33, 33, true),
        tooltipAnchor: [20, 0],
      })}
      key={id}
      position={sitePosition}
    // onClick={handleFilter} -mosheh disabled it!
    >
      {" "}
      <br />
      <Tooltip>
        <div className="tool-tip">
          {/* <strong>
          <h6>Click marker to select {props.label}.</h6>
        </strong> */}
          Site:
          {" "}
          <a
            className="tool-tip-link"
            href="www.tern.org"
          >
            {name}
            {" "}
          </a>
          {" "}
          <br />
          Images:
          {" "}
          <a
            className="tool-tip-link"
            href="www.tern.org"
          >
            {count}
            {" "}
          </a>
          <br />
        </div>
      </Tooltip>
    </Marker>
  );
};

ImageMarker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sitePosition: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ImageMarker;
