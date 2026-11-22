import React from 'react';
import { Link } from 'react-router-dom';
import { getEmployerWebsite } from './employerLinks';
import './Home.css';

type MarqueeItem = { label: string; detail?: string };

const employers: MarqueeItem[] = [
    { label: 'Nextdata', detail: 'Current employer' },
    { label: 'InDebted', detail: 'Former employer' },
    { label: 'greyshore', detail: 'Former employer' },
    { label: 'Thoughtworks', detail: 'Former employer' },
    { label: 'Softtek', detail: 'Former employer' },
    { label: 'Accenture', detail: 'Former employer' },
    { label: '4F Systems', detail: 'Former employer' },
];

const technologies: MarqueeItem[] = [
    { label: 'AWS' },
    { label: 'Microsoft Azure' },
    { label: 'Google Cloud (GCP)', detail: 'resume: 4 years' },
    { label: 'Kubernetes' },
    { label: 'Terraform' },
    { label: 'Pulumi' },
    { label: 'GitHub Actions', detail: 'resume: 2 years' },
    { label: 'Grafana' },
    { label: 'Prometheus' },
    { label: 'OpenTelemetry' },
    { label: 'ClickHouse' },
    { label: 'Java', detail: 'resume: 11 years' },
    { label: 'JavaScript', detail: 'resume: 9 years' },
    { label: 'Spring Boot', detail: 'resume: 7 years' },
    { label: 'Go', detail: 'resume: 3 years' },
    { label: 'Rust', detail: 'resume: 3 years' },
    { label: 'React' },
    { label: 'Node.js', detail: 'resume: 4 years' },
];

function EmployerMarquee() {
    const renderItems = (decorative = false) => employers.map((employer) => {
        const website = decorative ? undefined : getEmployerWebsite(employer.label);
        return (
            <li className="home-marquee-item" key={employer.label}>
                {website ? (
                    <a className="home-marquee-item-label" href={website} target="_blank" rel="noopener noreferrer">
                        {employer.label}<span aria-hidden="true"> ↗</span>
                    </a>
                ) : (
                    <span className="home-marquee-item-label">{employer.label}</span>
                )}
                {employer.detail && <span className="home-marquee-item-detail">{employer.detail}</span>}
            </li>
        );
    });

    return (
        <div className="home-employer-marquee home-marquee-viewport">
            <div className="home-marquee-track">
                <ul className="home-marquee-items home-employer-marquee-items" aria-label="Selected employers" role="list">
                    {renderItems()}
                </ul>
                <ul className="home-marquee-items home-employer-marquee-items home-employer-marquee-duplicate"
                    aria-hidden="true">
                    {renderItems(true)}
                </ul>
            </div>
        </div>
    );
}

