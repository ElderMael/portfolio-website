import React from 'react';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {Navigation} from "./Navigation";
import {NameCli} from "./NameCli";
import {AboutMe} from "./AboutMe";
import useWindowDimensions from "../useWindowDimensions";

export function Home() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <MatrixCodeRain/>
            <Navigation/>
            <main className={isWide ? "container" : "row"}>
                <NameCli/>
                <AboutMe/>
            </main>
        </div>
    );
}
