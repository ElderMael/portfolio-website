import React from 'react';
import './App.css';
import {Social} from "./Social";
import {Home} from "./Home";
import {ContactMe} from "./ContactMe";
import {BrowserRouter, Route, Routes} from "react-router-dom";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/social" element={<Social/>}/>
                <Route path="/contact-me" element={<ContactMe/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}
