// eslint-disable-next-line object-curly-newline
import { isEmpty, uniq } from "lodash";
import {
  all, takeLatest, put, call, select, cancelled,
} from "redux-saga/effects";
import {
  fetchSearchAction,
  fetchSearchDoneAction,
  fetchFacetsAction,
  fetchFacetsDoneAction,
  fetchSearchErrorAction,
  fetchVocabsDoneAction,
} from "../reducer";

import { bioimages } from "./api";

/**
 * Convert selected filter values from UI to search parameters for API
 *
 * @param {object} filters - object with search parameters taken from redux store.
 *
 * @returns {object} objet that can be used as parameters for search and facet api.
 */
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
          const img_type_subs = [];
          value.forEach((item) => {
            if (item.value.includes("ancillary.")) {
              const parts = item.value.split(".");
              img_types.push(parts[0]);
              img_type_subs.push(parts[1]);
            } else {
              img_types.push(item.value);
            }
          });
          if (img_types.length > 0) {
            params.image_type = uniq(img_types).join(",");
          }
          if (img_type_subs.length > 0) {
            params.image_type_sub = img_type_subs.join(",");
          }
        } else {
          params[key] = value.map((item) => item.value).join(",");
        }
      }
    } else if (key === "date_range") {
      // start and end date query params
      if (value.start) {
        // params.date_from = value.start.format("YYYY-MM-DD");
        params.date_from = value.start;
      }
      if (value.end) {
        // params.date_to = value.end.format("YYYY-MM-DD");
        params.date_to = value.end;
      }
    } else if (key === "pagination") {
      if (value.page_size) {
        params.page_size = value.page_size;
      }
      if (value.page_num) {
        params.page_num = value.page_num;
      }
    } else if (key === "sort") {
      params.sort_order = value.sort_order;
      params.sort_column = value.sort_column;
    } else {
      // just one value
      // e.g. free text search (key=search_string)
      params[key] = value;
    }
  });
  return params;
}

/**
 * Convert facet search result to structure used in redux store
 *
 * @param {object} data - facet result object returned from API
 * @returns {object} facaet data to put into redux store
 */
function extractFacetResult(data) {
  // TODO: flatten result, to store less data in store ...
  //       pull only things out we are interested in to reduce
  //       amount of browser storage neede (if required)
  const result = { aggregations: {} };
  // result["_shards"] = data["_shards"];
  // TODO: we could do sorting of facet results here, so that ES does not need to do it
  result.aggregations["image_type"] = data.aggregations["image_type"]["image_type"];
  result.aggregations["file_created"] = data.aggregations["file_created"];
  result.aggregations.plot = data.aggregations.plot.plot;
  result.aggregations["site_id"] = data.aggregations["site_id"]["site_id"];
  result.aggregations["site_visit_id"] = data.aggregations["site_visit_id"]["site_visit_id"];
  result.aggregations["file_created"] = data.aggregations["file_created"]["file_created"];
  result.hits = data.hits;
  // result.timed_out = data.timed_out;
  // result.took = data.took;
  return result;
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
  } finally {
    if (yield cancelled()) {
      // ignore if cancelled ... there should be another request in flight
      // TODO: do something useful here?
      // yield put(fetchSearchErrorAction("fetch Search cancelled"));
    }
  }
}

function* fetchFacetsSaga() {
  try {
    // TODO: state may not be accurate at this stage ...
    //       => find a better way to get full set of search parameters
    const filters = yield select((state) => state.ui.searchFilters);
    const params = filtersToParams(filters);
    const { data } = yield call(bioimages.fetchFacets, params);
    const vocabs = yield select((state) => state.search.vocabs);
    // TODO: we probably want to load vocabs regularly / or on page load
    if (isEmpty(vocabs)) {
      const vocab_result = yield all({
        site_id: call(bioimages.fetchVocab, "site_id"),
        image_type: call(bioimages.fetchVocab, "image_type"),
      });
      yield put(fetchVocabsDoneAction({
        site_id: vocab_result.site_id.data,
        image_type: vocab_result.image_type.data,
      }));
    }
    const result = extractFacetResult(data);
    yield put(fetchFacetsDoneAction(result));
  } catch (error) {
    yield put(fetchSearchErrorAction(error.message));
  } finally {
    if (yield cancelled()) {
      // ignore if cancelled ... there should be another request in flight
      // TODO: do something useful here?
      // yield put(fetchSearchErrorAction("fetch Facets cancelled"));
    }
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
