import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";
import useWindowDimensions from "../useWindowDimensions";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used


function Home() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>
            <main className={isWide ? "container" : "row"}>
                <NameCli/>
                <AboutMe/>
            </main>
        </div>
    );
}

function Social() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>

            <main className={isWide ? "container" : "row"}>
                <div className="about-me card text-center animated fadeIn delay-5s col">
                    <h3 className="card-header">
                        About Me
                    </h3>
                    <div className="card-body">
                        <h4 className="card-title">Social Networks</h4>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/eldermael">
                                <span className="icon-nav fab fa-2x fa-patreon"/>
                                <span>Patreon</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://ko-fi.com/eldermael">
                                <FontAwesomeIcon className="icon-nav fab fa-2x" icon={solid('money-bill')}/>
                                <span>ko-fi.com</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://twitter.com/eldermael">
                                <span className="icon-nav fab fa-2x fa-twitter"/>
                                <span>Twitter</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@piratedevradio">
                                <span className="icon-nav fab fa-2x fa-youtube"/>
                                <span>Youtube</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.twitch.tv/eldermael">
                                <span className="icon-nav fab fa-2x fa-twitch"/>
                                <span>Twitch</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.facebook.com/profile.php?id=100088523016127">
                                <span className="icon-nav fab fa-2x fa-facebook"/>
                                <span>Facebook</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@eldermael">
                                <span className="icon-nav fab fa-2x fa-tiktok"/>
                                <span>Tik Tok</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/eldermael/">
                                <span className="icon-nav fab fa-2x fa-linkedin"/>
                                <span>LinkedIn!</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer"
                               href="https://www.instagram.com/piratedevradio/">
                                <span className="icon-nav fab fa-2x fa-instagram"/>
                                <span>Instagram</span>
                            </a>
                        </div>
                        <div className="card-text resume-summary">
                            <a className="btn btn-outline-success btn-pill col-lg-2 col-md-2 col-sm-2"
                               target="_blank" rel="noopener noreferrer" href="https://anchor.fm/pirate-dev-radio">
                                <FontAwesomeIcon className="icon-nav fab fa-2x" icon={solid('microphone')}/>
                                <span>AnchorFM</span>
                            </a>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <a className="contact-me btn btn-outline-success" href="https://blog.eldermael.io/contact/">
                            Contact Me!
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                </Route>
                <Route path="/social">
                    <Route index element={<Social/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

