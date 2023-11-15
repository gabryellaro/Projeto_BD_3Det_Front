import React from 'react';
import { Link } from 'react-router-dom';
import CadastroMesa from './MesaT';
import "./Mesa.css"

function Mesa() {
  return (
    <div>
        <Link className="custom-button2" to='/'>Voltar</Link>
        <CadastroMesa></CadastroMesa>
    </div>
  );
}

export default Mesa;
