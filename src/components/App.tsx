import React from 'react';
import './App.css';
import {Social} from "./Social";
import {Home} from "./Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";


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
