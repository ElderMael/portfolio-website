import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ContactMe } from './ContactMe';

describe('contact page', () => {
    afterEach(() => cleanup());

    it('explains professional and mentorship inquiries without promising availability', () => {
        render(<ContactMe />);

        expect(screen.getByRole('heading', { name: 'Contact me.' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Professional inquiries' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Mentorship inquiries' })).toBeInTheDocument();
        expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute(
            'aria-describedby', 'contact-message-help');
    });

    it('preserves Formspree configuration, field names, and native required validation', () => {
        render(<ContactMe />);

        const form = document.querySelector('.contact-form-panel form');
        expect(form).toHaveAttribute('action', 'https://formspree.io/f/xknkjwpb');
        expect(form).toHaveAttribute('method', 'POST');
        expect(screen.getByRole('textbox', { name: 'Name' })).toHaveAttribute('name', 'name');
        expect(screen.getByRole('textbox', { name: 'Name' })).toBeRequired();
        expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('name', '_replyto');
        expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('type', 'email');
        expect(screen.getByRole('textbox', { name: 'Email' })).toBeRequired();
        expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('name', 'message');
        expect(screen.getByRole('textbox', { name: 'Message' })).toBeRequired();
        expect(screen.getByLabelText('Leave this field blank', { selector: 'input' }))
            .toHaveAttribute('name', 'bot-field');
    });

    it('blocks a filled honeypot and leaves ordinary submissions to Formspree', () => {
        render(<ContactMe />);

        const form = document.querySelector('.contact-form-panel form')!;
        const honeypot = screen.getByLabelText('Leave this field blank', { selector: 'input' });
        fireEvent.change(honeypot, { target: { value: 'bot entry' } });
        const spamSubmission = new Event('submit', { bubbles: true, cancelable: true });
        fireEvent(form, spamSubmission);
        expect(spamSubmission.defaultPrevented).toBe(true);

        fireEvent.change(honeypot, { target: { value: '' } });
        const ordinarySubmission = new Event('submit', { bubbles: true, cancelable: true });
        fireEvent(form, ordinarySubmission);
        expect(ordinarySubmission.defaultPrevented).toBe(false);
    });
});
