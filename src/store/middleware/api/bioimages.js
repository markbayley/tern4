import axios from "axios";
import { CANCEL } from "redux-saga";
import { CONFIG } from "../../../config";

// TODO: this is not middleware ... it's API ... move to a different module
let client;

// axios client factory ...
// useful in case we want to setup custom interceptors for e.g. regular token refresh etc...
function getClient() {
  if (!client) {
    client = axios.create({
      baseURL: CONFIG.API_BASE_URL,
      validateStatus: (status) => status === 200 || status === 403,
    });
  }
  return client;
}

// helper method to invoke ajax call via axios,
// and set up a cancel token to cancel pending requests if needed.
function callAPI(options) {
  // returns a cancelable promise
  const cancel = axios.CancelToken.source();
  const opts = {
    ...options,
    cancelToken: cancel.token,
  };
  const promise = getClient().request(opts);
  promise[CANCEL] = cancel.cancel;
  return promise;
}

export function fetchFavourites() {
  // Where we're fetching data from
  return callAPI({
    url: "favourites",
  });
}

export function fetchSearch(params) {
  // Where we're fetching data from
  return callAPI({
    url: "search",
    params,
  });
}

export function fetchFacets(params) {
  return callAPI({
    url: "facet",
    params,
  });
}

export function fetchVocab(param) {
  return callAPI({
    url: `vocab/${param}`,
  });
}
