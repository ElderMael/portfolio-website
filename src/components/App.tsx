import React from 'react';
import './App.css';
import {MatrixCodeRain} from "./MatrixCodeRain";
import {NameCli} from "./NameCli";
import {Navigation} from "./Navigation";
import {AboutMe} from "./AboutMe";
import {Social} from "./Social";
import useWindowDimensions from "../useWindowDimensions";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function Home() {
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

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<Home/>}/>
                </Route>
                <Route path="/social">
                    <Route index element={<Social/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
