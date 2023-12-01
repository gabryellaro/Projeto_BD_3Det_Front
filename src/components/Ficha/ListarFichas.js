import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ficha.css'
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconDelete from '../../assets/lixo.svg'

const ListarFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchedFicha, setSearchedFicha] = useState(""); // Adicione searchedFicha ao estado
  const [fichaFound, setFichaFound] = useState(false); // Adicione fichaFound ao estado

  const deletarFicha = async (id_ficha) => {
    try {
      await axios.delete(`http://168.75.100.153:5000/excluir_ficha/${id_ficha}`);
      console.log("Ficha deletada com sucesso");
      setFichas(fichas.filter(ficha => ficha.id_ficha !== id_ficha)); // Remova a ficha da lista local
    } catch (error) {
      console.error("Erro ao deletar a ficha:", error);
    }
  };

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
      <TableContainer component={Paper}>
        <Table className="table-config-ficha">
          <TableHead>
            <TableRow>
              <TableCell>ID da Ficha</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo Ficha</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichas.map((ficha) => (
              <TableRow key={ficha.id_ficha}>
                <TableCell>{ficha.id_ficha}</TableCell>
                <TableCell>{ficha.nome}</TableCell>
                <TableCell>{ficha.tipo_ficha}</TableCell>
                <TableCell>
                <Button onClick={() => deletarFicha(ficha.id_ficha)}><img src={IconDelete}></img></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListarFicha;
