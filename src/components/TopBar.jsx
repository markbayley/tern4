import React from "react";
import TERNDataDropdown from "./dropdowns/TERNDataDropdown";
import CommunityDropdown from "./dropdowns/CommunityDropdown";
import CoESRADropdown from "./dropdowns/CoESRADropdown";
import DataVisualiserDropdown from "./dropdowns/DataVisualiserDropdown";
import { Nav, NavItem, Navbar,NavbarBrand } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function TopBar() {
  return (
    <Router>
      <div>
        <div className="above-header">
          <div className="container">
            <div className="above-header-section-wrap d-flex">
              
                  <Navbar color="dark" dark expand="md" className="navbar-dark navbar-expand-sm" >
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div className="datalinks-for-sm">
                      <NavbarBrand href="/" className="user-select addlinks"><img src="img/logo-mini-all.png" alt="logo" /></NavbarBrand>
                      <NavbarBrand href="/" className="addlinks search-link">Data</NavbarBrand>
                    </div>
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav navbar>
                        <NavItem>
                          <TERNDataDropdown />
                        </NavItem>
                        <NavItem>
                          <DataVisualiserDropdown />
                        </NavItem>
                        <NavItem>
                          <CoESRADropdown />
                        </NavItem>
                        <NavItem>
                          <CommunityDropdown />
                        </NavItem>
                      </Nav>
                    </Navbar.Collapse>
                    <div className="datalinks-for-lg">
                      <NavbarBrand href="/" className="user-select addlinks"><img src="img/logo-mini-all.png" alt="logo" /></NavbarBrand>
                      <NavbarBrand href="/" className="addlinks search-link">Data</NavbarBrand>
                    </div>
                    
                  </Navbar>
                  
              
            </div>
          </div>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/data">
            <DataPortal />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      {/* <MainMenu />
      <MainBanner />
      <SignIn />
      <MainFooter />
      <BioimagesSubFooter /> */}
    </div>
  );
}

function DataPortal() {
  return <div></div>;
}
