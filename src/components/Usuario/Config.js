import React, { useState, useEffect } from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
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

  const searchUser = async () => {
    try {
      const response = await axios.get(`http://168.75.100.153:5000/pesquisar_usuario/${searchEmail}`);
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
      await axios.delete(`http://168.75.100.153:5000/excluir_usuario/${email}`);
      console.log("Usuário deletado com sucesso");
      setUsers(users.filter(user => user.email !== email)); // Remova o usuário da lista local
    } catch (error) {
      console.error("Erro ao deletar o usuário:", error);
    }
  }

  // Função para listar todos os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://168.75.100.153:5000/listar_usuarios');
      setUsers(response.data.usuarios); // Ajuste aqui para acessar response.data.usuarios
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  }

  const updateTableData = () => {
    fetchUsers();
  };

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
      const response = await axios.put(`http://168.75.100.153:5000/atualizar_usuario/${userEmailToUpdate}`, updatedFields);
      console.log(response.data.message);

      // Após a atualização bem-sucedida, busca novamente os dados do usuário e atualiza a tabela
      fetchUsers();
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

  const [showCadastro, setShowCadastro] = useState(false);

  const handleMostrarCadastro = () => {
    setShowCadastro(true);
  };

  const handleCancelarCadastro = () => {
    setShowCadastro(false);
  };

  return (
    <div className="user-config">
      <Link className="custom-link" to="/">Voltar</Link>
      <h2>Lista de Usuários</h2>
      <TableContainer component={Paper}>
        <Table className="table-config">
          <TableHead>
            <TableRow>
              <TableCell >
                <section className="config-space-general">
                  <div className="config-space-search">
                    <input
                      className="outlined-basic"
                      type="text"
                      placeholder="Pesquisar por Email"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button className="button-custom-search" onClick={searchUser}><img src={IconLupa}></img></button>
                  </div>
                  <div className="config-space-button">
                    {userFound && (
                      <button className="custom-button3" onClick={() => {
                        setSearchEmail("");  // Limpar o campo de pesquisa
                        setUserFound(false); // Voltar ao estado inicial
                        setSearchedUser(null);
                      }}>Limpar Pesquisa</button>
                    )}</div>
                </section>
              </TableCell>
              <TableCell>
                {selectedUser && ( // Se um usuário for selecionado, exiba o formulário de atualização
                  <div>
                    <select
                      className="custom-select"
                      value={campoToUpdate}
                      onChange={(e) => setCampoToUpdate(e.target.value)}>
                      <option value="email">Email</option>
                      <option value="username">Username</option>
                      <option value="nome">Nome</option>
                      <option value="senha">Senha</option>
                    </select>
                    <input
                      className="outlined-basic"
                      type="text"
                      placeholder={`Atualizar ${campoToUpdate}`}
                      value={userData[campoToUpdate]}
                      onChange={(e) => setUserData({ ...userData, [campoToUpdate]: e.target.value })}
                    />
                    <button className="custom-button3" onClick={updateUser}>Atualizar Usuário</button>
                  </div>
                )}
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                {!showCadastro ? (
                  <button className="custom-button3" onClick={handleMostrarCadastro}>Cadastrar Usuário</button>
                ) : (
                  <Cadastro open={showCadastro} handleClose={handleCancelarCadastro} updateTableData={updateTableData} />
                )}
              </TableCell>
            </TableRow>
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
    </div>
  );
}

export default Config;


