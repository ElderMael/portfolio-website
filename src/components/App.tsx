import React, { useEffect, useState } from 'react';
import './App.css';
import { Social } from "./Social";
import { About } from "./About";
import { Home } from "./Home";
import { ContactMe } from "./ContactMe";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { MatrixCodeRain } from "./MatrixCodeRain";
import { APP_ROUTE_PATHS } from './routes';

const THEME_KEY = 'portfolio-theme';
type Theme = 'dark' | 'lighter';

const routeTitles: Record<string, string> = {
    [APP_ROUTE_PATHS.home]: 'Miguel Enriquez | AI & Systems Engineering',
    [APP_ROUTE_PATHS.contact]: 'Contact Miguel Enriquez | Portfolio',
    [APP_ROUTE_PATHS.social]: 'Social & Community | Miguel Enriquez',
    [APP_ROUTE_PATHS.about]: 'About Miguel Enriquez | AI & Systems Engineering',
};

function RouteDocumentTitle() {
    const { pathname } = useLocation();

    useEffect(() => {
        const routePath = pathname.replace(/\/+$/, '') || '/';
        document.title = routeTitles[routePath] ?? routeTitles['/'];
    }, [pathname]);

    return null;
}

function focusMainContent() {
    document.getElementById('main-content')?.focus();
}

function storedTheme(): Theme {
    try {
        return window.localStorage.getItem(THEME_KEY) === 'lighter' ? 'lighter' : 'dark';
    } catch {
        return 'dark';
    }
}

export default function App() {
    const [theme, setTheme] = useState<Theme>(storedTheme);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            window.localStorage.setItem(THEME_KEY, theme);
        } catch {
            // The in-memory toggle remains usable if browser storage is blocked.
        }
    }, [theme]);

    return (
        <BrowserRouter>
            <RouteDocumentTitle />
            <div className="site-shell" data-theme={theme} data-motion-paused={paused}>
                <a className="skip-link" href="#main-content" onClick={focusMainContent}>
                    Skip to main content
                </a>
                <MatrixCodeRain paused={paused} />
                <header className="site-header">
                    <Link className="site-brand" to="/" aria-label="Miguel Enriquez home">MIGUEL <span>/</span> ENRIQUEZ</Link>
                    <Navigation />
                    <button className="theme-toggle" type="button" aria-pressed={theme === 'lighter'}
                            onClick={() => setTheme(theme === 'dark' ? 'lighter' : 'dark')}>
                        Green-black theme
                    </button>
                </header>
                <Routes>
                    <Route path={APP_ROUTE_PATHS.home} element={<Home />} />
                    <Route path={APP_ROUTE_PATHS.social} element={<Social />} />
                    <Route path={APP_ROUTE_PATHS.about} element={<About />} />
                    <Route path={APP_ROUTE_PATHS.contact} element={<ContactMe />} />
                    <Route path="*" element={<Home />} />
                </Routes>
                <footer className="site-footer">
                    <span>© Miguel Enriquez</span>
                    <button className="rain-toggle" type="button" aria-label="Pause or resume background animation"
                            aria-pressed={paused} onClick={() => setPaused(value => !value)}>
                        {paused ? 'Resume background animation' : 'Pause background animation'}
                    </button>
                </footer>
            </div>
        </BrowserRouter>
    );
}