function HomeMarquee({
    items,
    label,
    className,
}: {
    items: MarqueeItem[];
    label: string;
    className: string;
}) {
    return (
        <div className={`home-marquee ${className}`}>
            <div className="home-marquee-viewport">
                <div className="home-marquee-track">
                    {[false, true].map((isDuplicate) => (
                        <ul
                            className="home-marquee-items"
                            key={isDuplicate ? 'duplicate' : 'primary'}
                            aria-label={isDuplicate ? undefined : label}
                            aria-hidden={isDuplicate || undefined}
                        >
                            {items.map((item) => (
                                <li className="home-marquee-item" key={item.label}>
                                    <span className="home-marquee-item-label">{item.label}</span>
                                    {item.detail && <span className="home-marquee-item-detail">{item.detail}</span>}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Home() {
    return (
        <main className="home-page" id="main-content" tabIndex={-1}>
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
                        <Link className="home-button home-button-primary" to="/contact-me">Get in touch</Link>
                        <a className="home-button" href="https://www.linkedin.com/in/eldermael/"
                           target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
                <div className="home-hero-aside">
                    <div className="circuitry-stage" aria-hidden="true">
                        <img className="circuitry-art" src="/circuitry.svg" alt="" width="600" height="600"
                             decoding="async" fetchPriority="high" />
                        <span className="circuitry-wheel circuitry-wheel-outer" />
                        <span className="circuitry-wheel circuitry-wheel-inner" />
                        <span className="circuitry-orbit circuitry-orbit-primary" />
                        <span className="circuitry-orbit circuitry-orbit-secondary" />
                        <span className="circuitry-scan" />
                    </div>
                    <span className="home-hero-caption">01 / BUILD · SHARE · LEARN · LEAD</span>
                    <img className="home-portrait" src="/miguel-workstation.webp"
                         alt="Miguel Enriquez at his workstation with monitors and audio gear"
                         width="1448" height="940" loading="lazy" decoding="async" />
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

            <section className="home-section home-marquee-section" aria-labelledby="employers-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">Selected employment</p>
                    <div>
                        <h2 id="employers-title">Organizations I have worked for.</h2>
                        <p>Current and former employment relationships, not client affiliations.</p>
                    </div>
                </div>
                <EmployerMarquee />
            </section>

            <section className="home-section home-marquee-section" aria-labelledby="technologies-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">Tools and technologies</p>
                    <div>
                        <h2 id="technologies-title">Technologies represented in my experience.</h2>
                    </div>
                </div>
                <HomeMarquee items={technologies} label="Selected technologies" className="home-technology-marquee" />
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
                        <span className="home-card-index" aria-hidden="true">01</span>
                        <p className="home-eyebrow">Current experience</p>
                        <h3>Nextdata</h3>
                        <p>Principal Software Engineer working across Nextdata OS, infrastructure and platform engineering, field engineering, and customer onboarding.</p>
                        <a href="https://www.nextdata.com/" target="_blank" rel="noreferrer">Nextdata website <span aria-hidden="true">↗</span></a>
                    </article>
                    <article className="home-card home-opentelemetry">
                        <span className="home-card-index" aria-hidden="true">02</span>
                        <p className="home-eyebrow">Open source · OpenTelemetry</p>
                        <h3>Two project contributions</h3>
                        <ul className="home-link-list">
                            <li>
                                <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391" target="_blank" rel="noreferrer">Helm chart webhook fix <span aria-hidden="true">↗</span></a>
                                <p>Webhook configuration fix for the Helm chart.</p>
                            </li>
                            <li>
                                <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903" target="_blank" rel="noreferrer">ClickHouse exporter DDL documentation <span aria-hidden="true">↗</span></a>
                                <p>Documentation for the ClickHouse exporter’s DDL.</p>
                            </li>
                        </ul>
                    </article>
                </div>
                <aside className="home-earlier paper-panel" aria-label="Earlier experience">
                    <span className="home-earlier-label">Earlier experience</span>{' '}
                    <span className="home-earlier-copy">
                        includes platform and cloud work at ThoughtWorks and Greyshore,
                        along with mentorship at ThoughtWorks.
                    </span>
                </aside>
                <p className="home-project-note">
                    <a href="https://github.com/ElderMael/neo-pokepet-pi" target="_blank" rel="noreferrer">neo-pokepet-pi</a>:
                    my fork of <a href="https://github.com/djdiptayan1/pi-pokepet" target="_blank" rel="noreferrer">djdiptayan’s pi-pokepet</a>;
                    terminal sprites by <a href="https://github.com/djdiptayan1/pi-pokepet/pull/15" target="_blank" rel="noreferrer">aryantuntune</a>.
                </p>
            </section>

            <section className="home-section home-process" aria-labelledby="process-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">How I lead</p>
                    <div>
                        <h2 id="process-title">Leading through the work.</h2>
                        <p>I stay hands-on, guiding technical work through collaboration, practical engineering, and shared learning.</p>
                    </div>
                </div>
                <div className="home-process-grid">
                    <article className="home-card">
                        <h3>Platforms &amp; architecture</h3>
                        <p>I help shape and evolve platforms and architecture around product and developer needs.</p>
                    </article>
                    <article className="home-card">
                        <h3>Integration &amp; collaboration</h3>
                        <p>I work on systems integration alongside engineers, including customer engineers where relevant.</p>
                    </article>
                    <article className="home-card">
                        <h3>Engineering &amp; operations</h3>
                        <p>I bring observability, security, and CI/CD into technical conversations and engineering work.</p>
                    </article>
                    <article className="home-card">
                        <h3>Mentoring &amp; leadership</h3>
                        <p>I mentor engineers, support their growth, and help them develop the skills and confidence to lead.</p>
                    </article>
                </div>
            </section>

            <section className="home-section home-principles" aria-labelledby="principles-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">Working principles</p>
                    <div>
                        <h2 id="principles-title">Setting systems up to succeed.</h2>
                        <p>Decision heuristics for shaping engineering work with teams.</p>
                    </div>
                </div>
                <ol className="home-principles-list" role="list">
                    <li className="home-card">
                        <h3>Lead with the people the system serves.</h3>
                        <p>Understand product and developer needs before choosing platforms or architecture.</p>
                    </li>
                    <li className="home-card">
                        <h3>Set systems up to last.</h3>
                        <p>Bring observability, security, and delivery into the work so teams can run and evolve what they build.</p>
                    </li>
                    <li className="home-card">
                        <h3>Build shared ownership.</h3>
                        <p>Work through decisions with engineers and share the reasoning as part of mentoring and collaboration.</p>
                    </li>
                </ol>
            </section>

            <section className="home-section home-community" aria-labelledby="community-title">
                <div className="home-section-heading paper-panel">
                    <p className="home-eyebrow">03 / Community</p>
                    <div>
                        <h2 id="community-title">Good engineering grows when we share it.</h2>
                        <p>I value mentorship and making space for people to learn together.</p>
                        <p><Link to="/contact-me">Contact me about mentorship <span aria-hidden="true">↗</span></Link></p>
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
                <Link className="home-button home-button-primary" to="/contact-me">Contact me</Link>
            </section>
        </main>
    );
}
