import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (

    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top backdrop"
      data-navbar-on-scroll="data-navbar-on-scroll"
      style={{
        backgroundImage: "none",
        backgroundColor: "#f9fafdb3",
      }}
    >
      <div className="container">
        <a className="navbar-brand" href="index.html">
          {/* <img src="assets/img/logo.svg" height="31" alt="logo" /> */}
          <h2>Faceauth.js</h2>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div
          className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#feature">
                Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#validation">
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#superhero">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#marketing">
                Resources
              </a>
            </li>
          </ul>
          <div className="d-flex ms-lg-4">
            <a className="btn btn-secondary-outline" href="#!">
              Sign In
            </a>
            <a className="btn btn-warning ms-3" href="#!">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
