import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { Button } from "react-bootstrap";
import { Link, scroller, animateScroll as scroll } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchAction, selectedFilterAction } from "../../store/reducer";

const ImageMarker = (props) => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state) => state.search.selectedFilter);

  const handleFilter = () => {
    console.log("in ImageMarker. handleFitlter()");
    const addFilter = { site_id: props.siteLocation };
    // Add filter
    const updatedFilter = { ...selectedFilter, ...addFilter };
    console.log("updatedFilter=", updatedFilter);
    // dispatch(fetchSearchAction({ selectedFilter: updatedFilter }));
    dispatch(selectedFilterAction(updatedFilter));
  };

  return (
    <Marker
      icon={L.divIcon({
        html: `  `,
        className: "custom-marker",
        iconSize: L.point(33, 33, true),
        tooltipAnchor: [20, 0],
      })}
      key={props.id}
      position={props.sitePosition}
      // onClick={handleFilter}
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
        <strong>
          {/* <h6>Click the marker to select this site</h6> */}
        </strong>
        Site Id:{" "}
        <a
          href="www.tern.org"
          style={{ textTransform: "capitalize", color: "#065f65" }}
        >
          {props.siteLocation}{" "}
        </a>{" "}
        <br />
        Image Types:{" "}
        <a
          href="www.tern.org"
          style={{ textTransform: "capitalize", color: "#065f65" }}
        >
          {props.value}
        </a>{" "}
        <br />
        <img
          src="/img/LAI.svg"
          width="25px"
          margin-right="5px"
          alt="leaf area index"
        />
        <img
          src="/img/Panoramic.svg"
          width="25px"
          margin-right="10px"
          alt="panorama"
        />
        <img
          src="/img/phenocam.svg"
          width="25px"
          margn-right="5px"
          alt="phenocam"
        />
        <img
          src="/img/photopoint.svg"
          width="25px"
          margin-right="5px"
          alt="photopoint"
        />
      </Tooltip>
    </Marker>
  );
};
export default ImageMarker;
