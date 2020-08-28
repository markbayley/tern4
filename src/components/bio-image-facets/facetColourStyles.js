/* eslint-disable no-nested-ternary */
import chroma from "chroma-js";

/* Sidebar Styles */
export const facetColourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    fontSize: "16px",
  }),
  option: (styles, {
    data, isDisabled, isFocused, isSelected,
  }) => {
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
