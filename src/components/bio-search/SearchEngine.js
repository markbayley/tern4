import React from "react";
import PropTypes from "prop-types";
import { Row } from "reactstrap";
import { useSelector } from "react-redux";
import SearchResult from "./SearchResult";
import BioResultPagination from "./BioResultPagination";
import "./SearchResult.scss";
import NoResults from "./NoResults";

const SearchEngine = ({ embed, handleShow }) => {
  const data = useSelector((state) => state.search.hits);
  const totalDocuments = useSelector((state) => state.search.totalDocuments) || 0;
  const { page_size, page_num } = useSelector(
    (state) => state.ui.searchFilters.pagination,
  );

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

  return totalDocuments === 0 ? <NoResults /> : <ShowPagination />;
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
