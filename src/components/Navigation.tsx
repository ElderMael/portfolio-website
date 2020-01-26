import React from "react";
import './Navigation.css'

export const Navigation: React.FC = (props) => {

  return (
      <nav className="navigation navbar navbar-dark fixed-top animated fadeIn slow delay-5s">
        <a className="btn btn-success btn-pill col-lg-2 col-sm-1" href="/">
          <span className="icon-nav fas fa-2x fa-home" />
          <span>Home</span>
        </a>
        <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1" href="/code">
          <span className="icon-nav fas fa-2x fa-code" />
          <span>Code</span>
        </a>
        <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1" href="/resume">
          <span className="icon-nav fab fa-2x fa-linkedin" />
          <span>Resume</span>
        </a>
        <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1" href="/resume">
          <span className="icon-nav fab fa-2x fa-medium" />
          <span>Blog</span>
        </a>
        <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1" href="/resume">
          <span className="icon-nav fab fa-2x fa-twitter" />
          <span>Social Media</span>
        </a>
        <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1" href="/about">
          <span className="icon-nav fas fa-2x fa-address-card" />
          <span>About</span>
        </a>
      </nav>
  );

};