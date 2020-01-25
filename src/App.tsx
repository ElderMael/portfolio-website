import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";

class NameCli extends React.Component {
  render() {
    return (
        <div className="container-fluid blast-root justify-content-center vertical-center">
          <h1 className="d-flex ">
            Hi, I am Miguel.
          </h1>
        </div>
    );
  }
}

const App: React.FC = () => {
  return (
      <div>
        <MatrixCodeRain/>
        <NameCli/>
      </div>
  );
};

export default App;
