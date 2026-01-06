import React from "react";
import './AboutMe.css'

export function AboutMe() {
    return (
        <div className="about-me card text-center animated fadeIn delay-5s col">
            <h3 className="card-header">
                About Me
            </h3>
            <div className="card-body">
                <h4 className="card-title">Miguel Enriquez</h4>
                <div className="card-text resume-summary">
                    <p>
                        Experienced engineer specializing in <strong>AI Development</strong>, <strong>Data Engineering</strong>, and <strong>Platform Development</strong>.
                        I help teams accelerate digital transformations, improve Time to Market, and boost developer productivity through automation and intelligent systems.
                    </p>

                    <h5>Core Expertise</h5>
                    <ul>
                        <li><strong>AI & Mentoring Engineering:</strong> AI-driven and assisted code, mentoring new devs to be more productive.</li>
                        <li><strong>Data Engineering:</strong> Building robust Data Platforms and scalable data architectures.</li>
                        <li><strong>Infrastructure & DevOps:</strong> Platform development, SRE, and modern DevOps practices.</li>
                        <li><strong>Full-stack:</strong> JVM-based backends, and frontend development with React.</li>
                    </ul>

                    <h5>Community & Outreach</h5>
                    <p>
                        Host of <a href="https://piratedevradio.tech/">PirateDevRadio</a>, a podcast covering software development, AI, and engineering culture.
                        Subscribe to my newsletter: <a href="https://piratedevradio.substack.com/">piratedevradio.substack.com</a>.
                    </p>
                </div>
            </div>
            <div className="card-footer text-muted">
                <a className="contact-me btn btn-outline-success" href="https://blog.eldermael.io/contact/">Contact Me!</a>
            </div>
        </div>
    );
}
