import React from "react";
import { Row } from "react-bootstrap";

function IconBar() {
  return (
    <div className={'icon-bar'}>
      <Row style={{ position: "absolute", left: "107%", top: "95px" }}>
        <img src="img/icons/Location.svg" alt="location" height="40px" />
      </Row>

      <Row style={{ position: "absolute", left: "107%", top: "285px" }}>
        <img src="img/icons/camera1.svg" alt="location" height="40px" />
      </Row>

      <Row style={{ position: "absolute", left: "107%", top: "220px" }}>
        <img src="img/icons/calendar.svg" alt="location" height="40px" />
      </Row>

      <Row style={{ position: "absolute", left: "107%", top: "360px" }}>
        <img src="img/icons/frequency.svg" alt="location" height="40px" />
      </Row>
    </div>
  );
}

export default IconBar;
