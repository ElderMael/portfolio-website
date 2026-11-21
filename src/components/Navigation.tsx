import React from "react";
import './Navigation.css'
import useWindowDimensions from "../useWindowDimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    faCode,
    faHouse,
    faMicrophone,
    faNewspaper,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";

export function Navigation() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <nav aria-label="Main navigation"
            className={(isWide ? "container" : "") + " navigation navbar navbar-dark"}>
            <Link to="/" className="btn btn-success btn-pill col-lg-2 col-md-2 col-sm-2">
                <FontAwesomeIcon className="icon-nav icon-user" icon={faHouse} size="2x"/>
                <span>Home</span>
            </Link>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://github.com/ElderMael/">
                <FontAwesomeIcon className="icon-nav icon-code" icon={faCode} size="2x"/>
                <span>Code</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                <FontAwesomeIcon className="icon-nav icon-community" icon={faLinkedin} size="2x"/>
                <span>LinkedIn</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.substack.com/">
                <FontAwesomeIcon className="icon-nav fas fa-2x icon-contact" icon={faNewspaper}/>
                <span>Substack</span>
            </a>
            <Link className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2" to="/social">
                <FontAwesomeIcon className="icon-nav fas fa-2x icon-community" icon={faShareNodes}/>
                <span>Social</span>
            </Link>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@piratedevradio">
                <FontAwesomeIcon className="icon-nav icon-media" icon={faMicrophone} size="2x"/>
                <span>Podcast</span>
            </a>
        </nav>
    );

}
