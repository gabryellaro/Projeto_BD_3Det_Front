import React from 'react';
import { Link } from 'react-router-dom';

function Mesa() {
  return (
    <div>
      <h1>Bem-vindo à página da Mesa</h1>
      <p>Esta é a página da Mesa. <Link to="/">Voltar para a Home</Link></p>
    </div>
  );
}

export default Mesa;
