// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilterAction, fetchSearchAction } from "../../store/reducer";

const BioResultPagination = ({ itemsPerPage, startFrom, totalImages }) => {
  const perPage = itemsPerPage || 10;
  const pages = Math.ceil(totalImages / perPage);
  const pagination = [];

  const currentPage = startFrom <= pages ? startFrom : 1;
  const dispatch = useDispatch();

  let ellipsisLeft = false;
  let ellipsisRight = false;
  for (let i = 1; i <= pages; i += 1) {
    if (i === currentPage) {
      pagination.push({ id: i, current: true, ellipsis: false });
    } else if (
      i < 10
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
      dispatch(updateFilterAction({ pagination: { page_size: itemsPerPage, page_num: page } }));
      dispatch(fetchSearchAction());
    }
  };

  const goToPrevPage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      dispatch(updateFilterAction(
        { pagination: { page_size: itemsPerPage, page_num: currentPage - 1 } },
      ));
      dispatch(fetchSearchAction());
    }
  };

  const goToNextPage = (e) => {
    e.preventDefault();
    if (currentPage !== pages) {
      dispatch(updateFilterAction(
        { pagination: { page_size: itemsPerPage, page_num: currentPage + 1 } },
      ));
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

export default BioResultPagination;
