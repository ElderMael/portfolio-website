import React, {SyntheticEvent} from "react";
import './Navigation.css'
import useWindowDimensions from "../useWindowDimensions";

export function Navigation(props: any) {

    function showHome(event: SyntheticEvent): void {
        event.preventDefault();
    }

    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <nav
            className={(isWide ? "container" : "") + " navigation navbar navbar-dark animated fadeIn slow delay-5s"}>
            <a href="#home" className="btn btn-success btn-pill col-lg-2 col-md-2 col-sm-2" onClick={showHome}>
                <span className="icon-nav fas fa-2x fa-home"/>
                <span>Home</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://github.com/ElderMael/">
                <span className="icon-nav fas fa-2x fa-code"/>
                <span>Code</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                <span className="icon-nav fab fa-2x fa-linkedin"/>
                <span>Resume</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.substack.com/">
                <span className="icon-nav fab fa-2x fa-medium"/>
                <span>Substack</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               rel="noopener noreferrer" target="_blank" href="https://eldermael.io/social">
                <span className="icon-nav fab fa-2x fa-twitter"/>
                <span>Social</span>
            </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.tech">
                <span className="icon-nav fas fa-2x fa-microphone"/>
                <span>Podcast</span>
            </a>
        </nav>
    );

}
