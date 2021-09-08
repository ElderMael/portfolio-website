import React from "react";
import './MatrixCodeRain.css';

const matrix = "ミゲルエンジェルエンリクエスロペス".split("");

export class MatrixCodeRain extends React.Component<{}, {}> {

    private readonly canvas: React.RefObject<HTMLCanvasElement>;
    private intervalId?: NodeJS.Timeout;

    constructor(props: {}) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidMount(): void {
        const canvas = this.canvas.current!;
        const context = canvas.getContext('2d')!;

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        const fontSize = 14;
        const columns = canvas.width / fontSize;

        const drops: Array<number> = [];
        for (let x = 0; x < columns; x++)
            drops[x] = 1;

        this.intervalId = setInterval(() => {
            context.fillStyle = "rgba(0, 0, 0, 0.04)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = "#0F0"; //green text
            context.font = fontSize + "px arial";

            for (let i = 0; i < drops.length; i++) {

                const text = matrix[Math.floor(Math.random() * matrix.length)];
                context.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                    drops[i] = 0;

                drops[i]++;
            }
        }, 70)
    }

    componentWillUnmount(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }

    render() {
        return (
            <canvas ref={this.canvas} className="matrix-rain"/>
        );
    }

}
