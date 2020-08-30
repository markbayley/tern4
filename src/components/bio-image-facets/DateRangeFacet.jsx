/* eslint import/no-unassigned-import: "off" */
/* eslint import/no-unused-modules: "off" */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import {
  updateFilterAction,
  fetchFacetsAction,
  fetchSearchAction,
} from "../../store/reducer";
import "react-dates/lib/css/_datepicker.css";
// import moment from "moment";

const DateRangeFacet = () => {
  const dispatch = useDispatch();
  const { start, end } = useSelector((state) => state.ui.searchFilters.date_range);

  const [focus, setFocus] = useState(null);

  const handleOnDateChange = ({ startDate, endDate }) => {
    dispatch(
      updateFilterAction({ date_range: { start: startDate, end: endDate } }),
    );
    // update facets
    dispatch(fetchFacetsAction());
    // trigger search
    dispatch(fetchSearchAction());
  };

  return (
    <>
      <div
        style={{
          // borderRight: "55px solid rgba(149, 219, 199, 0.5)",
          marginLeft: "23px",
        }}
      >
        <h6
          style={{
            paddingTop: "15px",
            color: "lightgrey",
            fontWeight: "500",
          }}
        >
          Date Range
        </h6>
        <DateRangePicker
          small
          noBorder
          // showClearDates
          keepOpenOnDateSelect
          startDateAriaLabel="fff"
          startDate={start}
          startDateId="start_date_id"
          endDate={end}
          endDateId="end_date_id"
          onDatesChange={handleOnDateChange}
          focusedInput={focus}
          onFocusChange={(focusV) => setFocus(focusV)}
          startDatePlaceholderText="Start"
          endDatePlaceholderText="End"
          numberOfMonths={2}
          isOutsideRange={() => false}
        />
      </div>
      <hr
        style={{
          border: "0.5px solid #66b3a6",
          marginTop: "0%",
          marginBottom: "0%",
          marginLeft: "5px",
        }}
      />
    </>
  );
};

export default DateRangeFacet;
