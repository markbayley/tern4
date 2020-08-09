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
        <Container >
          <NavbarBrand to="/" className="site-branding">
            <img src="img/logo@3x.png" alt="" />
          </NavbarBrand>
          
            <Nav className="ml-auto" navbar>
              {/*Search Input */}
              <InputGroup
                    inline="true"
                    className="searchbar d-flex align-items-center"
                  >
                    <svg width="32" height="34.494" viewBox="0 0 32 34.494">
                      <path id="Union_12" dataName="Union 12" d="M21.533,25.87a3.109,3.109,0,0,1-2.253-1.106l-3.7-4.294a.687.687,0,0,1-.127-.383.763.763,0,0,1,.17-.383.386.386,0,0,1,.3-.128h.042a.493.493,0,0,1,.425.17l3.7,4.294a1.924,1.924,0,0,0,1.531.765.922.922,0,0,0,.6-.212l.425-.34a1.193,1.193,0,0,0,.34-.893,2.1,2.1,0,0,0-.51-1.275l-3.7-4.294a.594.594,0,0,1-.127-.383.387.387,0,0,1,.17-.34.575.575,0,0,1,.723.042l3.7,4.294A3.284,3.284,0,0,1,24,23.319a2.34,2.34,0,0,1-.723,1.743l-.383.34a2.143,2.143,0,0,1-1.19.468ZM.019,10.521a9.906,9.906,0,1,1,10.545,9.226,3.441,3.441,0,0,1-.68.042A9.934,9.934,0,0,1,.019,10.521Zm1.106-.085a8.8,8.8,0,1,0,8.8-9.354h-.6A8.8,8.8,0,0,0,1.125,10.436Zm3.1,3.4a.591.591,0,0,1-.085-.765c.255-.34,1.446-2,1.573-2.168A1.97,1.97,0,0,1,7.29,10.01a1.974,1.974,0,0,1,1.318.68,1.59,1.59,0,0,0,.3.255.133.133,0,0,0,.085.042s.127-.042.34-.383L10.989,7.97c.042-.042.042-.085.085-.127a.983.983,0,0,1,.85-.51,1.032,1.032,0,0,1,.851.6c.808,1.4,2.933,5.145,2.933,5.145a.5.5,0,0,1,.042.426.571.571,0,0,1-.255.3.545.545,0,0,1-.723-.212s-2.126-3.657-2.891-5.017L10.224,11.2c-.17.255-.6.893-1.233.893a1.062,1.062,0,0,1-.6-.17,2.684,2.684,0,0,1-.51-.425c-.255-.255-.425-.383-.6-.383a.824.824,0,0,0-.68.425c-.127.17-1.36,1.871-1.616,2.211a.645.645,0,0,1-.425.213A.678.678,0,0,1,4.229,13.837ZM6.312,7.2a2,2,0,0,1-.6-1.4A1.978,1.978,0,0,1,7.673,3.845a2.483,2.483,0,0,1,.765.17,1.68,1.68,0,0,1,.638.425,1.928,1.928,0,0,1,.6,1.4A1.978,1.978,0,0,1,7.715,7.8,1.928,1.928,0,0,1,6.312,7.2Zm.383-1.36a1,1,0,0,0,.3.722,1.026,1.026,0,0,0,.723.3,1.007,1.007,0,0,0,1.021-1.02,1.225,1.225,0,0,0-.255-.723,1.2,1.2,0,0,0-.723-.3A1.044,1.044,0,0,0,6.695,5.844Z"/>
                    </svg>
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
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login"><LoginButton /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login"><RegisterButton /></NavLink>
              </NavItem>
            </Nav>
            </Container>
          </Navbar>
        <Navbar
          bg="white"
          expand="lg"
          style={{ height: "4%", borderBottom: "1.5px solid #6EB3A6", display:'none' }}
        >
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
          <Navbar.Collapse id="basic-navbar-nav"> */}
            <Col sm={2} style={{ position: "absolute", left: "0%"}}>
              <Navbar.Brand>
                <div >
                  
                </div>
              </Navbar.Brand>
            </Col>

            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '85px',   color: "#6EB3A6"}}>
            
                <h3 className="biologo">
                  <Image
                    className="icon"
                    src="/img/icons/bioimages-download.svg"
                    style={{
                      marginBottom: "3%",
                      height: "35px",
                      marginTop: "0%",
                      
                    }}
                  />
                  Bioimages
                </h3>
               
                
        

              {/*Login Buttons */}
              <div className="login">
              
              </div>
            </Container>
         
          {/* </Navbar.Collapse> */}
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
