import Routes from './Routes';
import './App.css';
import React, { useState, useEffect } from "react";
import Config from "./components/Usuario/Config"
import Logo3Det from "./assets/3det logo3 1.png"
import CadastroMesa from './components/Mesa/MesaT';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <main className='app-custom'>
      <div className='space-configure'>
        <img className="det-custom-logo" src={Logo3Det} alt="3det logo"></img>
        <BrowserRouter>
      <Routes />
    </BrowserRouter>
      </div>
    </main>
  );
}

export default App;