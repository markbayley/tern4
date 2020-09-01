import React from "react";
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
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateFilterAction, fetchSearchAction } from "../../store/reducer";
import "./SearchResult.scss";
import { bioSort } from "./bioSort";

const BioResultPagination = ({ page_size, page_num, totalDocuments }) => {
  const dispatch = useDispatch();

  const { sort_order, sort_column } = useSelector(
    (state) => state.ui.searchFilters.sort,
  );

  const selectedSortColumn = bioSort.sort_columns.filter(
    (column) => column.column_name === sort_column,
  );

  const getPagination = (itemsPerPage, startFrom, totalImages) => {
    const perPage = itemsPerPage || 4;
    const pages = Math.ceil(totalImages / perPage);
    const pagination = [];

    const currentPage = startFrom <= pages ? startFrom : 1;

    let ellipsisLeft = false;
    let ellipsisRight = false;
    for (let i = 1; i <= pages; i += 1) {
      if (i === currentPage) {
        pagination.push({ id: i, current: true, ellipsis: false });
      } else if (
        i < 4
        || i > pages - 1
        || i === currentPage - 1
        || i === currentPage + 1
      ) {
        pagination.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisLeft = true;
      } else if (i < pages && i > currentPage && !ellipsisRight) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisRight = true;
      }
    }

    const changePage = (page, e) => {
      e.preventDefault();
      if (page !== currentPage) {
        dispatch(
          updateFilterAction({
            pagination: { page_size: itemsPerPage, page_num: page },
          }),
        );
        dispatch(fetchSearchAction());
      }
    };

    const goToPrevPage = (e) => {
      e.preventDefault();
      if (currentPage !== 1) {
        dispatch(
          updateFilterAction({
            pagination: { page_size: itemsPerPage, page_num: currentPage - 1 },
          }),
        );
        dispatch(fetchSearchAction());
      }
    };

    const goToNextPage = (e) => {
      e.preventDefault();
      if (currentPage !== pages) {
        dispatch(
          updateFilterAction({
            pagination: { page_size: itemsPerPage, page_num: currentPage + 1 },
          }),
        );
        dispatch(fetchSearchAction());
      }
    };

    return {
      pagination,
      pages,
      prevPage: goToPrevPage,
      nextPage: goToNextPage,
      changePage,
    };
  };

  const {
    pagination, pages, prevPage, nextPage, changePage,
  } = getPagination(
    page_size,
    page_num,
    totalDocuments,
  );

  const handlePageSizeChange = (value) => {
    dispatch(
      updateFilterAction({ pagination: { page_size: value, page_num } }),
    );
    dispatch(fetchSearchAction());
  };

  const handleSortBy = (value) => {
    dispatch(updateFilterAction({ sort: { sort_column: value, sort_order } }));
    dispatch(fetchSearchAction());
  };

  const handleSortOrder = (value) => {
    dispatch(
      updateFilterAction({
        sort: { sort_order: value, sort_column },
      }),
    );
    dispatch(fetchSearchAction());
  };
  return (
    <div >
      <Row className="pagination-row">
        <Pagination size="md" className="pagination">  
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                size="md"
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                Sort By:
                {" "}
                {selectedSortColumn[0].column_label}
              </DropdownToggle>
              <DropdownMenu>
                {bioSort.sort_columns.map((column) => (
                  <DropdownItem
                    key={column.column_name}
                    onClick={() => handleSortBy(column.column_name)}
                  >
                    {column.column_label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                size="md"
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                Sort Order:
                {" "}
                {sort_order}
              </DropdownToggle>
              <DropdownMenu >
                {bioSort.sort_order.map((sort) => (
                  <DropdownItem
                    key={sort}
                    onClick={() => handleSortOrder(sort)}
                  >
                    {sort}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div style={{marginRight: "20px"}}>
            <UncontrolledDropdown className="pageitems">
              <DropdownToggle
                size="md"
                caret
                color="pageitems"
                id="dropdown-basic-button"
                className="pageitems"
              >
                {`${page_size} Images`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handlePageSizeChange(12)}>
                  12 images/page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(24)}>
                  24 images/page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(48)}>
                  48 images/page
                </DropdownItem>
                <DropdownItem onClick={() => handlePageSizeChange(96)}>
                  96 images/page
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
          <Button size="md" color="flat" style={{marginLeft: "20px"}}>
            {/* Showing */}
            {" "}
            {page_size}
            {" "}
            {/* of */}
            /
            {" "}
            {totalDocuments}
            {" "}
            Images
          </Button>
        </Pagination>
   
      </Row>
    </div>
  );
};

BioResultPagination.propTypes = {
  page_size: PropTypes.number.isRequired,
  page_num: PropTypes.number.isRequired,
  totalDocuments: PropTypes.number.isRequired,
};
export default BioResultPagination;
