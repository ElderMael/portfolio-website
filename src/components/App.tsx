import React, { useEffect, useState } from 'react';
import './App.css';
import { Social } from "./Social";
import { Home } from "./Home";
import { ContactMe } from "./ContactMe";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./Navigation";
import { MatrixCodeRain } from "./MatrixCodeRain";

const THEME_KEY = 'portfolio-theme';
type Theme = 'dark' | 'lighter';

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
            <div className="site-shell" data-theme={theme} data-motion-paused={paused}>
                <MatrixCodeRain paused={paused} />
                <header className="site-header">
                    <a className="site-brand" href="/" aria-label="Miguel Enriquez home">MIGUEL <span>/</span> ENRIQUEZ</a>
                    <Navigation />
                    <button className="theme-toggle" type="button" aria-pressed={theme === 'lighter'}
                            onClick={() => setTheme(theme === 'dark' ? 'lighter' : 'dark')}>
                        Green-black theme
                    </button>
                </header>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/contact-me" element={<ContactMe />} />
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
