import React from 'react';
import './App.css';

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%".split("");

class MatrixCodeRain extends React.Component<{}, {}> {

  private canvas: React.RefObject<HTMLCanvasElement>;
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

    const fontSize = 10;
    const columns = canvas.width / fontSize;

    const drops: Array<number> = [];
    for (let x = 0; x < columns; x++)
      drops[x] = 1;

    this.intervalId = setInterval(() => {
      context.fillStyle = "rgba(0, 0, 0, 0.04)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#0F0"; //green text
      context.font = fontSize + "px arial";
      //looping over drops
      for (let i = 0; i < drops.length; i++) {
        //a random chinese character to print
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    }, 35)
  }

  componentWillUnmount(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
        <canvas ref={this.canvas}/>
    );
  }

}

const App: React.FC = () => {
  return (
      <MatrixCodeRain/>
  );
};

export default App;
