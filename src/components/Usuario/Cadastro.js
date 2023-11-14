import React, { useState, useEffect } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './Config.css'


function Cadastro() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    nome: "",
    senha: ""
  });

  // Função para criar um novo usuário
  const createUser = async () => {
    // Verifica se algum campo está vazio
    if (!(userData.username && userData.email && userData.nome && userData.senha)) {
      console.log("Preencha todos os campos");
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/cadastrar_usuario', userData);
      console.log("Usuário cadastrado com sucesso");
    } catch (error) {
      console.error("Erro ao cadastrar o usuário:", error);
    }
  };


  return (
    <div className="user-config">
      
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 0.5, width: '20ch', display: 'flex', flexDirection: 'column', fontFamily: 'Red Rose'},
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Cadastrar Usuário</h2>
        <TextField
          InputLabelProps={{
            style: { fontSize: 13 }, // Ajuste o tamanho da fonte conforme necessário
          }}
          id="outlined-basic"
          type="text"
          size="small"
          label="Username"
          variant="filled" value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
        <TextField
          InputLabelProps={{
            style: { fontSize: 13 }, // Ajuste o tamanho da fonte conforme necessário
          }}
          id="outlined-basic"
          type="text"
          size="small"
          label="Email"
          variant="filled" value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <TextField
          InputLabelProps={{
            style: { fontSize: 13 }, // Ajuste o tamanho da fonte conforme necessário
          }}
          id="outlined-basic"
          type="text"
          size="small"
          label="Nome"
          variant="filled" value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })} />
        <TextField
          InputLabelProps={{
            style: { fontSize: 13 }, // Ajuste o tamanho da fonte conforme necessário
          }}
          id="outlined-basic"
          type="password"
          size="small"
          label="Senha"
          variant="filled" value={userData.senha}
          onChange={(e) => setUserData({ ...userData, senha: e.target.value })} />
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={createUser}>Cadastrar</Button>
        </Stack>
      </Box>

    </div>
  );
}

export default Cadastro;
