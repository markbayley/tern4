import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  Carousel,
} from "reactstrap";
import { Link } from "react-scroll";
import SearchResult from "./SearchResult";
import BioResultPagination from "./BioResultPagination";
import "./SearchResult.scss";
import NoResults from "./NoResults";
import AppError from "./AppError";

const SearchEngine = ({ embed }) => {
  const data = useSelector((state) => state.search.hits);
  const totalDocuments =
    useSelector((state) => state.search.totalDocuments) || 0;
  const { page_size, page_num } = useSelector(
    (state) => state.ui.searchFilters.pagination
  );

  // TODO: Would be nice to add logic somewhere to send us email
  // if there is error. Will do it later. Just remember!!
  const error = useSelector((state) => state.search.error);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [clickedIndex, setClickedIndex] = useState(0);

  const ShowPagination = () => (
    <div>
      <BioResultPagination
        page_size={page_size}
        page_num={page_num}
        totalDocuments={totalDocuments}
      />
      <Row>
        {data.map((bioImageDocument, index) => (
          <SearchResult
            bioImageDocument={bioImageDocument["_source"]}
            site_id={bioImageDocument["_source"]["site_id"].value}
            key={bioImageDocument["_id"]}
            embed={embed}
            onClick={() => {
              setClickedIndex(index);
            }}
            showCarousel={handleShow}
            totalDocuments={totalDocuments}
            index={index + 1}
          />
        ))}
      </Row>

      {data && data[clickedIndex] && (
        <Modal size="lg" show={show} onHide={handleClose}>
          <ModalHeader closeButton className="modal-header">
            <ModalHeader>
              {" "}
              <Col sm={2} className="modal-column">
                <NavbarBrand>
                  <div className="site-branding">
                    <Link to="/">
                      <img src="/img/logo@3x.png" alt="" />
                    </Link>
                  </div>
                </NavbarBrand>
              </Col>
              <Col className="modal-info" sm={5}>
                <h6>
                  {data[clickedIndex]["_source"].site_id.label
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
                  <br />
                  {data[clickedIndex]["_source"].image_type.value.replace(
                    "lai",
                    "Leaf Area Index"
                  )}{" "}
                  <br />
                  Plot:{" "}
                  {data[clickedIndex]["_source"].plot.value
                    .replace("_", " ")
                    .replace("=", " ")
                    .replace("value", " ")
                    .replace(".", " ")
                    .replace("id", " ")
                    .replace("_", " ")}{" "}
                  <br />
                  Site Visit ID:
                  {data[clickedIndex]["_source"].site_visit_id}
                  <br />
                  {data[clickedIndex]["_source"].index}/{page_size}
                  {/* {data[clickedIndex]["_source"].doc_count} */}
                </h6>
              </Col>
            </ModalHeader>
          </ModalHeader>
          <hr className="modal-line" />
          <ModalBody>
            <Carousel>
              {data
                .slice(clickedIndex)
                .concat(data.slice(0, clickedIndex - 1))
                .map((bioImageDocument) => (
                  <Carousel.Item>
                    <img
                      fluid
                      className=""
                      src={bioImageDocument["_source"].preview_urls[0].url}
                      key={bioImageDocument["_id"]}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
            {/* <FormGroup check className="center modal-select">
        <Label check>
          <Input type="checkbox" />{' '}
          Check me out
        </Label>
      </FormGroup> */}
          </ModalBody>
          <br />
          <ModalFooter>
            <Button variant="login" onClick={handleClose}>
              Close
            </Button>
            <Button variant="login" onClick={handleClose}>
              Download
            </Button>
          </ModalFooter>
        </Modal>
      )}

      <BioResultPagination
        page_size={page_size}
        page_num={page_num}
        totalDocuments={totalDocuments}
      />
    </div>
  );

  if (error) {
    return (
      <AppError />
    );
  } if (totalDocuments === 0) {
    return <NoResults />;
  }
  return <ShowPagination />;
};

SearchEngine.propTypes = {
  embed: PropTypes.bool,
  handleShow: PropTypes.func,
};

SearchEngine.defaultProps = {
  embed: false,
  handleShow: null,
};

export default SearchEngine;
