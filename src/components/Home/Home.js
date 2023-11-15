import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import iconUser from "../../assets/user.svg"
import IconFicha from "../../assets/ficha.svg"
import IconMesa from "../../assets/mesa.svg"
import IconEspada from "../../assets/espada.svg"

export default function Home() {
    return (
        <div className="config-space-total">
          <p>BEM VINDO ADMINISTRADOR, ESCOLHA O QUE DESEJA VERIFICAR</p>
          <div className="config-space-home">
          <div className="quadrado-config">
          <img src={iconUser}></img>
          <Link className="config-link"to="/user">User</Link>
          </div>
          <div className="quadrado-config">
          <img src={IconFicha}></img>
          <Link className="config-link"to="/ficha">Ficha</Link>
          </div>
          <div className="quadrado-config">
          <img src={IconMesa}></img>
          <Link className="config-link"to="/mesa">Mesa</Link>
          </div>
          </div>
           
        </div>
    )
}
