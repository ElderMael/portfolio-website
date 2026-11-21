import React from 'react';
import { Link } from 'react-router-dom';
import type {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCoffee, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {
    faGithub,
    faInstagram,
    faLinkedin,
    faPatreon,
    faTiktok,
    faTwitch,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import './Social.css';

const primaryLinks = [
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/eldermael/',
        description: 'Professional profile',
        icon: faLinkedin,
        style: 'linkedin',
    },
    {
        name: 'GitHub',
        href: 'https://github.com/ElderMael/',
        description: 'Code and open source',
        icon: faGithub,
        style: 'github',
    },
];

const communityLinks = [
    {
        name: 'PirateDevRadio on YouTube',
        href: 'https://www.youtube.com/@piratedevradio',
        description: 'Podcast channel',
        icon: faYoutube,
        style: 'youtube',
    },
    {
        name: 'Twitch',
        href: 'https://www.twitch.tv/eldermael',
        description: 'Follow on Twitch',
        icon: faTwitch,
        style: 'twitch',
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@eldermael',
        description: 'Follow on TikTok',
        icon: faTiktok,
        style: 'tiktok',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/piratedevradio/',
        description: 'Follow on Instagram',
        icon: faInstagram,
        style: 'instagram',
    },
];

const secondaryLinks = [
    {
        name: 'Patreon',
        href: 'https://www.patreon.com/eldermael',
        icon: faPatreon,
        style: 'patreon',
    },
    {
        name: 'Ko-fi',
        href: 'https://ko-fi.com/eldermael',
        icon: faCoffee,
        style: 'kofi',
    },
    {
        name: 'Substack',
        href: 'https://piratedevradio.substack.com/',
        icon: faNewspaper,
        style: 'substack',
    },
    {
        name: 'X',
        href: 'https://x.com/eldermael',
        style: 'x',
    },
];

type SocialLink = {
    name: string;
    href: string;
    description?: string;
    icon?: IconDefinition;
    style: string;
};

function ProfileCard({link, featured = false}: {link: SocialLink; featured?: boolean}) {
    return (
        <a
            className={`social-link-card social-link-card--${link.style}${featured ? ' social-link-card--featured' : ''}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name} (opens in a new tab)`}
        >
            <span className="social-link-icon" aria-hidden="true">
                {link.icon && <FontAwesomeIcon className="social-fa-icon" icon={link.icon} />}
            </span>
            <span className="social-link-copy">
                <span className="social-link-name">{link.name}</span>
                {link.description && <span className="social-link-description">{link.description}</span>}
            </span>
            <span className="social-link-arrow" aria-hidden="true">↗</span>
        </a>
    );
}

export function Social() {
    return (
        <main className="social-page" id="main-content" tabIndex={-1}>
            <header className="social-intro social-panel">
                <p className="social-eyebrow">02 / Social and community</p>
                <h1 id="social-title">My Social Networks</h1>
                <p>Find me online: professional work, open source, and PirateDevRadio.</p>
            </header>

            <section className="social-section" aria-labelledby="social-professional-title">
                <div className="social-section-heading">
                    <p className="social-eyebrow">01 / Professional</p>
                    <h2 id="social-professional-title">Connect and explore my work.</h2>
                </div>
                <div className="social-primary-grid">
                    {primaryLinks.map((link, index) => <ProfileCard key={link.name} link={link} featured={index === 0} />)}
                </div>
            </section>

            <section className="social-section" aria-labelledby="social-community-title">
                <div className="social-section-heading">
                    <p className="social-eyebrow">02 / Community</p>
                    <h2 id="social-community-title">PirateDevRadio and more.</h2>
                </div>
                <div className="social-community-grid">
                    {communityLinks.map(link => <ProfileCard key={link.name} link={link} />)}
                </div>
            </section>

            <section className="social-section social-secondary" aria-labelledby="social-secondary-title">
                <div className="social-panel social-secondary-panel">
                    <div className="social-section-heading">
                        <p className="social-eyebrow">03 / More</p>
                        <h2 id="social-secondary-title">More ways to connect.</h2>
                    </div>
                    <ul className="social-secondary-list">
                        {secondaryLinks.map(link => (
                            <li key={link.name}>
                                <a
                                    className={`social-secondary-link social-link-card--${link.style}`}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${link.name} (opens in a new tab)`}
                                >
                                    <span className="social-link-icon" aria-hidden="true">
                                        {link.icon ? <FontAwesomeIcon className="social-fa-icon" icon={link.icon} /> : 'X'}
                                    </span>
                                    <span>{link.name}</span>
                                    <span className="social-link-arrow" aria-hidden="true">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <p className="social-contact social-panel">
                Looking to get in touch? <Link to="/contact-me">Contact me <span aria-hidden="true">↗</span></Link>
            </p>
        </main>
    );
}
