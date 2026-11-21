import React from 'react';
import './Home.css';

export function Home() {
    return (
        <main className="home-page">
            <section className="home-hero" aria-labelledby="home-title">
                <div className="home-hero-copy paper-panel">
                    <p className="home-eyebrow">Miguel Enriquez · AI &amp; systems engineering</p>
                    <h1 id="home-title">Building systems that help people build.</h1>
                    <p className="home-lede">
                        I work across AI, infrastructure, platform engineering, DevOps,
                        and data engineering—helping teams turn complex problems into
                        useful, dependable systems.
                    </p>
                    <div className="home-actions">
                        <a className="home-button home-button-primary" href="/contact-me">Get in touch</a>
                        <a className="home-button" href="https://www.linkedin.com/in/eldermael/"
                           target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
                <div className="home-hero-aside" aria-hidden="true">
                    <span>01</span><span>BUILD / SHARE / LEARN</span>
                </div>
            </section>

            <section className="home-section" aria-labelledby="expertise-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">01 / Expertise</p>
                    <div>
                        <h2 id="expertise-title">Engineering across the stack.</h2>
                        <p>From intelligent tools to the infrastructure and data platforms beneath them.</p>
                    </div>
                </div>
                <div className="home-expertise-grid">
                    <article className="home-card">
                        <h3>AI &amp; software</h3>
                        <p>Applying AI to software development and the way teams work.</p>
                    </article>
                    <article className="home-card">
                        <h3>Infrastructure &amp; platforms</h3>
                        <p>Platform engineering, DevOps, and dependable infrastructure.</p>
                    </article>
                    <article className="home-card">
                        <h3>Data engineering</h3>
                        <p>Data platforms, data products, and evolving architectures.</p>
                    </article>
                </div>
            </section>

            <section className="home-section" aria-labelledby="work-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">02 / Experience &amp; selected work</p>
                    <div>
                        <h2 id="work-title">Professional experience, and contributions in the open.</h2>
                    </div>
                </div>
                <div className="home-work-grid">
                    <article className="home-card home-nextdata">
                        <p className="home-eyebrow">Current experience</p>
                        <h3>Nextdata</h3>
                        <p>Principal Software Engineer working across Nextdata OS, infrastructure and platform engineering, field engineering, and customer onboarding.</p>
                        <a href="https://www.nextdata.com/" target="_blank" rel="noreferrer">Nextdata <span aria-hidden="true">↗</span></a>
                    </article>
                    <article className="home-card">
                        <p className="home-eyebrow">Open source · OpenTelemetry</p>
                        <h3>Two project contributions</h3>
                        <ul className="home-link-list">
                            <li><a href="https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391" target="_blank" rel="noreferrer">Helm chart webhook fix <span aria-hidden="true">↗</span></a></li>
                            <li><a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903" target="_blank" rel="noreferrer">ClickHouse exporter DDL documentation <span aria-hidden="true">↗</span></a></li>
                        </ul>
                    </article>
                </div>
                <p className="home-earlier paper-panel">
                    Earlier experience includes platform and cloud work at ThoughtWorks
                    and Greyshore, along with mentorship at ThoughtWorks.
                </p>
                <p className="home-project-note">
                    <a href="https://github.com/ElderMael/neo-pokepet-pi" target="_blank" rel="noreferrer">neo-pokepet-pi</a>:
                    my fork of <a href="https://github.com/djdiptayan1/pi-pokepet" target="_blank" rel="noreferrer">djdiptayan’s pi-pokepet</a>;
                    terminal sprites by <a href="https://github.com/djdiptayan1/pi-pokepet/pull/15" target="_blank" rel="noreferrer">aryantuntune</a>.
                </p>
            </section>

            <section className="home-section home-community" aria-labelledby="community-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">03 / Community</p>
                    <div>
                        <h2 id="community-title">Good engineering grows when we share it.</h2>
                        <p>I value mentorship and making space for people to learn together.</p>
                        <p><a href="/contact-me">Contact me about mentorship <span aria-hidden="true">↗</span></a></p>
                    </div>
                </div>
                <article className="home-card home-radio">
                    <p className="home-eyebrow">Conversations about software</p>
                    <h3>PirateDevRadio</h3>
                    <p>A community project for conversations about software development, AI, and engineering culture.</p>
                    <a href="https://www.youtube.com/@piratedevradio" target="_blank" rel="noreferrer">PirateDevRadio on YouTube <span aria-hidden="true">↗</span></a>
                </article>
            </section>

            <section className="home-contact paper-panel" aria-labelledby="contact-title">
                <p className="home-eyebrow">04 / Get in touch</p>
                <h2 id="contact-title">Let’s start a conversation.</h2>
                <p>Reach out about engineering work, collaboration, or mentorship.</p>
                <a className="home-button home-button-primary" href="/contact-me">Contact me</a>
            </section>
        </main>
    );
}
