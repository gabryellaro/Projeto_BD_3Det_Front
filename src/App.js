import Routes from './Routes';
import './App.css';
import React from "react";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <main className='app-custom'>
      <div className='space-configure'>
        <BrowserRouter>
      <Routes />
    </BrowserRouter>
      </div>
    </main>
  );
}

export default App;