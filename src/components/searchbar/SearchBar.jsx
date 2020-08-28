import React from "react";
import {
  Container, Button, Col, Form, InputGroup, Navbar, NavbarBrand, Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import LoginButton from "../buttons/LoginButton";
import { updateFilterAction, fetchSearchAction, fetchFacetsAction } from "../../store/reducer";
import { CONFIG } from "../../config";


// TODO: to be removed .... just a demo component to push state dependency down to component
//       really not necessary here (only saves 1ms on edit)
// Controlled Input field for search_string
function mapStateToProps(state) {
  return { value: state.ui.searchFilters.search_string };
}
const SearchStringField = connect(mapStateToProps, {})(Input);
// TODO: end of to be removed

/* Connects to another test API unsplash, not the TERN API as yet, need to change over */
function SearchBar() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateFilterAction({ search_string: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fetchFacetsAction());
    dispatch(fetchSearchAction());
  };


  return (
    <Navbar light expand="lg" className="nav-bar bg-white">
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
      <Col sm={2} className="nav-bar-col">
        <NavbarBrand tag="span">
          <div className="site-branding">
            <Link to="/">
              <img src="img/logo@3x.png" alt="tern logo" />
            </Link>
          </div>
        </NavbarBrand>
      </Col>

      <Container className="nav-container">
        <h3 className="biologo">
          <img
            className="bio-icon"
            src="/img/icons/bioimages-download.svg"
            alt=""
          />
          Bioimages
        </h3>

        {/* Search Input */}
        <Form onSubmit={handleSubmit}>
          <InputGroup
            inline="true"
            className="searchbar"
          >
            <img
              src="/img/icons/search-bioimages-icon.svg"
              alt="bioimages search icon"
              className="search-icon img-fluid"
            />
            <SearchStringField
              style={{ color: "#00565D" }}
              onChange={handleChange}
              onBlur={handleSubmit}
              id="place"
              type="text"
              placeholder="Search images by site or image type"
              className="search-form form-control"
              aria-label="term"
            />
            <Button
              className="searchbutton"
              color="outline"
              type="submit"
            />
          </InputGroup>
        </Form>
        {/* End of Search Input */}

        {/* Login Buttons */}
        <div className="login">
          <a href={CONFIG.LOGIN_URL}>
            {" "}
            <LoginButton />
            {" "}
          </a>
        </div>
      </Container>
      {/* </Navbar.Collapse> */}
    </Navbar>
  );
}

export default SearchBar;
