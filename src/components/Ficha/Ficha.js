import React from 'react';
import { Link } from 'react-router-dom';

function Ficha() {
  return (
    <div>
      <h1>Bem-vindo à página da Ficha</h1>
      <p>Esta é a página da Ficha. <Link to="/">Voltar para a Home</Link></p>
    </div>
  );
}

export default Ficha;
