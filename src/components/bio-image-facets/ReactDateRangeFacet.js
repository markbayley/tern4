import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import moment from "moment";
import { Container, Row } from "reactstrap";
import {
  updateFilterAction,
  fetchFacetsAction,
  fetchSearchAction,
} from "../../store/reducer";

const ReactDateRangeFacet = () => {
  const dispatch = useDispatch();
  const { start, end } = useSelector(
    (state) => state.ui.searchFilters.date_range,
  );
  let { min: date_min, max: date_max } = useSelector((state) => get(state.search.facets, "file_created", { min: null, max: null }));
  if (date_min) {
    date_min = new Date(date_min);
  }
  if (date_max) {
    date_max = new Date(date_max);
  }

  let fStart = new Date();
  let fEnd = new Date();
  if (start) {
    fStart = new Date(start);
  }
  if (end) {
    fEnd = new Date(end);
  }

  const start_range = {
    min: date_min,
    max: fEnd || date_max,
  };
  const end_range = {
    min: fStart || date_min,
    max: date_max,
  };

  const toApiDate = (value) => {
    if (value) {
      return moment(value).format("YYYY-MM-DD");
    }
    return moment().format("YYYY-MM-DD");
  };

  const handleOnDateChange = (date, startOrEnd) => {
    const fDate = moment(date).format("YYYY-MM-DD");

    if (startOrEnd === "start") {
      const endDate = toApiDate(fEnd);
      dispatch(
        updateFilterAction({
          date_range: { [startOrEnd]: fDate, end: endDate },
        }),
      );
    } else {
      const startDate = toApiDate(fStart);
      dispatch(
        updateFilterAction({
          date_range: { [startOrEnd]: fDate, start: startDate },
        }),
      );
    }
    // update facets
    dispatch(fetchFacetsAction());
    // trigger search
    dispatch(fetchSearchAction());
  };

  return (
    <div style={{ border: "1px solid #6EB3A6", borderRadius: "5px" }}>
      <h6
        style={{
          paddingTop: "10px",
          paddingLeft: "5px",
          color: "grey",
          fontWeight: "400",
        }}
      >
        Date Range
      </h6>
      <Container>
        <Row xs="2">
          <DatePicker
            selected={fStart}
            minDate={start_range.min}
            maxDate={start_range.max}
            onChange={(date) => handleOnDateChange(date, "start")}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={fEnd}
            minDate={end_range.min}
            maxDate={end_range.max}
            onChange={(date) => handleOnDateChange(date, "end")}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="yyyy-MM-dd"
          />
        </Row>
      </Container>
    </div>
  );
};
export default ReactDateRangeFacet;
