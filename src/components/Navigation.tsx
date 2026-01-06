import React, {SyntheticEvent} from "react";
import './Navigation.css'
import useWindowDimensions from "../useWindowDimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faNewspaper, faShareNodes} from "@fortawesome/free-solid-svg-icons";

export function Navigation(props: any) {

    function showHome(event: SyntheticEvent): void {
    }

    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <nav
            className={(isWide ? "container" : "") + " navigation navbar navbar-dark animated fadeIn slow delay-5s"}>
            <a href="/" className="btn btn-success btn-pill col-lg-2 col-md-2 col-sm-2" onClick={showHome}>
                <span className="icon-nav fas fa-2x fa-home icon-user"/>
                <span>Home</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://github.com/ElderMael/">
                <span className="icon-nav fas fa-2x fa-code icon-code"/>
                <span>Code</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                <span className="icon-nav fab fa-2x fa-linkedin icon-community"/>
                <span>Resume</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.substack.com/">
                <FontAwesomeIcon className="icon-nav fas fa-2x icon-contact" icon={faNewspaper}/>
                <span>Substack</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               rel="noopener noreferrer" href="/social">
                <FontAwesomeIcon className="icon-nav fas fa-2x icon-community" icon={faShareNodes}/>
                <span>Social</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.tech">
                <span className="icon-nav fas fa-2x fa-microphone icon-media"/>
                <span>Podcast</span>
            </a>
        </nav>
    );

}
