import { createAction, combineReducers, createReducer } from "@reduxjs/toolkit";

export const fetchSearchAction = createAction("FETCH_SEARCH");
export const fetchSearchDoneAction = createAction("FETCH_SEARCH_DONE");
export const fetchSearchErrorAction = createAction("FETCH_SEARCH_ERROR");
export const fetchFacetsAction = createAction("FETCH_FACETS");
export const fetchFacetsDoneAction = createAction("FETCH_FACETS_DONE");

const initialSearchState = {
  error: null,
  isLoadingSearch: true,
  hits: [],
  totalDocuments: null,
  // facet values and counts
  facets: {
    site_id: { buckets: [] },
    plot: { buckets: [] },
    site_visit_id: { buckets: [] },
    image_type: { buckets: [] },
  },
};

const searchReducer = createReducer(initialSearchState, {
  [fetchSearchAction]: (state) => {
    state.isLoadingSearch = true;
  },
  [fetchSearchDoneAction]: (state, action) => {
    state.isLoadingSearch = false;
    const { hits, page_num, page_size } = action.payload;
    if (hits) {
      // Null, Undefined, Empty, Whatever .... All Means No Results
      state.hits = hits.hits;
      state.totalDocuments = hits.total.value;
      state.pagination = { page_size, page_num };
    }
  },
  [fetchSearchErrorAction]: (state, action) => {
    state.isLoadingSearch = false;
    state.error = action.payload;
  },
  [fetchFacetsDoneAction]: (state, action) => {
    const { aggregations } = action.payload;
    state.facets = aggregations;
  },
});

export const setSearchModeAction = createAction("SET_SEARCH_MODE");
export const updateFilterAction = createAction("UPDATE_SEARCH_FILTER");

// UI state reducers
const initialUiState = {
  searchResults: {
    searchMode: "Images",
  },
  searchFilters: {
    search_string: "",
    site_id: [],
    plot: [],
    site_visit_id: [],
    image_type: [],
    date_range: {
      start: "",
      end: "",
    },
    pagination: {
      page_size: 24,
      page_num: 1,
    },
    sort: {
      sort_order: "asc",
      sort_column: "file_created",
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
