import React from 'react';
import { Link } from 'react-router-dom';
import './Ficha.css';
import CadastroFicha from './CadastroFicha';
import ListarFicha from './ListarFichas';



function Ficha() {
  return (
    <main>  
      
      <ListarFicha/>
      <CadastroFicha/>

      <p>Esta é a página da Ficha. <Link to="/">Voltar para a Home</Link></p>
      {/* <div className="container">
        <p>Esta é a página da Ficha. <Link to="/">Voltar para a Home</Link></p>
        <h1>CADASTRAR FICHA</h1>
        <form>
          <div className="input-row">
            <label>
              ID da Ficha:{" "}
              <input className="outlined-basic2" type="text" name="id_ficha" />
            </label>
            <label>
              ID da Mesa:{" "}
              <input className="outlined-basic2" type="text" name="id_mesa" />
            </label>
          </div>
          <div className="input-row">
            <label>
              Email:{" "}
              <input className="outlined-basic2" type="text" name="email" />
            </label>
            <label>
              ID do Veículo:{" "}
              <input className="outlined-basic2" type="text" name="id_veiculo" />
            </label>
          </div>
          <div className="input-row">
            <label>
              Nome:{" "}
              <input className="outlined-basic2" type="text" name="name" />
            </label>
            <label>
              Tipo de Ficha:{" "}
              <select className="outlined-basic2" name="tipo_ficha">
                <option value="player">Player</option>
                <option value="veiculo">Veículo</option>
              </select>
            </label>
          </div>
          <div className="input-row">
            <label>
              Arquétipo:{" "}
              <input className="outlined-basic2" type="text" name="arquetipo" />
            </label>
            <label>
              Poder:{" "}
              <input className="outlined-basic2" type="text" name="poder" />
            </label>
          </div>
          <div className="input-row">
            <label>
              Habilidade:{" "}
              <input className="outlined-basic2" type="text" name="habilidade" />
            </label>
            <label>
              Resistência:{" "}
              <input className="outlined-basic2" type="text" name="resistencia" />
            </label>
          </div>
          <input type="submit" value="Enviar" />
        </form>
      </div> */}
    </main>
  );
}

export default Ficha;