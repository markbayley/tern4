/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Col,
  Button,
  Form,
  Input,
  Label,
  Card,
  NavbarBrand,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledCarousel,
} from "reactstrap";
import { Link } from "react-scroll";

import "./SearchResult.scss";

const SearchResult = ({
  bioImageDocument,
  site_id,
  embed,
  showCarousel,
  totalDocuments,
  index,
}) => {
  let img_url_small = null;
  let img_url_large = null;
  if (bioImageDocument.preview_urls.length !== 0) {
    img_url_small = bioImageDocument.preview_urls[1].url;
    img_url_large = bioImageDocument.preview_urls[0].url;
  }

  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const items = [
    {
      key: 1,
      src: img_url_large,
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      key: 2,
      src: img_url_large,
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      key: 3,
      src: img_url_large,
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];
  return (
    <Col
      xl={embed ? 7 : 2}
      lg={embed ? 7 : 3}
      md={embed ? 12 : 4}
      sm={12}
      xs={12}
    >
      <Modal size="lg" isOpen={show} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="div">
          {" "}
          <Col sm={2} className="modal-column">
            <NavbarBrand tag="span">
              <div className="site-branding">
                <Link to="/">
                  <img src="/img/logo@3x.png" alt="" />
                </Link>
              </div>
            </NavbarBrand>
          </Col>
          <Col className="modal-info" sm={5}>
            <h6>
              {bioImageDocument.site_id.label
                .replace("_", " ")
                .replace("=", " ")
                .replace("value", " ")
                .replace(".", " ")
                .replace("id", " ")
                .replace("_", " ")
                .replace("alic", "Alice Mulga")
                .replace("capetrib", "Cape Tribulation")
                .replace("cblp", "Cumberland Plain")
                .replace("clpm", "Calperum Mallee")
                .replace("fnqr robson", "Robson Creek")
                .replace("gwwl", "Great Western Woodlands")
                .replace("lfld", "Litchfield")
                .replace("mgrl", "Mitchell Grass Rangeland")}
              {" "}
              <br />
              {bioImageDocument.image_type.value.replace(
                "lai",
                "Leaf Area Index",
              )}
              {" "}
              <br />
              Plot:
              {" "}
              {bioImageDocument.plot.value
                .replace("_", " ")
                .replace("=", " ")
                .replace("value", " ")
                .replace(".", " ")
                .replace("id", " ")
                .replace("_", " ")}
              {" "}
              <br />
              Date:
              {" "}
              {bioImageDocument.site_visit_id}
              <br />
              {index}
              /
              {totalDocuments}
            </h6>
          </Col>
          {/* </Modal.Title> */}
        </ModalHeader>
        <hr className="modal-line" />
        <ModalBody>
          {/* currently has a bug where it auto activates autoPlay... needs rework anyway */}
          <UncontrolledCarousel items={items} autoPlay={false} />
          {" "}
          <br />
          <Form className="center modal-select">
            {["checkbox"].map((type) => (
              // <div key={bioImageDocument.id} className="mb-3">
              <div key={type} className="mb-3">
                <Label check>
                  <Input type={type} id={bioImageDocument.id} key={type} />
                  Add To Selected Images?
                </Label>
              </div>
            ))}
          </Form>
          <p />
        </ModalBody>
        <ModalFooter>
          <Button color="login" onClick={toggle}>
            Close
          </Button>
          <Button color="login" onClick={toggle}>
            Download
          </Button>
        </ModalFooter>
      </Modal>

      <Card id={site_id} className="image-card">
        <div className="hvrbox">
          <Button color="flat" className="image-card-button" onClick={toggle}>
            <img
              className="small_preview img-fluid"
              onClick={toggle}
              onKeyPress={() => {}}
              role="presentation"
              src={img_url_small}
              alt=""
            />
            <img
              className="large_preview img-fluid"
              onClick={toggle}
              onKeyPress={() => {}}
              role="presentation"
              src={img_url_large}
              alt=""
            />
            <div className="hvrbox-layer_top">
              <div className="hvrbox-text">
                View Image?
                {" "}
                {/* {site_id.replace("_", " ")
                  .replace("=", " ")
                  .replace("value", " ")
                  .replace(".", " ")
                  .replace("id", " ")
                  .replace("_", " ")
                  .replace("alic", "Alice Mulga")
                  .replace("capetrib", "Cape Tribulation")
                  .replace("cblp", "Cumberland Plain")
                  .replace("clpm", "Calperum Mallee")
                  .replace("fnqr robson", "Robson Creek")
                  .replace("gwwl", "Great Western Woodlands")
                  .replace("lfld", "Litchfield")
                  .replace("mgrl", "Mitchell Grass Rangeland")
                  .replace("lai ", "Leaf Area Index")} */}
                <br />
                <img
                  src="/img/icons/Bioimages icon.svg"
                  alt="bioimages icon"
                  width="100px"
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
                  <Input type={type} id={bioImageDocument.id} />
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
  bioImageDocument: PropTypes.objectOf(PropTypes.any).isRequired,
  site_id: PropTypes.string.isRequired,
  embed: PropTypes.bool,
  totalDocuments: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  showCarousel: PropTypes.func,
};

SearchResult.defaultProps = {
  embed: false,
  showCarousel: null,
};

export default SearchResult;
