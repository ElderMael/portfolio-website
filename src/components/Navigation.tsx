import React from 'react';
import './Navigation.css';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { APP_ROUTE_PATHS } from './routes';

const pages = [
    { label: 'Home', href: APP_ROUTE_PATHS.home },
    { label: 'About', href: APP_ROUTE_PATHS.about },
    { label: 'Social', href: APP_ROUTE_PATHS.social },
];

export function Navigation() {
    const { pathname } = useLocation();
    const matchedPage = pages.find(({ href }) => matchPath({ path: href, end: true }, pathname));
    const isKnownNonNavigationRoute = matchPath(
        { path: APP_ROUTE_PATHS.contact, end: true }, pathname,
    );
    const currentPath = matchedPage?.href ?? (
        isKnownNonNavigationRoute ? undefined : APP_ROUTE_PATHS.home
    );

    return (
        <nav aria-label="Main navigation" className="navigation">
            <div className="navigation-pages">
                {pages.map(({ label, href }) => {
                    const current = currentPath === href;
                    return (
                        <Link
                            key={href}
                            to={href}
                            className={`navigation-tab${current ? ' navigation-tab--current' : ''}`}
                            aria-current={current ? 'page' : undefined}
                        >
                            {current && <span className="navigation-tab-marker" aria-hidden="true">◆</span>}
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="navigation-outbound">
                <a className="navigation-external navigation-code" href="https://github.com/ElderMael/"
                   target="_blank" rel="noopener noreferrer">
                    CODE <span aria-hidden="true">↗</span>
                </a>
                <a className="navigation-external navigation-radio" href="https://www.youtube.com/@piratedevradio"
                   target="_blank" rel="noopener noreferrer">
                    <span className="navigation-radio-copy">
                        <span className="navigation-radio-label">PIRATE DEV RADIO</span>
                        <span className="navigation-radio-title">TUNE IN <span aria-hidden="true">↗</span></span>
                    </span>
                    <span className="navigation-radio-dot" aria-hidden="true" />
                </a>
            </div>
        </nav>
    );
}
