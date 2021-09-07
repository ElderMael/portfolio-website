import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";

class App extends React.Component<{}, { components: any[] }> {
  render() {
    return (
        <div className="container">
          <MatrixCodeRain/>
          <Navigation/>
          <div className="row">
            <NameCli/>
            <AboutMe/>
          </div>
        </div>
    );
  }
}

export default App;
