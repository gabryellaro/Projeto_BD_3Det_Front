import React from 'react';
import {BrowserRouter, Route, Routes as ReactRouter } from 'react-router-dom';
import Mesa from './components/Mesa/Mesa';
import Config from './components/Usuario/Config';
import Ficha from './components/Ficha/Ficha';
import Home from './components/Home/Home';


export default function  Routes() {
    return (
        <ReactRouter>
            <Route path= "/"  element={ <Home /> } />
            <Route path= "/user"  element= {<Config/>} />
            <Route path= "/mesa"   element= {<Mesa/>} />
            <Route path= "/ficha"  element={<Ficha/>} />
            
        </ReactRouter>
    );
}