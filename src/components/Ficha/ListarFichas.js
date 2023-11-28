import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://168.75.100.153:5000/listar_fichas');
        setFichas(response.data.fichas);
      } catch (error) {
        setErro('Erro ao carregar as fichas.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className='config-space-listar'>
      <h1>Listagem de Fichas</h1>
      {erro && <p>{erro}</p>}
      <ul>
        {fichas.map((ficha) => (
          <li key={ficha.id_ficha}>
            <p>ID da Ficha: {ficha.id_ficha}</p>
            <p>Nome: {ficha.nome}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarFicha;
