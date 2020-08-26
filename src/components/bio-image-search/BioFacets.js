/* eslint-disable no-nested-ternary */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { startCase } from "lodash";
import chroma from "chroma-js";
import DateRangeFacet from "./DateRangeFacet";
import {
  fetchSearchAction,
  fetchFacetsAction,
  updateFilterAction,
} from "../../store/reducer";

/* Sidebar Styles */
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    fontSize: "16px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = "#ED694B";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? "B3D4C9"
        : null,
      color: isDisabled
        ? "#ED694B"
        : isSelected
        ? chroma.contrast(color, "#ED694B") > 2
          ? "#ED694B"
          : "#ED694B"
        : data.color,
      fontSize: isFocused ? "16px" : isSelected ? "20px" : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        backgroundColor: !isDisabled && (isSelected ? data.color : "#ED694B"),
        color: "#ED694B",
      },
      ":hover": {
        backgroundColor: "#B3D4C9",
        // color: '#fff'
      },
    };
  },
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#B3D4C9",
    color: "#00565D",
    fontSize: "18.5px",
  }),
};

const SelectFacet = ({ facet, ...props }) => {
  const dispatch = useDispatch();

  // currently selected facets
  const selected = useSelector((state) => state.ui.searchFilters[facet]);
  // facet data as returned by ES
  const facets = useSelector((state) => state.search.facets[facet]);

  const selectedValues = new Set(selected.map((item) => item.value));

  // build list of options for select widget
  const cur_value = [];
  const options = facets.buckets.map((item) => {
    const count = item.doc_count;
    const value = item.key;
    let label = item.key;
    if (item.hits) {
      label = item.hits.hits.hits[0]["_source"][facet].label;
    }
    const option = {
      // TODO: can we have separate label and count, and use a custom component to render option?
      label: `${label}(${count})`,
      value,
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
      styles={colourStyles}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

SelectFacet.propTypes = {
  facet: PropTypes.string.isRequired,
};

const ImageTypeFacet = ({ facet, ...props }) => {
  const dispatch = useDispatch();

  // currently selected facets
  const selected = useSelector((state) => state.ui.searchFilters[facet]);
  // facet data as returned by ES
  const facets = useSelector((state) => state.search.facets[facet]);

  const selectedValues = new Set(selected.map((item) => item.value));

  // build list of options for select widget
  const cur_value = [];
  const options = facets.buckets.flatMap((item) => {
    const count = item.doc_count;
    const value = item.key;

    const { label } = item.hits.hits.hits[0]["_source"][facet];
    if (value === "ancillary") {
      return item["image_type_sub"].buckets.map((sub_type) => {
        const subCount = sub_type.doc_count;
        const subValue = `ancillary.${sub_type.key.replace(/%20/gi, " ")}`;
        const subLabel = `${label}[${startCase(
          sub_type.key.replace(/%20/gi, " ")
        )}]`;
        const option = {
          label: `${subLabel}(${subCount})`,
          value: subValue,
        };
        if (selectedValues.has(subValue)) {
          cur_value.push(option);
        }
        return option;
      });
    }
    const option = {
      // TODO: can we have separate label and count, and use a custom component to render option?
      label: `${label}(${count})`,
      value,
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
      styles={colourStyles}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

ImageTypeFacet.propTypes = {
  facet: PropTypes.string.isRequired,
};

const BioFacets = () => (
  <div>
    <SelectFacet facet="site_id" placeholder="Select Sites" />
    <SelectFacet facet="plot" placeholder="Select Plots" />
    <SelectFacet facet="site_visit_id" placeholder="Select Site Visit Ids" />
    <ImageTypeFacet facet="image_type" placeholder="Select Image Types" />
    <DateRangeFacet />
  </div>
);

export default BioFacets;
