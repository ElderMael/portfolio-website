import React from "react";
import './AboutMe.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCloud,
    faComment,
    faDatabase,
    faEnvelope,
    faGlobe,
    faLaptopCode,
    faMicrophone,
    faRobot,
    faTools,
    faUser
} from "@fortawesome/free-solid-svg-icons";

export function AboutMe() {
    return (
        <div className="about-me card text-center animated fadeIn delay-5s col">
            <h3 className="card-header">
                <FontAwesomeIcon icon={faUser} className="icon-nav icon-user"/> About Me
            </h3>
            <div className="card-body">
                <h4 className="card-title">Miguel Enriquez</h4>
                <div className="card-text resume-summary">
                    <p>
                        Experienced engineer specializing in <strong>AI Development</strong>, <strong>Data Engineering</strong>, and <strong>Data Platforms</strong>.
                        I help teams accelerate digital transformations, improve Time to Market, and boost developer productivity through automation and intelligent systems.
                    </p>

                    <h5><FontAwesomeIcon icon={faTools} className="icon-nav icon-code"/> Core Expertise</h5>
                    <ul>
                        <li><strong><FontAwesomeIcon icon={faRobot} className="icon-nav icon-ai"/> AI & Mentoring Engineering:</strong> AI-driven and assisted code, mentoring new devs to be more productive.</li>
                        <li><strong><FontAwesomeIcon icon={faDatabase} className="icon-nav icon-data"/> Data Engineering:</strong> Building robust Data Platforms and scalable data architectures.</li>
                        <li><strong><FontAwesomeIcon icon={faCloud} className="icon-nav icon-infra"/> Infrastructure & DevOps:</strong> Platform development, SRE, and modern DevOps practices.</li>
                        <li><strong><FontAwesomeIcon icon={faLaptopCode} className="icon-nav icon-code"/> Full-stack:</strong> JVM-based & Rust backends, and frontend development with React.</li>
                    </ul>

                    <h5><FontAwesomeIcon icon={faGlobe} className="icon-nav icon-community"/> Community & Outreach</h5>
                    <p>
                        <FontAwesomeIcon icon={faMicrophone} className="icon-nav icon-media"/> Host of <a href="https://piratedevradio.tech/">PirateDevRadio</a>, a podcast covering software development, AI, and engineering culture.
                        <br/>
                        <FontAwesomeIcon icon={faEnvelope} className="icon-nav icon-contact"/> Subscribe to my newsletter: <a href="https://piratedevradio.substack.com/">piratedevradio.substack.com</a>.
                    </p>
                </div>
            </div>
            <div className="card-footer text-muted">
                <a className="contact-me btn btn-outline-success" href="/contact-me"><FontAwesomeIcon icon={faComment} className="icon-nav icon-contact"/> Contact Me!</a>
            </div>
        </div>
    );
}
