/* eslint-disable no-nested-ternary */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import {
  updateFilterAction,
  fetchFacetsAction,
  fetchSearchAction,
} from "../../store/reducer";
import { facetColourStyles } from "./facetColourStyles";

const SelectFacet = ({ facet, ...props }) => {
  const dispatch = useDispatch();

  // currently selected facets
  const selected = useSelector((state) => state.ui.searchFilters[facet]);
  // facet data as returned by ES
  const facets = useSelector((state) => state.search.facets[facet]);
  // vocabulary with labels for facet values
  const vocab = useSelector((state) => get(state.search.vocabs, facet, null));

  const selectedValues = new Set(selected.map((item) => item.value));

  // build list of options for select widget
  const cur_value = [];
  const options = facets.buckets.map((item) => {
    const count = item.doc_count;
    const value = item.key;
    const label = get(vocab, `${item.key}.label`, item.key);
    const option = {
      label,
      value,
      count,
    };
    if (selectedValues.has(value)) {
      cur_value.push(option);
    }
    return option;
  });

  const handleChange = (items) => {
    // update state
    if (items === null) {
      dispatch(updateFilterAction({ [facet]: [] }));
    } else {
      dispatch(updateFilterAction({ [facet]: items }));
    }
    // update facets
    dispatch(fetchFacetsAction());
    // trigger search
    dispatch(fetchSearchAction());
  };

  return (
    <Select
      className="mb-4 facet"
      isMulti
      options={options}
      value={cur_value}
      isSearchable
      autoFocus
      onChange={handleChange}
      styles={facetColourStyles}
      getOptionLabel={(option) => `${option.label} (${option.count})`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

SelectFacet.propTypes = {
  facet: PropTypes.string.isRequired,
};

export default SelectFacet;
