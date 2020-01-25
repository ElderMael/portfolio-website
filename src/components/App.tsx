import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";

class App extends React.Component<{}, { components: any[] }> {

  private interval?: NodeJS.Timeout;

  private componentsToShow: any[] = [
    <MatrixCodeRain/>,
    <NameCli/>
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      components: []
    };
  }


  componentDidMount(): void {
    this.interval = setInterval(() => {

      this.setState({
        components: [
          ...this.state.components,
          this.componentsToShow.shift()
        ]
      });

      if (this.componentsToShow.length === 0) {
        const toClear = this.interval!;
        clearInterval(toClear);
      }

    }, 2500);
  }

  render() {
    return (
        <div>
          {this.state.components}
        </div>
    );
  }
}

export default App;
