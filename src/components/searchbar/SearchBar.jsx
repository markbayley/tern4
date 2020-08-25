import React from "react";
import {
  Container,
  Button,
  Form,
  FormControl,
  Col,
  InputGroup,
  Navbar,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import LoginButton from "../buttons/LoginButton";
import { updateFilterAction, fetchSearchAction } from "../../store/reducer";
import { CONFIG } from "../../config";

// Controlled Input field for search_string
function mapStateToProps(state) {
  return { value: state.ui.searchFilters.search_string };
}
const SearchStringField = connect(mapStateToProps, {})(FormControl);

/* Connects to another test API unsplash, not the TERN API as yet, need to change over */
function SearchBar() {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateFilterAction({ search_string: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(fetchSearchAction);
  };

  return (
    <Navbar bg="white" expand="lg" className="nav-bar">
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
      <Col sm={2} className="nav-bar-col">
        <Navbar.Brand>
          <div className="site-branding">
            <Link to="/">
              <img src="img/logo@3x.png" alt="tern logo" />
            </Link>
          </div>
        </Navbar.Brand>
      </Col>

      <Container className="nav-container">
        <h3 className="biologo">
          <Image
            className="bio-icon"
            src="/img/icons/bioimages-download.svg"
          />
          Bioimages
        </h3>

        {/* Search Input */}
        <Form onSubmit={handleSubmit}>
          <InputGroup
            inline="true"
            className="searchbar"
          >
            <Image
              fluid
              src="/img/icons/search-bioimages-icon.svg"
              alt="bioimages search icon"
              className="search-icon"
            />
            <SearchStringField
              style={{ color: "#00565D" }}
              onChange={handleChange}
              onBlur={handleSubmit}
              id="place"
              type="text"
              placeholder="Search images by site or image type"
              className="search-form"
              aria-label="term"
            />
            <Button
              className="searchbutton"
              variant="outline"
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
