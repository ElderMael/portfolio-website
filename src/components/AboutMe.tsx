import React from "react";
import './AboutMe.css'

export function AboutMe() {
    return (
        <div className="about-me card col-sm-5 col-lg-5 text-center animated fadeIn delay-5s">
            <div className="card-header">
                About Me
            </div>
            <div className="card-body">
                <h4 className="card-title">Miguel Enriquez</h4>
                <p className="card-text">
                    <p>
                        Miguel Enriquez is a software engineer with 10 years of professional experience in
                        several areas of software development. He has worked on the backend using several
                        technologies and frameworks related to the JVM. He also has experience on the
                        front-end side using Angular and React. Finally, Miguel also has worked on roles
                        pertaining Infrastructure Development, applying DevOps practices and Site
                        Reliability Engineering.
                    </p>
                    <p>
                        He has worked as a freelance developer and consultant delivering value on various
                        companies on sectors such as insurance, government, energy and financial.
                    </p>
                    <p>
                        Miguel is also host of <a href="https://piratedevradio.tech/">PirateDevRadio</a>,
                        a podcast about software development in general.
                    </p>
                </p>
            </div>
            <div className="card-footer text-muted">
                <a className="btn btn-outline-success" href="mailto:sftwr.mael@gmail.com">Contact Me!</a>
            </div>
        </div>
    );
}
