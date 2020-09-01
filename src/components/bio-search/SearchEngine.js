import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import { useSelector } from "react-redux";
import SearchResult from "./SearchResult";
import BioResultPagination from "./BioResultPagination";
import "./SearchResult.scss";
import NoResults from "./NoResults";
import AppError from "./AppError";

const SearchEngine = ({ embed, handleShow }) => {
  const data = useSelector((state) => state.search.hits);
  const totalDocuments = useSelector((state) => state.search.totalDocuments) || 0;
  const { page_size, page_num } = useSelector(
    (state) => state.ui.searchFilters.pagination,
  );

  // TODO: Would be nice to add logic somewhere to send us email
  // if there is error. Will do it later. Just remember!!
  const error = useSelector((state) => state.search.error);

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
            showCarousel={handleShow}
            totalDocuments={totalDocuments}
            index={index + 1}
          />
        ))}
      </Row>
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
