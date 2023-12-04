import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../Usuario/Config.css"
import "./Mesa.css"
import IconDelete from "../../assets/lixo.svg";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function CadastroMesa() {
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState({
    nome_mesa: "",
    mestre_email: "",
    id_mesa: "",
  });

  const [showInputs, setShowInputs] = useState(false);

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  // Função para criar uma nova mesa
  const createTable = async () => {
    if (!(tableData.nome_mesa && tableData.mestre_email && tableData.id_mesa)) {
      console.log("Preencha todos os campos");
      return;
    }

    try {
      await axios.post('http://168.75.100.153:5000/cadastrar_mesa', tableData);
      console.log("Mesa cadastrada com sucesso");
      setShowInputs(false); // Oculta os campos de entrada após o cadastro
      setTableData({
        nome_mesa: "",
        mestre_email: "",
        id_mesa: "",
      }); // Limpa os dados após o cadastro
      fetchTables(); // Recarrega a lista de mesas
    } catch (error) {
      console.error("Erro ao cadastrar a mesa:", error);
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://168.75.100.153:5000/listar_mesas');
      setTables(response.data.mesas);
    } catch (error) {
      console.error("Erro ao listar mesas:", error);
    }
  };

  const deleteTable = async (id_mesa) => {
    try {
      await axios.delete(`http://168.75.100.153:5000/excluir_mesa/${id_mesa}`);
      console.log("Mesa deletada com sucesso");
      setTables(tables.filter(table => table.id_mesa !== id_mesa));
    } catch (error) {
      console.error("Erro ao deletar a mesa:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div>
      <h2 className="custom-title">Lista de Mesas</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {showInputs && (
                    <>
                      <input
                        className="custom-input"
                        placeholder="Nome da mesa"
                        value={tableData.nome_mesa}
                        onChange={(e) => setTableData({ ...tableData, nome_mesa: e.target.value })}
                      />
                      <input
                        className="custom-input"
                        placeholder="Mestre"
                        value={tableData.mestre}
                        onChange={(e) => setTableData({ ...tableData, mestre_email: e.target.value })}
                      />
                      <input
                        className="custom-input"
                        placeholder="ID da Mesa"
                        value={tableData.id_mesa}
                        onChange={(e) => setTableData({ ...tableData, id_mesa: e.target.value })}
                      />
                      <div>
                        <button className="custom-button" onClick={createTable} >Cadastrar Mesa</button>
                      </div>
                    </>
                  )}
                  <div>
                    <button className="custom-button" onClick={toggleInputs} >
                      {showInputs ? "Cancelar" : "Cadastrar Nova Mesa"}
                    </button>
                  </div>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Nome da Mesa</TableCell>
              <TableCell align="center">Mestre</TableCell>
              <TableCell align="center">ID da Mesa</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((table) => (
              <TableRow key={table.id_mesa}>
                <TableCell align="center">{table.nome_mesa}</TableCell>
                <TableCell align="center">{table.mestre_email}</TableCell>
                <TableCell align="center">{table.id_mesa}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => deleteTable(table.id_mesa)}><img src={IconDelete} alt="delete"></img></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CadastroMesa;
