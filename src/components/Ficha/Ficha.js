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
    <main>    
      <ListarFicha/>
      {/* <CadastroFicha/>  */}
      {/* <CadastroVantagem/>
      <CadastroDesvantagem/>
      <CadastroPericia></CadastroPericia> */}
      <p>Esta é a página da Ficha. <Link to="/">Voltar para a Home</Link></p>
    </main>
  );
}

export default Ficha;