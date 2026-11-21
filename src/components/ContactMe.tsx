import React, {useState} from 'react';
import './ContactMe.css';

export function ContactMe() {
    const [botField, setBotField] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        if (botField) {
            e.preventDefault();
            return;
        }
        // Formspree will handle submission; no action needed here
    };

    return (
        <main className="contact-page" id="main-content" tabIndex={-1} aria-labelledby="contact-title">
            <section className="contact-intro paper-panel" aria-labelledby="contact-title">
                <p className="contact-eyebrow">Open a channel</p>
                <h1 id="contact-title">Contact me.</h1>
                <p className="contact-lede">
                    Start a conversation about professional or mentorship inquiries;
                    include a little context about what you have in mind.
                </p>
            </section>

            <div className="contact-layout">
                <section className="contact-paths paper-panel" aria-labelledby="contact-paths-title">
                    <p className="contact-eyebrow">01 / What brings you here?</p>
                    <h2 id="contact-paths-title">A useful first message</h2>
                    <div className="contact-path">
                        <h3>Professional inquiries</h3>
                        <p>
                            Share whether you are reaching out about an engineering role,
                            a project, or another professional conversation.
                        </p>
                    </div>
                    <div className="contact-path">
                        <h3>Mentorship inquiries</h3>
                        <p>
                            Include the topics or questions you would like to discuss so
                            there is context for the conversation.
                        </p>
                    </div>
                    <p className="contact-note">
                        Add any details that will help make your message clear. Please
                        don’t include sensitive information.
                    </p>
                </section>

                <section className="contact-form-panel paper-panel" aria-labelledby="contact-form-title">
                    <p className="contact-eyebrow">02 / Send a message</p>
                    <h2 id="contact-form-title">Get in touch</h2>
                    <form action="https://formspree.io/f/xknkjwpb" method="POST" onSubmit={handleSubmit}>
                        <div className="contact-field">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" autoComplete="name" required placeholder="Your name" />
                        </div>
                        <div className="contact-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="_replyto" id="email" autoComplete="email" required placeholder="you@example.com" />
                        </div>
                        <div className="contact-field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                name="message"
                                id="message"
                                rows={6}
                                required
                                placeholder="A few details about your inquiry..."
                                aria-describedby="contact-message-help"
                            />
                            <p id="contact-message-help" className="contact-help">
                                Include the context and any questions you would like to share.
                            </p>
                        </div>
                        <div className="contact-honeypot" aria-hidden="true">
                            <label htmlFor="bot-field">Leave this field blank</label>
                            <input
                                type="text"
                                name="bot-field"
                                id="bot-field"
                                value={botField}
                                onChange={(e) => setBotField(e.target.value)}
                                autoComplete="off"
                                tabIndex={-1}
                            />
                        </div>
                        <button type="submit" className="contact-submit">Send Message <span aria-hidden="true">→</span></button>
                    </form>
                </section>
            </div>
        </main>
    );
}
