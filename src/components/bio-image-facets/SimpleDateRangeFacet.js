import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Container, Row } from "reactstrap";
import { get } from "lodash";
import moment from "moment";
import {
  updateFilterAction,
  fetchFacetsAction,
  fetchSearchAction,
} from "../../store/reducer";

const SimpleDateRangeFacet = () => {
  const dispatch = useDispatch();
  const { start, end } = useSelector(
    (state) => state.ui.searchFilters.date_range,
  );
  let { min: date_min, max: date_max } = useSelector((state) => get(state.search.facets, "file_created", { min: null, max: null }));
  if (date_min) {
    date_min = moment(date_min).format("YYYY-MM-DD");
  }
  if (date_max) {
    date_max = moment(date_max).format("YYYY-MM-DD");
  }

  const handleOnDateChange = (event) => {
    if (event.target.name === "start") {
      dispatch(
        updateFilterAction({
          date_range: { [event.target.name]: event.target.value, end },
        }),
      );
    } else {
      dispatch(
        updateFilterAction({
          date_range: { [event.target.name]: event.target.value, start },
        }),
      );
    }
    // update facets
    dispatch(fetchFacetsAction());
    // trigger search
    dispatch(fetchSearchAction());
  };

  const start_range = {
    min: date_min,
    max: end || date_max,
  };
  const end_range = {
    min: start || date_min,
    max: date_max,
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
          <Input
            type="date"
            id="id-start"
            name="start"
            value={start}
            min={start_range.min}
            max={start_range.max}
            onChange={handleOnDateChange}
          />

          <Input
            type="date"
            id="id-end"
            name="end"
            value={end}
            min={end_range.min}
            max={end_range.max}
            onChange={handleOnDateChange}
          />
        </Row>
      </Container>
    </div>
  );
};

export default SimpleDateRangeFacet;
