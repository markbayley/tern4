/* eslint no-alert: "off" */
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Carousel,
  Modal,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "./SearchResult";
import BioResultPagination from "./BioResultPagination";
import { updateFilterAction, fetchSearchAction } from "../../store/reducer";
import "./SearchResult.scss";
import NoResults from "./NoResults";

const SearchEngine = ({ embed }) => {
  const data = useSelector((state) => state.search.hits);
  const totalDocuments = useSelector((state) => state.search.totalDocuments);
  const { page_size, page_num } = useSelector(
    (state) => state.ui.searchFilters.pagination
  );
  const { sort_order, sort_column } = useSelector(
    (state) => state.ui.searchFilters.sort
  );
  const dispatch = useDispatch();

  const {
    pagination,
    pages,
    prevPage,
    nextPage,
    changePage,
  } = BioResultPagination({
    itemsPerPage: page_size,
    startFrom: page_num,
    totalImages: totalDocuments,
  });

  const handlePageSizeChange = (value) => {
    dispatch(
      updateFilterAction({ pagination: { page_size: value, page_num } })
    );
    // trigger search
    dispatch(fetchSearchAction());
  };

  const handleSortBy = (value) => {
    // TODO: Implement it
    alert(`Not implemented yet!! ${value}`);
  };
  const handleSortOrder = (value) => {
    // TODO: Implement it.
    alert(`Not implemented yet!! ${value}`);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ShowPagination = () => (
    <div>
      <Row>
        {data.map((bioImageDocument) => (
          <SearchResult
            bioImageDocument={bioImageDocument["_source"]}
            site_id={bioImageDocument["_source"]["site_id"].value}
            key={bioImageDocument["_id"]}
            embed={embed}
            showCarousel={handleShow}
          />
        ))}
      </Row>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Body>
            <Carousel>
              {data.map((bioImageDocument) => (
                <Carousel.Item>
                  <img
                    fluid
                    className="d-block w-100"
                    src={bioImageDocument["_source"].preview_urls[0].url}
                    key={bioImageDocument["_id"]}
                    alt="carousel"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
        </Modal.Header>
      </Modal>

      <Row className="pagination-row">
        <Pagination className="pagination">
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                {`Sort By:${sort_column}`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleSortBy("file_created")}>
                  File Created
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("image_type")}>
                  Image Type
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("site_id")}>
                  Site Id
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("plot")}>
                  Plot Name
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("site_visit_id")}>
                  Site Visit Id
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("camera_make")}>
                  Camera Make
                </DropdownItem>
                <DropdownItem onClick={() => handleSortBy("camera_model")}>
                  Camera Model
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                {`Sort Order:${sort_order}`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleSortOrder("asc")}>
                  asc
                </DropdownItem>
                <DropdownItem onClick={() => handleSortOrder("desc")}>
                  desc
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                {`${page_size} per page`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handlePageSizeChange(24)}>
                  24 per page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(48)}>
                  48 per page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(72)}>
                  72 per page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(96)}>
                  96 per page
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <PaginationItem onClick={(e) => changePage(1, e)}>
            <PaginationLink first>First</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={prevPage}>
            <PaginationLink previous>Previous</PaginationLink>
          </PaginationItem>
          <div className="mobile-pagination">
            {pagination.map((page) => {
              if (!page.ellipsis) {
                return (
                  <div key={page.id} className="pagelink">
                    <PaginationItem
                      key={page.id}
                      active={!!page.current}
                      onClick={(e) => changePage(page.id, e)}
                    >
                      <PaginationLink>{page.id}</PaginationLink>
                    </PaginationItem>
                  </div>
                );
              }
              return (
                <PaginationItem key={page.id}>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              );
            })}
          </div>
          <PaginationItem onClick={nextPage}>
            <PaginationLink next>Next</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={(e) => changePage(pages, e)}>
            <PaginationLink last>Last</PaginationLink>
          </PaginationItem>
        </Pagination>
      </Row>
    </div>
  );

  return totalDocuments === 0 ? <NoResults /> : <ShowPagination />;
};

SearchEngine.propTypes = {
  embed: PropTypes.bool,
};

SearchEngine.defaultProps = {
  embed: false,
};

export default SearchEngine;
