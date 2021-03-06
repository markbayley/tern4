/* eslint-disable no-nested-ternary */
import React from "react";
import { startCase, get } from "lodash";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFilterAction,
  fetchFacetsAction,
  fetchSearchAction,
} from "../../store/reducer";
import { facetColourStyles } from "./facetColourStyles";

const ImageTypeSelectFacet = ({ facet, ...props }) => {
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
  const options = facets.buckets.flatMap((item) => {
    const count = item.doc_count;
    const value = item.key;

    const label = get(vocab, `${value}.label`, facet);
    if (value === "ancillary") {
      return item["image_type_sub"].buckets.map((sub_type) => {
        const subCount = sub_type.doc_count;
        // FIXME: [TERNDA-860] Data corruption needs to be fixed.
        // Ancillary Samford camera trap has string like %/20.
        // Wilma and Andrew need to look at backend data
        const subValue = `ancillary.${sub_type.key.replace(/%20/gi, " ")}`;
        const subLabel = `${label}[${startCase(
          get(vocab, `${value}.${sub_type.key}.label`, sub_type.key).replace(/%20/gi, " "),
        )}]`;
        const option = {
          label: subLabel,
          value: subValue,
          count: subCount,
        };
        if (selectedValues.has(subValue)) {
          cur_value.push(option);
        }
        return option;
      });
    }
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
      // react-select return null if nothing is selected
      dispatch(updateFilterAction({ [facet]: [] }));
    } else {
      dispatch(updateFilterAction({ [facet]: items }));
    }
    // update facets
    dispatch(fetchFacetsAction());
    // trigger search
    dispatch(fetchSearchAction());
  };

  // items: [{label: "", value: ""}, ]
  return (
    <Select
      className="mb-4"
      isMulti
      options={options}
      value={cur_value}
      isSearchable
      autoFocus
      onChange={handleChange}
      styles={facetColourStyles}
      getOptionLabel={(option) => `${option.label}   (${option.count})`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

ImageTypeSelectFacet.propTypes = {
  facet: PropTypes.string.isRequired,
};

export default ImageTypeSelectFacet;
