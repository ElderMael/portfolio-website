import React from "react";

export const Navigation: React.FC = (props) => {

  return (
      <nav className="navigation navbar navbar-dark fixed-top animated fadeIn slow delay-5s">
        <a className="btn btn-success col-lg-3 col-sm-2" href="/">
          <span className="fas fa-home" />
          Home
        </a>
        <a className="btn btn-success col-lg-3 col-sm-2" href="/code">
          <span className="fas fa-code" />
          Code
        </a>
        <a className="btn btn-success col-lg-3 col-sm-2" href="/resume">
          <span className="fab fa-linkedin" />
          Resume
        </a>
        <a className="btn btn-success col-lg-3 col-sm-2" href="/about">
          <span className="fas fa-address-card" />
          About
        </a>
      </nav>
  );

};