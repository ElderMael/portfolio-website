import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";

const App: React.FC = () => {
  return (
      <div>
        <MatrixCodeRain/>
        <NameCli/>
      </div>
  );
};

export default App;
