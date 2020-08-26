import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Pagination, PaginationItem, PaginationLink,
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
  const { page_size, page_num } = useSelector((state) => state.ui.searchFilters.pagination);
  const dispatch = useDispatch();

  // if (loading) {
  //   return (
  //     <Spinner animation="border" role="status">
  //       <span className="sr-only">Loading...</span>
  //     </Spinner>
  //   );
  // }

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
    dispatch(updateFilterAction({ pagination: { page_size: value, page_num } }));
    // trigger search
    dispatch(fetchSearchAction());
  };

  const ShowPagination = () => (
    <div>
      <Row>
        {data.map((bioImageDocument) => (
          <SearchResult
            bioImageDocument={bioImageDocument["_source"]}
            site_id={bioImageDocument["_source"]["site_id"].value}
            key={bioImageDocument["_id"]}
            embed={embed}
          />
        ))}

      </Row>
      <Row className="pagination-row">
        <Pagination className="pagination">
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle caret color="pageitems" id="dropdown-basic-button" className="pageitems">
                {`${page_size} per page`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handlePageSizeChange(18)}>18 per page</DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(36)}>36 per page</DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(54)}>54 per page</DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(102)}>102 per page</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <PaginationItem onClick={(e) => changePage(1, e)}>
            <PaginationLink first>
              First
            </PaginationLink>
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
                      <PaginationLink>
                        {page.id}
                      </PaginationLink>
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
