import React from 'react';
import {NameCli} from "./NameCli";
import {AboutMe} from "./AboutMe";
import useWindowDimensions from "../useWindowDimensions";

export function Home() {
    const {width} = useWindowDimensions();

    const isWide = width > 2500;

    return (
        <div className="container-fluid">
            <main className={isWide ? "container" : "row"}>
                <NameCli/>
                <AboutMe/>
            </main>
        </div>
    );
}
