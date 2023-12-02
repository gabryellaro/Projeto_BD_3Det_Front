import React from 'react';
import { Link } from 'react-router-dom';
import './Ficha.css';
import CadastroFicha from './CadastroFicha';
import ListarFicha from './ListarFichas';
import CadastroVantagem from './CadastroVantagem';
import CadastroDesvantagem from './CadastroDesvantagem';
import CadastroPericia from './CadastroPericia';

function Ficha() {
  return (
    <main className='custom-main-ficha'>    
      <Link className="custom-link-ficha" to="/">Voltar</Link>
      <ListarFicha/>
    </main>
  );
}

export default Ficha;