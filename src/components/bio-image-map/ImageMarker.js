import React from "react";
import PropTypes from "prop-types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "./Map.scss";

const ImageMarker = (props) => {
  const {
    id, plot, images, site_visit_id, name, sitePosition,
  } = props;

  return (
    <Marker
      icon={L.divIcon({
        html: "  ",
        className: "custom-marker",
        iconSize: L.point(33, 33, true),
        tooltipAnchor: [20, 0],
      })}
      key={id}
      position={sitePosition}
    // onClick={handleFilter} -mosheh disabled it!
    >
      {" "}
      <br />
      {/* <Popup>
        <strong>
          <h6>{props.label} selected.</h6>
        </strong>
        Selection:{" "}
        <a
          href="www.link.com"
          style={{ textTransform: "capitalize", color: "#065f65" }}
        >
          {props.siteLocation}
        </a>{" "}
        <br />
        Image Types:{" "}
        <a
          href="www.link.com"
          style={{ textTransform: "capitalize", color: "#065f65" }}
        >
          {props.value}
        </a>{" "}
        <br />
        <br />
        <Button
          style={{
            padding: "3px",
            border: "1px solid #065f65",
            marginRight: "5px",
          }}
          variant="light"
          size="small"
        >
          <img
            src="/img/LAI.svg"
            width="25px"
            margin-right="5px"
            alt="leaf area index"
          />
        </Button>
        <Button
          style={{
            padding: "3px",
            border: "1px solid #065f65",
            marginRight: "5px",
          }}
          variant="light"
          size="small"
        >
          <img
            src="/img/Panoramic.svg"
            width="25px"
            margin-right="10px"
            alt="panorama"
          />
        </Button>
        <Button
          style={{
            padding: "3px",
            border: "1px solid #065f65",
            marginRight: "5px",
          }}
          variant="light"
          size="small"
        >
          <img
            src="/img/phenocam.svg"
            width="25px"
            margn-right="5px"
            alt="phenocam"
          />
        </Button>
        <Button
          style={{
            padding: "3px",
            border: "1px solid #065f65",
            marginRight: "5px",
          }}
          variant="light"
          size="small"
        >
          <img
            src="/img/photopoint.svg"
            width="25px"
            margin-right="5px"
            alt="photopoint"
          />
        </Button>
        <Link
          style={{ float: "right" }}
          to="gallery"
          smooth={true}
          duration={1000}
        >
          <>
            <style type="text/css">
              {`
                    .btn-flat {
                      background-color: #fff;
                      color:  #00565D;
                      border: 1px solid #00565D;
                    }

                    .btn-flat:hover {
                      background-color: #00565D;
                      color:  #fff;
                      border: 1px solid #00565D;
                    }

                    `}
            </style>
            <Link
              style={{ float: "right" }}
              to="gallery"
              smooth={true}
              duration={1000}
            >
              <Button
                style={{ padding: "6px 7px", border: "1px solid #065f65" }}
                variant="flat"
                size="sm"
              >
                View Images
              </Button>
            </Link>
          </>
        </Link>
      </Popup> */}
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
          Image Type:
          {" "}
          <a
            className="tool-tip-link"
            href="www.tern.org"
          >
            {images}
          </a>
          {" "}
          <br />
          Plot:
          {" "}
          <a
            className="tool-tip-link"
            href="www.tern.org"
          >
            {plot}
          </a>
          {" "}
          <br />
          Visit:
          {" "}
          <a
            className="tool-tip-link"
            href="www.tern.org"
          >
            {site_visit_id}
          </a>
          {" "}
          <br />
        </div>
      </Tooltip>
    </Marker>
  );
};

ImageMarker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  plot: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  site_visit_id: PropTypes.string.isRequired,
  sitePosition: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ImageMarker;
