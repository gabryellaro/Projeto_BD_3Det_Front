// App.js
import './App.css';
import React, { useState, useEffect } from "react";
import Config from "./components/Usuario/Config"
import Logo3Det from "./assets/3det logo3 1.png"

function App() {
  return (
    <main className='app-custom'>
      <div className='space-configure'>
        <img className="det-custom-logo" src={Logo3Det} alt="3det logo"></img>
        <Config /> 

      </div>
    </main>
  );
}

export default App;