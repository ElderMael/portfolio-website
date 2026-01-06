import React, {useEffect} from "react";
import './MatrixCodeRain.css';
import useWindowDimensions from "../useWindowDimensions";

const matrix = "ミゲルエンジェルエンリクエスロペス".split("");
const targetName = "Miguel Enriquez".split("");

export function MatrixCodeRain() {

    const canvas: React.RefObject<HTMLCanvasElement | null> = React.createRef();

    let {height, width} = useWindowDimensions();


    useEffect(() => {
        let canvasRef = canvas.current!;

        canvasRef.height = height;
        canvasRef.width = width;

        const context = canvasRef.getContext('2d')!;

        const fontSize = 14;
        const columns = Math.floor(canvasRef.width / fontSize);

        const drops: Array<number> = [];
        const activeNameColumn: Array<{index: number, startRow: number} | null> = [];
        const glitchFrames: Array<number> = []; // Tracks remaining glitch frames per column

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Stagger starts
            activeNameColumn[x] = null;
            glitchFrames[x] = 0;
        }

        const intervalId = setInterval(() => {
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvasRef.width, canvasRef.height);

            context.font = fontSize + "px arial";

            for (let i = 0; i < drops.length; i++) {
                if (drops[i] < 0) {
                    drops[i]++;
                    continue;
                }

                let char = "";
                
                // Check if this column should start spelling the name
                if (activeNameColumn[i] === null && Math.random() > 0.999) {
                    activeNameColumn[i] = { index: 0, startRow: drops[i] };
                }

                const isSpelling = activeNameColumn[i] !== null;

                // Probability to start a multi-frame glitch
                if (glitchFrames[i] === 0 && Math.random() > 0.99) {
                    glitchFrames[i] = Math.floor(Math.random() * 10) + 5; // Glitch for 5-15 frames
                }

                const isCurrentlyGlitching = glitchFrames[i] > 0;

                if (isSpelling) {
                    const nameData = activeNameColumn[i]!;
                    char = targetName[nameData.index];
                    
                    if (isCurrentlyGlitching) {
                        // Glitchy name: random color and occasionally random character
                        context.fillStyle = Math.random() > 0.5 ? "#FFF" : "#39ff14";
                        if (Math.random() > 0.3) {
                            char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                        }
                    } else {
                        context.fillStyle = "#39ff14"; // Brighter green for the name
                    }
                    
                    nameData.index++;
                    
                    if (nameData.index >= targetName.length) {
                        activeNameColumn[i] = null;
                    }
                } else {
                    // Standard logic
                    const text = matrix[Math.floor(Math.random() * matrix.length)];
                    
                    if (isCurrentlyGlitching) {
                        context.fillStyle = Math.random() > 0.8 ? "#FFF" : "#39ff14";
                        char = String.fromCharCode(33 + Math.floor(Math.random() * 94));
                    } else {
                        context.fillStyle = "#0F0"; // Standard green
                        char = text;
                    }
                }

                context.fillText(char, i * fontSize, drops[i] * fontSize);

                if (glitchFrames[i] > 0) {
                    glitchFrames[i]--;
                }

                if (drops[i] * fontSize > canvasRef.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    activeNameColumn[i] = null; // Reset spelling when drop resets
                    glitchFrames[i] = 0;
                }

                drops[i]++;
            }
        }, 70);

        return () => {
            clearInterval(intervalId);
        }

    });

    return (
        <canvas ref={canvas} className="matrix-rain"/>
    );

}
