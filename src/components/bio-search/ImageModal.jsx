import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { showModalAction, showImagePreviewAction } from "../../store/reducer";

const ImageModal = () => {
  const dispatch = useDispatch();

  const { show, imageIdx } = useSelector((state) => state.ui.imageModal);
  const data = useSelector((state) => state.search.hits);
  const numImages = data.length;
  const imageDoc = data[imageIdx]["_source"];

  const toggle = () => dispatch(showModalAction(!show));

  const nextIdx = imageIdx === (numImages - 1) ? 0 : imageIdx + 1;
  const prevIdx = imageIdx === 0 ? (numImages - 1) : imageIdx - 1;

  if (!show || !imageDoc) {
    return null;
  }

  return (
    <Modal size="lg" isOpen={show} toggle={toggle} unmountOnClose>
      <ModalHeader className="modal-header" toggle={toggle}>
        {" "}
        <Col sm={2} className="modal-column">
          <img src="/img/logo@3x.png" style={{ width: "300px" }} alt="" />
        </Col>
        <Col className="modal-info" sm={5}>
          <h6>
            {imageDoc.site_id.label}
            <br />
            {imageDoc.image_type.label}
            {" "}
            <br />
            Plot:
            {" "}
            {imageDoc.plot.label}
            {" "}
            <br />
            Site Visit ID:
            {imageDoc.site_visit_id}
            <br />
            {imageIdx}
            /
            {numImages}
          </h6>
        </Col>
      </ModalHeader>
      <hr className="modal-line" />
      <ModalBody>
        <img
          className="img-fluid"
          src={imageDoc.preview_urls[0].url}
          alt="carousel"
        />
        <FormGroup check className="center modal-select">
          <Label check>
            <Input type="checkbox" />
            Add to selected images?
          </Label>
        </FormGroup>
      </ModalBody>
      <br />
      <ModalFooter>
        <Button color="login" onClick={() => dispatch(showImagePreviewAction(prevIdx))}>
          Prev
        </Button>
        <Button color="login" onClick={() => dispatch(showImagePreviewAction(nextIdx))}>
          Next
        </Button>
        <Button color="login" onClick={toggle}>
          Close
        </Button>
        <Button color="login" onClick={toggle}>
          Download
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
