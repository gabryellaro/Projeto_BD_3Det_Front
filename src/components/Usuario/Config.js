import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Config.css'
import IconDelete from "../../assets/lixo.svg"
import IconEdit from "../../assets/atualizar.svg"
import IconLupa from "../../assets/lupa.svg"
import Cadastro from "./Cadastro";
import { Link } from "react-router-dom";


function Config() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    nome: "",
    senha: ""
  });

  const [userEmailToUpdate, setUserEmailToUpdate] = useState("");
  const [campoToUpdate, setCampoToUpdate] = useState("email"); // Defina um valor padrão
  const [searchEmail, setSearchEmail] = useState("");
  const [searchedUser, setSearchedUser] = useState(""); // Adicione searchedUser ao estado
  const [userFound, setUserFound] = useState(false); // Adicione userFound ao estado
  const [selectedUser, setSelectedUser] = useState(null); // Estado para rastrear o usuário selecionado
  // const [selectCadastro, setSelectCadastro] = useEffect("");

  const searchUser = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/pesquisar_usuario/${searchEmail}`);
      setSearchedUser(response.data);
      setUserFound(true); // Define userFound como true se o usuário for encontrado
    } catch (error) {
      console.error("Erro ao pesquisar usuário:", error);
      setSearchedUser(null);
      setUserFound(false); // Define userFound como false em caso de erro
    }
  }

  // Função para deletar um usuário
  const deleteUser = async (email) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/excluir_usuario/${email}`);
      console.log("Usuário deletado com sucesso");
      setUsers(users.filter(user => user.email !== email)); // Remova o usuário da lista local
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  }

  // Função para listar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/listar_usuarios');
      setUsers(response.data.usuarios); // Ajuste aqui para acessar response.data.usuarios
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  }

  // Função para atualizar informações do usuário
  const updateUser = async () => {
    const updatedFields = {};

    if (userData.email) {
      updatedFields.email = userData.email;
    }
    if (userData.username) {
      updatedFields.username = userData.username;
    }
    if (userData.nome) {
      updatedFields.nome = userData.nome;
    }
    if (userData.senha) {
      updatedFields.senha = userData.senha;
    }

    try {
      const response = await axios.put(`http://127.0.0.1:5000/atualizar_usuario/${userEmailToUpdate}/${campoToUpdate}`, updatedFields);
      console.log(response.data.message);
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateClick = (user) => {
    setSelectedUser(user); // Define o usuário selecionado
    setUserEmailToUpdate(user.email); // Define o email do usuário selecionado
  }


  return (
    <div className="user-config">
      {/* <Cadastro/>  */}
      <Link to="/">Home</Link>
      <h2>Lista de Usuários</h2>
      <TableContainer component={Paper}>
        <Table className="table-config">
          <TableHead>
            <TableRow>
              <TableCell >
                <div className="config-space-search">
                  <input
                    id="outlined-basic"
                    type="text"
                    size="small"
                    placeholder="Pesquisar por Email"
                    variant="outlined"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                  />
                  <button className="button-custom-search" onClick={searchUser}><img src={IconLupa}></img></button>
                </div>

              </TableCell>
              <TableCell>
                {userFound && (
                  <Button onClick={() => {
                    setSearchEmail("");  // Limpar o campo de pesquisa
                    setUserFound(false); // Voltar ao estado inicial
                    setSearchedUser(null);
                  }}>Limpar Pesquisa</Button>
                )}</TableCell></TableRow>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Senha</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userFound && searchedUser ? (
              <TableRow key={searchedUser.email}>
                <TableCell>{searchedUser.username}</TableCell>
                <TableCell>{searchedUser.email}</TableCell>
                <TableCell>{searchedUser.nome}</TableCell>
                <TableCell>{searchedUser.senha}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteUser(searchedUser.email)}><img src={IconDelete}></img></Button>
                  <Button onClick={() => handleUpdateClick(searchedUser)}><img src={IconEdit}></img></Button>
                </TableCell>
              </TableRow>
            ) : (
              // Renderiza todos os usuários se nenhum usuário específico foi pesquisado
              users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.senha}</TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUser(user.email)}><img src={IconDelete}></img></Button>
                    <Button onClick={() => handleUpdateClick(user)}><img src={IconEdit}></img></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && ( // Se um usuário for selecionado, exiba o formulário de atualização
        <div>
          <h2>Atualizar Usuário</h2>
          <select
            value={campoToUpdate}
            onChange={(e) => setCampoToUpdate(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="username">Username</option>
            <option value="nome">Nome</option>
            <option value="senha">Senha</option>
          </select>
          <input
            type="text"
            placeholder={`Novo ${campoToUpdate}`}
            value={userData[campoToUpdate]}
            onChange={(e) => setUserData({ ...userData, [campoToUpdate]: e.target.value })}
          />
          <button onClick={updateUser}>Atualizar Usuário</button>
        </div>
      )}
    </div>
  );
}

export default Config;
