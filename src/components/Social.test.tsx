import {cleanup, render, screen, within} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {afterEach, describe, expect, it} from 'vitest';
import {Social} from './Social';

afterEach(() => cleanup());

describe('Social page', () => {
    it('prioritizes the professional profile and approved primary destinations', () => {
        render(<MemoryRouter><Social /></MemoryRouter>);

        expect(screen.getByRole('heading', {name: 'My Social Networks'})).toBeInTheDocument();
        const professionalSection = screen.getByRole('region', {name: 'Connect and explore my work.'});
        expect(within(professionalSection).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual([
            'https://www.linkedin.com/in/eldermael/',
            'https://github.com/ElderMael/',
        ]);

        const communitySection = screen.getByRole('region', {name: 'PirateDevRadio and more.'});
        expect(within(communitySection).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual([
            'https://www.youtube.com/@piratedevradio',
            'https://www.twitch.tv/eldermael',
            'https://www.tiktok.com/@eldermael',
            'https://www.instagram.com/piratedevradio/',
        ]);
    });

    it('keeps verified secondary links and excludes retired or unverified destinations', () => {
        render(<MemoryRouter><Social /></MemoryRouter>);

        const secondarySection = screen.getByRole('region', {name: 'More ways to connect.'});
        expect(within(secondarySection).getAllByRole('link').map(link => link.getAttribute('href'))).toEqual([
            'https://www.patreon.com/eldermael',
            'https://ko-fi.com/eldermael',
            'https://piratedevradio.substack.com/',
            'https://x.com/eldermael',
        ]);
        expect(screen.queryByRole('link', {name: /facebook/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('link', {name: /anchor/i})).not.toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'X (opens in a new tab)'})).toHaveAttribute('href', 'https://x.com/eldermael');
    });

    it('gives external links an accessible name and safe new-tab behavior', () => {
        render(<MemoryRouter><Social /></MemoryRouter>);

        const links = screen.getAllByRole('link').filter(link => link.hasAttribute('target'));
        expect(links).toHaveLength(10);
        links.forEach(link => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
            expect(link).toHaveAccessibleName(/opens in a new tab/i);
        });
        expect(screen.getByRole('link', {name: 'Contact me'})).toHaveAttribute('href', '/contact-me');
    });
});
