// eslint-disable-next-line object-curly-newline
import { all, takeLatest, put, call, select } from "redux-saga/effects";
import {
  fetchSearchAction,
  fetchSearchDoneAction,
  fetchFacetsAction,
  fetchFacetsDoneAction,
  fetchSearchErrorAction,
} from "../reducer";

import { bioimages } from "./api";

function filtersToParams(filters) {
  const params = {};
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (!value) {
      // ignore any non values
      return;
    }
    if (Array.isArray(value)) {
      if (value.length > 0) {
        // join all values into comma separated string
        if (key === "image_type") {
          // need some special handling for image_sub_types
          const img_types = [];
          const img_sub_types = [];
          value.forEach((item) => {
            if (item.value.includes("ancillary.")) {
              const parts = item.value.split(".");
              img_types.push(parts[0]);
              img_sub_types.push(parts[1]);
            } else {
              img_types.push(item.value);
            }
          });
          if (img_types.length > 0) {
            params.image_type = img_types.join(",");
          }
          if (img_sub_types.length > 0) {
            params.image_sub_type = img_sub_types.join(",");
          }
        } else {
          params[key] = value.map((item) => item.value).join(",");
        }
      }
    } else if (key === "date_range") {
      // start and end date query params
      if (value.start) {
        params.date_from = value.start.format("YYYY-MM-DD");
      }
      if (value.end) {
        params.date_to = value.end.format("YYYY-MM-DD");
      }
    } else if (key === "pagination") {
      if (value.page_size) {
        params.page_size = value.page_size;
      }
      if (value.page_num) {
        params.page_num = value.page_num;
      }
    } else {
      // just one value
      params[key] = value;
    }
  });
  return params;
}

function* fetchSearchSaga() {
  try {
    // TODO: state may not be accurate at this stage ...
    //       => find a better way to get full set of search parameters
    const filters = yield select((state) => state.ui.searchFilters);
    const params = filtersToParams(filters);
    const { data } = yield call(bioimages.fetchSearch, params);
    yield put(fetchSearchDoneAction(data));
  } catch (error) {
    yield put(fetchSearchErrorAction(error.message));
  }
}

function* fetchFacetsSaga() {
  try {
    // TODO: state may not be accurate at this stage ...
    //       => find a better way to get full set of search parameters
    const filters = yield select((state) => state.ui.searchFilters);
    const params = filtersToParams(filters);
    const { data } = yield call(bioimages.fetchFacets, params);
    yield put(fetchFacetsDoneAction(data));
  } catch (error) {
    yield put(fetchSearchErrorAction(error.message));
  }
}

function* watchFetchFacetsSaga() {
  yield takeLatest(fetchFacetsAction.type, fetchFacetsSaga);
}

function* watchFetchSearchSaga() {
  yield takeLatest(fetchSearchAction.type, fetchSearchSaga);
}

export function* rootSaga() {
  // TODO: we probably want to run both sagas always together ....
  //       => handle double call here instead of when invoking actions
  //          makes it also easier to use the same filters / params and
  //          call the filtersToParams only once
  yield all([watchFetchSearchSaga(), watchFetchFacetsSaga()]);
}
