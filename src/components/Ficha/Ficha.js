import React from 'react';
import { Link } from 'react-router-dom';
import './Ficha.css';
import ListarFicha from './ListarFichas';

function Ficha() {
  return (
    <main className='custom-main-ficha'>    
      <Link className="custom-link-ficha" to="/">Voltar</Link>
      <ListarFicha/>
    </main>
  );
}

export default Ficha;