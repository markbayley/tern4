import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Label, Input, Container, Row, Col,
} from "reactstrap";
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
    <>
      <h6
        style={{
          paddingTop: "15px",
          color: "#065f65",
          fontWeight: "500",
        }}
      >
        Date Range
      </h6>
      <Container>
        <Row xs="1">
          <Col>
            <Label for="id-start">Start</Label>
            <Input
              type="date"
              id="id-start"
              name="start"
              value={start}
              min={start}
              max={end}
              onChange={handleOnDateChange}
            />
          </Col>
          <Col>
            <Label for="id-end">End</Label>
            <Input
              type="date"
              id="id-end"
              name="end"
              value={end}
              min={start}
              max={end}
              onChange={handleOnDateChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SimpleDateRangeFacet;
