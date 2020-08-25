import { createAction, combineReducers, createReducer } from "@reduxjs/toolkit";

export const fetchSearchAction = createAction("FETCH_SEARCH");
export const fetchSearchDoneAction = createAction("FETCH_SEARCH_DONE");
export const fetchSearchErrorAction = createAction("FETCH_SEARCH_ERROR");
export const selectedFilterAction = createAction("SELECTED_FILTER");
export const fetchFacetsAction = createAction("FETCH_FACETS");
export const fetchFacetsDoneAction = createAction("FETCH_FACETS_DONE");
export const paginationAction = createAction("PAGINATION");
export const paginationPageSizeAction = createAction("PAGINATION_PAGE_SIZE");

const initialSearchState = {
  error: null,
  isLoadingSearch: true,
  hits: [],
  totalDocuments: null,
  selectedFilter: {},
  pagination: { page_size: 32, page_num: 1 },
  // facet values and counts
  facets: {
    site_id: { buckets: [] },
    plot: { buckets: [] },
    site_visit_id: { buckets: [] },
    image_type: { buckets: [] },
  },
};

const searchReducer = createReducer(initialSearchState, {
  [fetchSearchAction]: (state, action) => {
    state.isLoadingSearch = true;
    state.selectedFilter = action.payload;
  },
  [fetchSearchDoneAction]: (state, action) => {
    state.isLoadingSearch = false;
    const { hits, page_num, page_size } = action.payload;
    if (hits) { // Null, Undefined, Empty, Whatever .... All Means No Results
      state.hits = hits.hits;
      state.totalDocuments = hits.total.value;
      // state.page_num = page_num;
      // state.page_size = page_size;
      state.pagination = { page_size, page_num };
    }
  },
  [fetchSearchErrorAction]: (state, action) => {
    state.isLoadingSearch = false;
    state.error = action.payload;
  },
  [selectedFilterAction]: (state, action) => {
    const updateSelectedFilter = { ...state.pagination, ...action.payload };
    state.selectedFilter = { ...updateSelectedFilter };
  },
  [fetchFacetsDoneAction]: (state, action) => {
    const { aggregations } = action.payload;
    state.facets = aggregations;
  },
  [paginationAction]: (state, action) => {
    const updateSelectedFilter = { ...state.selectedFilter, ...action.payload };
    state.selectedFilter = { ...updateSelectedFilter };
  },
  [paginationPageSizeAction]: (state, action) => {
    const updateSize = { ...state.pagination, ...action.payload };
    state.pagination = { ...updateSize };
    state.selectedFilter = { ...state.selectedFilter, ...state.pagination };
  },
});

export const setSearchModeAction = createAction("SET_SEARCH_MODE");
export const updateFilterAction = createAction("UPDATE_SEARCH_FILTER");

// UI state reducers
const initialUiState = {
  searchResults: {
    searchMode: "Map",
  },
  searchFilters: {
    search_string: "",
    site_id: [],
    plot: [],
    site_visit_id: [],
    image_type: [],
    date_range: {
      start: null,
      end: null,
    },
  },
};

const uiReducer = createReducer(initialUiState, {
  [setSearchModeAction]: (state, action) => {
    state.searchResults.searchMode = action.payload;
  },
  // updateFilterAction leaves filters not mentioned in payload unchanged
  [updateFilterAction]: (state, action) => {
    Object.assign(state.searchFilters, action.payload);
  },
});

export const rootReducer = combineReducers({
  search: searchReducer,
  ui: uiReducer,
});

// Add Selector function (using memoization)
// TODO look at it later
// export const getSelectedFilter = createSelector(
//   (state) => state.search.selectedFilter,
//   (state) => state.search.pagination,
//   (selectedFilter, pagination) => ({ ...selectedFilter, ...pagination })
// );
