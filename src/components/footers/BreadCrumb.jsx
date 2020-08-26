import React from "react";
import {
  Breadcrumb, NavItem, NavLink, Row, Col,
  Form, FormGroup, Input, Label,
} from "reactstrap";

const BreadCrumb = () => (
  <Breadcrumb>
    <Row className="breadcrumb-row" activekey="/home">
      <NavItem className="nav-item" tag="div">
        <NavLink href="/home">
          Access Policy
        </NavLink>
      </NavItem>
      <NavItem className="nav-item" tag="div">
        <NavLink>
          Data Licensing
        </NavLink>
      </NavItem>
      <NavItem className="nav-item" tag="div">
        <NavLink>
          Copyright
        </NavLink>
      </NavItem>
    </Row>
    <Col className="select-all">
      <Form>
        <FormGroup check inline>
          <Label check>
            <Input type="checkbox" />
            Select all
          </Label>
        </FormGroup>
      </Form>
    </Col>
  </Breadcrumb>
);

export default BreadCrumb;
