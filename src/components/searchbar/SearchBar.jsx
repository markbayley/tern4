import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  Col,
  InputGroup,
  Navbar,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginButton from "../buttons/LoginButton";
import { selectedFilterAction } from "../../store/reducer";
import { CONFIG } from "../../config";

/* Connects to another test API unsplash, not the TERN API as yet, need to change over */
function SearchBar() {
  const dispatch = useDispatch();
  const [freeText, setFreeText] = useState(null);

  const handleChange = (event) => {
    // setPhoto(event.target.value);
    setFreeText(event.target.value);
  };

  const handleSubmit = () => {
    const searchTerm = { search_string: `${freeText}*` };
    dispatch(selectedFilterAction(searchTerm));
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
          <FormControl
            style={{ color: "#00565D" }}
            onChange={handleChange}
            id="place"
            type="text"
            placeholder="Search images by site or image type"
            className="search-form"
            aria-label="term"
          />
          <Button
            className="searchbutton"
            onClick={handleSubmit}
            variant="outline"
            type="submit"
          />
        </InputGroup>
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
