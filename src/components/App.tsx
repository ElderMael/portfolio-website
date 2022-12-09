import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";
import useWindowDimensions from "../useWindowDimensions";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function Home() {
    const {height, width} = useWindowDimensions();

    const isWide = width > 2500;

    const isHigh = height > 812;


    if (isHigh) {
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

export default function App() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Home/>}/>
                <Route path="*" element={<Home/>}/>
            </Route>
        </Routes>
    </BrowserRouter>


}

