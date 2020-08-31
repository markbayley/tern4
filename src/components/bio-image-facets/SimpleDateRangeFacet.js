import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Container, Row } from "reactstrap";
// import moment from "moment";
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
            min={start}
            max={end}
            onChange={handleOnDateChange}
          />

          <Input
            type="date"
            id="id-end"
            name="end"
            value={end}
            min={start}
            max={end}
            onChange={handleOnDateChange}
          />
        </Row>
      </Container>
    </div>
  );
};

export default SimpleDateRangeFacet;
