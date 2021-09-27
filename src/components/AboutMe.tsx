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
                <div className="card-text">
                    <p>
                        I am an experienced engineer on the area of Platform Development and Digital Transformations.
                        I have been using my skills on the area of infrastructure and DevOps practices. I help teams
                        to improve Time to Market, Developer Productivity, and R&D.
                    </p>
                    <p>
                        With several years of professional experience in several areas of software development. I have
                        worked on the backend using several technologies and frameworks related to the JVM. I also have
                        experience on the front-end side using Angular and React. Finally, I have worked on roles
                        pertaining Infrastructure Development, applying DevOps practices and Site
                        Reliability Engineering.
                    </p>
                    <p>
                        I am the host of <a href="https://piratedevradio.tech/">PirateDevRadio</a>,
                        a podcast about software development in general. I am a mentor of
                        <a href="http://twitter.com/devzcommunity">Devz Community</a>.
                    </p>
                </div>
            </div>
            <div className="card-footer text-muted">
                <a className="btn btn-outline-success" href="https://blog.eldermael.io/contact/">Contact Me!</a>
            </div>
        </div>
    );
}
