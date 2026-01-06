import React from 'react';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {Navigation} from "./Navigation";
import './ContactMe.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

export function ContactMe() {
    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>

            <main className="container">
                <div className="row justify-content-center">
                    <div className="about-me card contact-me-card text-center animated fadeIn delay-2s col-lg-6 col-md-8 col-sm-10">
                        <h3 className="card-header">
                            <FontAwesomeIcon icon={faEnvelope} className="icon-nav icon-contact"/> Contact Me
                        </h3>
                        <div className="card-body">
                            <form action="https://formspree.io/f/xknkjwpb" method="POST">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" className="form-control" required placeholder="Your Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="_replyto" id="email" className="form-control" required placeholder="your.email@example.com"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea name="message" id="message" rows={5} className="form-control" required placeholder="How can I help you?"></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-success btn-block mt-4">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
