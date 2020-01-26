import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";

class App extends React.Component<{}, { components: any[] }> {
  render() {
    return (
        <div>
          <MatrixCodeRain/>
          <NameCli/>
          <Navigation/>
        </div>
    );
  }
}

export default App;
