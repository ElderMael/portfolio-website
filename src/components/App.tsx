import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";

class App extends React.Component<{}, { components: any[] }> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
        <div>
          <MatrixCodeRain/>
          <div className="vertical-center">
            <NameCli/>
          </div>
        </div>
    );
  }

}

export default App;
