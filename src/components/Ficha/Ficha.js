import React from 'react';
import { Link } from 'react-router-dom';
import './Ficha.css';
import CadastroFicha from './CadastroFicha';
import ListarFicha from './ListarFichas';



function Ficha() {
  return (
    <main>  
      
      <ListarFicha/>
      {/* <CadastroFicha/>  */}
      <p>Esta é a página da Ficha. <Link to="/">Voltar para a Home</Link></p>
    </main>
  );
}

export default Ficha;