import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";

export default function App() {
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

