import React from 'react';
import { Link } from 'react-router-dom';

function Mesa() {
  return (
    <div>
      <h1>Bem-vindo à página da Mesa</h1>
      <p>Esta é a página da Mesa.</p>
        <Link to='/'>Acessar página home...</Link>
    </div>
  );
}

export default Mesa;
