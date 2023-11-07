// App.js
import React from "react";
import './App.css';
import Config from "./Config"; // Importe o componente Config

function App() {
  return (
    <main className='app-custom'>
      <div>
        <div className="bonito">
          Cadastro de Usuário
          <Config />
        </div>
      </div>
    </main>
  );
}

export default App;