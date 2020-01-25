import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";

class App extends React.Component<{}, { components: any[] }> {

  private interval?: NodeJS.Timeout;

  private componentsToShow: any[] = [
    <MatrixCodeRain key={1}/>,
    <NameCli key={2}/>,
    <Navigation key={3}/>
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      components: []
    };
  }


  componentDidMount(): void {
    this.pushNewComponent();
    this.interval = setInterval(() => {
      this.pushNewComponent();

      if (this.componentsToShow.length === 0) {
        const toClear = this.interval!;
        clearInterval(toClear);
      }

    }, 3500);
  }

  render() {
    return (
        <div>
          {this.state.components}
        </div>
    );
  }

  private pushNewComponent() {
    this.setState({
      components: [
        ...this.state.components,
        this.componentsToShow.shift()
      ]
    });
  }

}

export default App;
