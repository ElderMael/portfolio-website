import React from 'react';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {Navigation} from "./Navigation";
import useWindowDimensions from "../useWindowDimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMicrophone, faMoneyBill, faNewspaper} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faPatreon,
    faTiktok,
    faTwitch,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export function Social() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>

            <main className={isWide ? "container" : "row"}>
                <div className="about-me card text-center animated fadeIn delay-5s col">
                    <h3 className="card-header">
                        My Social Networks
                    </h3>
                    <div className="card-body">
                        <h4 className="card-title">Social Networks</h4>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/eldermael">
                                <FontAwesomeIcon className="icon-nav icon-community" icon={faPatreon} size="2x"/>
                                <span>Patreon</span>
                            </a>
                            <span className="social-description">Support my creative journey—no strings attached.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://ko-fi.com/eldermael">
                                <FontAwesomeIcon className="icon-nav fas fa-2x icon-community" icon={faMoneyBill}/>
                                <span>Ko-fi</span>
                            </a>
                            <span
                                className="social-description">Fuel my work with a quick coffee—no strings attached.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@piratedevradio">
                                <FontAwesomeIcon className="icon-nav icon-media" icon={faYoutube} size="2x"/>
                                <span>YouTube</span>
                            </a>
                            <span
                                className="social-description">Deep dives into tech, AI, and engineering culture.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/eldermael">
                                <FontAwesomeIcon className="icon-nav icon-media" icon={faTwitch} size="2x"/>
                                <span>Twitch</span>
                            </a>
                            <span className="social-description">Live coding, gaming, and real-time tech talks.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.substack.com/">
                                <FontAwesomeIcon className="icon-nav fas fa-2x icon-contact" icon={faNewspaper}/>
                                <span>Substack</span>
                            </a>
                            <span className="social-description">Deep dives into tech, AI, and engineering culture via my newsletter.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.facebook.com/profile.php?id=100088523016127">
                                <FontAwesomeIcon className="icon-nav icon-community" icon={faFacebook} size="2x"/>
                                <span>Facebook</span>
                            </a>
                            <span
                                className="social-description">Updates and community discussions on the big blue.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@eldermael">
                                <FontAwesomeIcon className="icon-nav icon-media" icon={faTiktok} size="2x"/>
                                <span>TikTok</span>
                            </a>
                            <span className="social-description">Bite-sized tech tips and behind-the-scenes fun.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                                <FontAwesomeIcon className="icon-nav icon-community" icon={faLinkedin} size="2x"/>
                                <span>LinkedIn</span>
                            </a>
                            <span className="social-description">Professional milestones and industry networking.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.instagram.com/piratedevradio/">
                                <FontAwesomeIcon className="icon-nav icon-community" icon={faInstagram} size="2x"/>
                                <span>Instagram</span>
                            </a>
                            <span className="social-description">Visual highlights of my daily life and projects.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://anchor.fm/pirate-dev-radio">
                                <FontAwesomeIcon className="icon-nav fas fa-2x icon-media" icon={faMicrophone}/>
                                <span>AnchorFM</span>
                            </a>
                            <span className="social-description">Catch the audio version of my podcast on the go.</span>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <a className="contact-me btn btn-outline-success" href="/contact-me">
                            Contact Me!
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
