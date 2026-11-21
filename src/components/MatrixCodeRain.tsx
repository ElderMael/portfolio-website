import React, { useEffect, useRef, useState } from "react";
import './MatrixCodeRain.css';
import useWindowDimensions from "../useWindowDimensions";

const glyphs = "ミゲルエンジェルエンリクエスロペス0123456789";

export function MatrixCodeRain({ paused = false }: { paused?: boolean }) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const pausedRef = useRef(paused);
    const { height, width } = useWindowDimensions();
    const [reducedMotion, setReducedMotion] = useState(() =>
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

    useEffect(() => { pausedRef.current = paused; }, [paused]);

    useEffect(() => {
        if (!window.matchMedia) return;
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(query.matches);
        update();
        query.addEventListener?.('change', update);
        return () => query.removeEventListener?.('change', update);
    }, []);

    useEffect(() => {
        const element = canvas.current;
        const context = element?.getContext('2d');
        if (!element || !context) return;
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        element.width = width * pixelRatio;
        element.height = height * pixelRatio;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, width, height);
        const fontSize = 16;
        const columns = Math.ceil(width / fontSize);
        const drops = Array.from({ length: columns }, () => Math.random() * (height / fontSize));
        context.font = `${fontSize}px monospace`;

        const drawFrame = () => {
            if (pausedRef.current) return;
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = 'rgba(0, 0, 0, 0.08)';
            context.fillRect(0, 0, width, height);
            context.globalCompositeOperation = 'source-over';
            for (let index = 0; index < drops.length; index++) {
                if (drops[index] < 0) { drops[index]++; continue; }
                context.fillStyle = 'rgba(122, 156, 111, 0.65)';
                context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], index * fontSize, drops[index] * fontSize);
                drops[index] = drops[index] * fontSize > height && Math.random() > .975 ? 0 : drops[index] + 1;
            }
        };
        if (reducedMotion) {
            // One subdued frame provides a static alternative without motion.
            for (let column = 0; column < columns; column++) {
                context.fillStyle = 'rgba(122, 156, 111, 0.18)';
                for (let row = 1; row < height / fontSize; row += 4) {
                    context.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], column * fontSize, row * fontSize);
                }
            }
            return;
        }
        if (!pausedRef.current) drawFrame();
        const timer = window.setInterval(drawFrame, 70);
        return () => window.clearInterval(timer);
    }, [height, width, reducedMotion]);

    return <canvas ref={canvas} className="matrix-rain" aria-hidden="true" />;
}
