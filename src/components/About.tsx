import React from 'react';
import { getEmployerWebsite } from './employerLinks';
import './About.css';

type WorkEntry = {
    employer: string;
    role: string;
    start: string;
    startDate: string;
    end: string;
    endDate?: string;
    description?: string;
};

const workHistory: WorkEntry[] = [
    {
        employer: 'Nextdata',
        role: 'Founding Principal Software Engineer',
        start: 'July 2023',
        startDate: '2023-07',
        end: 'Present',
        description: 'Work across Nextdata OS, infrastructure and platform engineering, field engineering, and customer onboarding.',
    },
    {
        employer: 'Nextdata',
        role: 'Consultant',
        start: 'January 2023',
        startDate: '2023-01',
        end: 'June 2023',
        endDate: '2023-06',
        description: 'Helped establish infrastructure and supported customer deployments to their clouds.',
    },
    {
        employer: 'InDebted',
        role: 'Software Engineer',
        start: 'January 2022',
        startDate: '2022-01',
        end: 'December 2022',
        endDate: '2022-12',
        description: 'Worked on event-based customer integrations and internal tools.',
    },
    {
        employer: 'greyshore',
        role: 'Principal Software Engineer, Infrastructure / DevOps',
        start: 'January 2021',
        startDate: '2021-01',
        end: 'December 2021',
        endDate: '2021-12',
        description: 'Worked on platform building and digital transformations.',
    },
    {
        employer: 'ThoughtWorks',
        role: 'Senior Consultant',
        start: 'November 2016',
        startDate: '2016-11',
        end: 'January 2021',
        endDate: '2021-01',
        description: 'Worked on platforms, reference architecture, CI/CD, and mentoring.',
    },
    {
        employer: 'Softtek',
        role: 'Site Reliability Engineer',
        start: 'February 2016',
        startDate: '2016-02',
        end: 'November 2016',
        endDate: '2016-11',
        description: 'Maintained and improved a critical application used in aircraft and airport operations.',
    },
    {
        employer: 'Accenture',
        role: 'Front-End Engineer',
        start: 'November 2014',
        startDate: '2014-11',
        end: 'February 2016',
        endDate: '2016-02',
    },
    {
        employer: 'Softtek',
        role: 'Tech Lead',
        start: 'April 2013',
        startDate: '2013-04',
        end: 'November 2014',
        endDate: '2014-11',
    },
    {
        employer: '4F Systems',
        role: 'Programmer',
        start: 'January 2009',
        startDate: '2009-01',
        end: 'December 2010',
        endDate: '2010-12',
    },
];

function HistoryEntry({ entry, index }: { entry: WorkEntry; index: number }) {
    const website = getEmployerWebsite(entry.employer);
    return (
        <li className="about-history-item">
            <p className="about-history-date">
                <time dateTime={entry.startDate}>{entry.start}</time>
                <span> to </span>
                {entry.endDate ? <time dateTime={entry.endDate}>{entry.end}</time> : entry.end}
            </p>
            <article className="about-card about-history-card">
                <span className="about-card-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <p className="about-employer">
                    {website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {entry.employer} <span aria-hidden="true">↗</span>
                        </a>
                    ) : entry.employer}
                </p>
                <h3>{entry.role}</h3>
                {entry.description && <p className="about-history-description">{entry.description}</p>}
            </article>
        </li>
    );
}

export function About() {
    return (
        <main className="about-page" id="main-content" tabIndex={-1}>
            <header className="about-intro about-panel">
                <p className="about-eyebrow">01 / About</p>
                <h1 id="about-title">Engineering across the stack.</h1>
                <p className="about-summary">
                    I build and evolve digital platforms, with a focus on microservices and
                    evolutionary architecture, observability, security, CI/CD, DevOps and SRE,
                    developer platforms, and product development. My experience includes platform
                    engineering, event-based systems integration, field engineering, and customer
                    onboarding.
                </p>
                <p className="about-summary">
                    I also work across AI and data engineering, contribute to OpenTelemetry, and
                    mentor engineers. Through PirateDevRadio, I participate in conversations about
                    software development and engineering culture.
                </p>
            </header>

            <section className="about-section" aria-labelledby="about-history-title">
                <div className="about-section-heading">
                    <p className="about-eyebrow">02 / Work history</p>
                    <h2 id="about-history-title">Selected roles over time.</h2>
                    <p>Experience across engineering, infrastructure, platforms, and consulting.</p>
                </div>
                <ol className="about-history" aria-label="Work history">
                    {workHistory.map((entry, index) => (
                        <HistoryEntry key={`${entry.employer}-${entry.startDate}`} entry={entry} index={index} />
                    ))}
                </ol>
            </section>

            <section className="about-community about-panel" aria-labelledby="about-community-title">
                <p className="about-eyebrow">03 / Community &amp; open source</p>
                <h2 id="about-community-title">Sharing knowledge and contributing in the open.</h2>
                <p>
                    I mentor engineers and take part in PirateDevRadio, a community project for
                    conversations about software development, AI, and engineering culture.
                </p>
                <a className="about-community-link" href="https://www.youtube.com/@piratedevradio"
                   target="_blank" rel="noreferrer">
                    PirateDevRadio on YouTube <span aria-hidden="true">↗</span>
                </a>
                <h3>OpenTelemetry contributions</h3>
                <ul className="about-contributions">
                    <li>
                        <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/pull/1391"
                           target="_blank" rel="noreferrer">
                            Helm chart webhook fix <span aria-hidden="true">↗</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/35903"
                           target="_blank" rel="noreferrer">
                            ClickHouse exporter DDL documentation <span aria-hidden="true">↗</span>
                        </a>
                    </li>
                </ul>
            </section>
        </main>
    );
}
