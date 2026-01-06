import React from 'react';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {Navigation} from "./Navigation";
import useWindowDimensions from "../useWindowDimensions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faMicrophone, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

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
                                <span className="icon-nav fab fa-2x fa-patreon"/>
                                <span>Patreon</span>
                            </a>
                            <span className="social-description">Support my creative journey—no strings attached.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://ko-fi.com/eldermael">
                                <FontAwesomeIcon className="icon-nav fas fa-2x" icon={faMoneyBill}/>
                                <span>Ko-fi</span>
                            </a>
                            <span className="social-description">Fuel my work with a quick coffee—no strings attached.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@piratedevradio">
                                <span className="icon-nav fab fa-2x fa-youtube"/>
                                <span>YouTube</span>
                            </a>
                            <span className="social-description">Deep dives into tech, AI, and engineering culture.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/eldermael">
                                <span className="icon-nav fab fa-2x fa-twitch"/>
                                <span>Twitch</span>
                            </a>
                            <span className="social-description">Live coding, gaming, and real-time tech talks.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.facebook.com/profile.php?id=100088523016127">
                                <span className="icon-nav fab fa-2x fa-facebook"/>
                                <span>Facebook</span>
                            </a>
                            <span className="social-description">Updates and community discussions on the big blue.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@eldermael">
                                <span className="icon-nav fab fa-2x fa-tiktok"/>
                                <span>TikTok</span>
                            </a>
                            <span className="social-description">Bite-sized tech tips and behind-the-scenes fun.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                                <span className="icon-nav fab fa-2x fa-linkedin"/>
                                <span>LinkedIn</span>
                            </a>
                            <span className="social-description">Professional milestones and industry networking.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.instagram.com/piratedevradio/">
                                <span className="icon-nav fab fa-2x fa-instagram"/>
                                <span>Instagram</span>
                            </a>
                            <span className="social-description">Visual highlights of my daily life and projects.</span>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://anchor.fm/pirate-dev-radio">
                                <FontAwesomeIcon className="icon-nav fas fa-2x" icon={faMicrophone}/>
                                <span>AnchorFM</span>
                            </a>
                            <span className="social-description">Catch the audio version of my podcast on the go.</span>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <a className="contact-me btn btn-outline-success" href="https://piratedevradio.substack.com/">
                            Contact Me!
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
