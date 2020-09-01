import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

import TopBar from "./components/headers/TopBar";
import BreadCrumb from "./components/footers/BreadCrumb";

import BioImagesEngine from "./components/BioImagesEngine";
// import Footer from "./components/footers/Footer";

function App() {
  return (
    <Router>
      <TopBar />
      <BioImagesEngine />

      <BreadCrumb />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
