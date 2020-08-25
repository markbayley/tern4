import React, { useState } from "react";
import {
  Modal, Navbar, Button, Col,
} from "react-bootstrap";

function MobileSidebar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mobile-sidebar">
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ color: "#043E4F" }}>
          <Modal.Title>
            {" "}
            <Col sm={2} style={{ position: "absolute", left: "0%" }}>
              <Navbar.Brand>
                <div className="site-branding" />
              </Navbar.Brand>
            </Col>
            Select an image type below
          </Modal.Title>
        </Modal.Header>
        <hr
          style={{
            border: "0.5px solid #66b3a6",
            marginTop: "0%",
            marginBottom: "0.5%",
          }}
        />
        <Modal.Body>
          <Button variant="mobile">
            <img src="/img/LAI.svg" width="50%" alt="" />
            <br />
            Leaf Area Index
          </Button>

          <Button variant="mobile">
            <img src="/img/panoramic.svg" width="50%" alt="" />
            <br />
            Panorama
          </Button>
          <br />
          <Button variant="mobile">
            <img src="/img/phenocam.svg" width="50%" alt="" />
            <br />
            Phenocam
          </Button>

          <Button variant="mobile">
            <img src="/img/photopoint.svg" width="50%" alt="" />
            <br />
            Photopoint
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="flat" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="mobile" onClick={handleShow}>
        <img src="img/icons/Location.svg" alt="location" height="40px" />
        <br />
        Site
      </Button>
      <Button variant="mobile" onClick={handleShow}>
        <img src="img/icons/camera1.svg" alt="location" height="40px" />
        <br />
        Image Type
      </Button>
      <Button variant="mobile" onClick={handleShow}>
        <img src="img/icons/frequency.svg" alt="location" height="40px" />
        <br />
        Plots
      </Button>
      <Button variant="mobile" onClick={handleShow}>
        <img src="img/icons/calendar.svg" alt="location" height="40px" />
        <br />
        Date Range
      </Button>
    </div>
  );
}

export default MobileSidebar;
