import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Card, Button, Col, Form } from "reactstrap";
import "./SearchResult.scss";
import { showImagePreviewAction } from "../../store/reducer";

const SearchResult = ({
  imageIdx,
  embed,
}) => {
  const dispatch = useDispatch();
  const bioImageDocument = useSelector((state) => state.search.hits[imageIdx]["_source"]);
  const img_url_small = bioImageDocument.preview_urls[1].url;
  const img_url_large = bioImageDocument.preview_urls[0].url;

  const site_id = bioImageDocument["site_id"].value;

  const showImagePreview = (idx) => dispatch(showImagePreviewAction(idx));

  return (
    <Col
      xl={embed ? 7 : 2}
      lg={embed ? 7 : 3}
      md={embed ? 12 : 4}
      sm={12}
      xs={12}
    >
      <Card id={site_id} className="image-card">
        <div className="hvrbox">
          <Button
            color="flat"
            className="image-card-button"
            onClick={() => showImagePreview(imageIdx)}
            style={{
              width: "100%",
              height: "0",
              paddingTop: "70%",
              backgroundImage: `url(${img_url_small})`,
              backgroundSize: "cover",
            }}
          >
            <img
              className="small_preview img-fluid"
              src={img_url_small}
              alt="small preview"
              onKeyPress={() => { }}
              role="none"
            />
            <img
              className="large_preview img-fluid"
              src={img_url_large}
              alt="large preview"
              onKeyPress={() => { }}
              role="none"
            />
            <div className="hvrbox-layer_top">
              <div className="hvrbox-text">
                View Image?
                {" "}
                <br />
                <img
                  src="/img/icons/Bioimages icon.svg"
                  alt="bioimages icon"
                  width="80px"
                />
                {" "}
                <br />
                <span className="center" />
              </div>
            </div>
            {" "}
            <div className="thumbnail-text">
              {/* <strong>Site:</strong>  */}
              {bioImageDocument.site_id.label}
              <br />
              {/* <strong>Image Type:</strong> */}
              {" "}
              {bioImageDocument.image_type.value[0].toUpperCase()
                + bioImageDocument.image_type.value.substr(1)}
              {" "}
              <img
                src="/img/phenocam.svg"
                width="20px"
                alt="phenocam"
                style={{
                  border: ".5px solid orange",
                  borderRadius: "20px",
                  padding: "2px",
                  marginBottom: "5px",
                }}
              />
            </div>
            <Form className="center image-form">
              {["checkbox"].map((type) => (
                <div className="image-checkbox" key={type}>
                  {/* <Form.Check inline type={type} id={bioImageDocument.id} /> */}
                </div>
              ))}
            </Form>
            {/* <strong>Image Count:</strong> {bioImageDocument.doc_count}{" "}  */}
            {/* <strong>Plot:</strong> {bioImageDocument.plot.value}{" "} */}
            {/* <strong>Visit:</strong> {bioImageDocument.site_visit_id}{" "} */}
          </Button>
        </div>
      </Card>
      {/* </div>  */}
    </Col>
  );
};

SearchResult.propTypes = {
  imageIdx: PropTypes.number.isRequired,
  embed: PropTypes.bool,
};

SearchResult.defaultProps = {
  embed: false,
};

export default SearchResult;
