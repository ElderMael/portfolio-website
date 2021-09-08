import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";

class App extends React.Component<{}, { components: any[] }> {
    render() {
        return (
            <div className="container-fluid">
                <MatrixCodeRain/>
                <Navigation/>
                <main className="row">
                    <NameCli/>
                    <AboutMe/>
                </main>
            </div>
        );
    }
}

export default App;
