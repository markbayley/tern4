import React, { useState } from "react";
import {
  Container,
  Button,
  FormControl,
  Col,
  Row,
  InputGroup,
  Navbar,
  Image,
  Form,
  Modal,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink

} from "react-bootstrap";
import axios from "axios";
import LoginButton from "./buttons/LoginButton";
import RegisterButton from "./buttons/RegisterButton";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


{
  /* Connects to another test API unsplash, not the TERN API as yet, need to change over*/
}
function SearchBar() {
  const [term, setPhoto] = useState("");
  const [clientId, setClientId] = useState(
    "52d5d5565994d57c3160b4296aef1be1bf8985d9265e313f0f9db7eb1145d86d"
  );

  const [result, setResult] = useState([]);

  function handleChange(event) {
    setPhoto(event.target.value);
  }

  function handleSubmit(event) {
    console.log(term);

    const url =
      "https://api.unsplash.com/search/photos?page=2&per_page=15&query=" +
      term +
      "&client_id=" +
      clientId;

    axios.get(url).then((response) => {
      console.log(response);
      setResult(response.data.results);
    });
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div>
      <Navbar color="light" light expand="md">
        <Container  className="main-header">
          <NavbarBrand to="/" className="site-branding" tag="div">
            <img src="img/logo@3x.png" alt="" />
          </NavbarBrand>
          
            <Nav className="ml-auto searchbar-wrap" navbar>
              {/*Search Input */}
              <InputGroup
                    inline="true"
                    className="searchbar d-flex align-items-center"
                  >
                    <svg height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path fill="  " d="M18 13v7H4V6h5.02c.05-.71.22-1.38.48-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5l-2-2zm-1.5 5h-11l2.75-3.53 1.96 2.36 2.75-3.54zm2.8-9.11c.44-.7.7-1.51.7-2.39C20 4.01 17.99 2 15.5 2S11 4.01 11 6.5s2.01 4.5 4.49 4.5c.88 0 1.7-.26 2.39-.7L21 13.42 22.42 12 19.3 8.89zM15.5 9C14.12 9 13 7.88 13 6.5S14.12 4 15.5 4 18 5.12 18 6.5 16.88 9 15.5 9z"/></svg>
                    <FormControl
                      onChange={handleChange}
                      id="place"
                      type="text"
                      placeholder="Search images by region or by site"
                      aria-label="term"
                      className="flex-grow-1"
                    />
                    <Button
                      className="searchbutton"
                      onClick={handleSubmit}
                      variant="outline"
                      type="submit"
                      style={{
                        height: "40px",
                        width: "40px",
                        marginRight: "16px",
                        borderRadius: "50px",
                      }}
                    ></Button>
                  </InputGroup>
                  {/*End of Search Input */}
              
            </Nav>
            <Nav className="ml-auto login-links align-items-center" navbar>
              <NavItem className="search-for-mobile">
                <svg height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </NavItem>
              <NavItem>
                <NavLink href="/login"><LoginButton /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login"><RegisterButton /></NavLink>
              </NavItem>
            </Nav>
            </Container>
          </Navbar>
        

        {/*Search Results */}
        <Container style={{ paddingLeft: "3%" }}>
          <Row>
            {result.map((term) => (
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Image Title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Image src={term.urls.small} width="465px" height="465px" />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="outline-secondary" onClick={handleClose}>
                      Download
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Image
                  onClick={handleShow}
                  src={term.urls.small}
                  width="210px"
                  height="210px"
                  style={{ margin: "10px 13px 10px 13px" }}
                />
                <br />
                <Form style={{ paddingTop: "5px" }}>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        id={`inline-${type}-1`}
                        inline
                        label="View"
                      />
                      <Form.Check
                        inline
                        label="Select"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Download"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form>
              </div>
            ))}
          </Row>
        </Container>
        {/*End of Search Results */}

        <Switch>
          <Route
            path="/login"
            component={() => {
              window.location.href =
                "https://auth-test.tern.org.au/auth/realms/tern/protocol/openid-connect/auth?client_id=account&redirect_uri=https%3A%2F%2Fauth-test.tern.org.au%2Fauth%2Frealms%2Ftern%2Faccount%2Flogin-redirect&state=0%2F8b80b485-2114-431c-b92a-1a27748ee396&response_type=code&scope=openid";
              return null;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default SearchBar;
