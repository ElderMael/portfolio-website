import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";
import useWindowDimensions from "../useWindowDimensions";

export default function App() {

    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>
            <main className={isWide ? "container" : "row"}>
                <AboutMe/>
                <NameCli/>
            </main>
        </div>
    );
}

