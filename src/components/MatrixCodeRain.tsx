import React, {useEffect} from "react";
import './MatrixCodeRain.css';
import useWindowDimensions from "../useWindowDimensions";

const matrix = "ミゲルエンジェルエンリクエスロペス".split("");

export function MatrixCodeRain() {

    const canvas: React.RefObject<HTMLCanvasElement> = React.createRef();
    let {width, height} = useWindowDimensions();

    useEffect(() => {

        let canvasRef = canvas.current!;
        const context = canvasRef.getContext('2d')!;

        canvasRef.height = height;
        canvasRef.width = width;

        const fontSize = 14;
        const columns = canvasRef.width / fontSize;

        const drops: Array<number> = [];
        for (let x = 0; x < columns; x++)
            drops[x] = 1;

        setInterval(() => {
            context.fillStyle = "rgba(0, 0, 0, 0.04)";
            context.fillRect(0, 0, canvasRef.width, canvasRef.height);

            context.fillStyle = "#0F0"; //green text
            context.font = fontSize + "px arial";

            for (let i = 0; i < drops.length; i++) {

                const text = matrix[Math.floor(Math.random() * matrix.length)];
                context.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvasRef.height && Math.random() > 0.975)
                    drops[i] = 0;

                drops[i]++;
            }
        }, 70);
    }, [])

    return (
        <canvas ref={canvas} className="matrix-rain"/>
    );

}
