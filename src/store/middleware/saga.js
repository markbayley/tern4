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
      yield put(fetchSearchErrorAction("fetch Search cancelled"));
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
    // TODO: flatten result, to store less data in store ...
    //       pull only things out we are interested in
    // TODO: sort hits.hits.hits._source here as well ... don't let ES do it
    const vocabs = yield select((state) => state.search.vocabs);
    // TODO: need an isEm
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
    // TODO: improve code here ... it's not obvious what's going on here
    const result = {};
    result["_shards"] = data["_shards"];
    const aggs = {};
    result.aggregations = aggs;
    aggs["image_type"] = data.aggregations["image_type"]["image_type"];
    aggs["file_created"] = data.aggregations["file_created"];
    aggs.plot = data.aggregations.plot.plot;
    aggs["site_id"] = data.aggregations["site_id"]["site_id"];
    aggs["site_visit_id"] = data.aggregations["site_visit_id"]["site_visit_id"];
    aggs["file_created"] = data.aggregations["file_created"]["file_created"];
    result.hits = data.hits;
    result.timed_out = data.timed_out;
    result.took = data.took;
    yield put(fetchFacetsDoneAction(result));
  } catch (error) {
    yield put(fetchSearchErrorAction(error.message));
  } finally {
    if (yield cancelled()) {
      yield put(fetchSearchErrorAction("fetch Facets cancelled"));
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
