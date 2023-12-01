import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import './Config.css';

function Cadastro({ open, handleClose, updateTableData }) {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    nome: '',
    senha: ''
  });


  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');

  const createUser = async () => {
    if (!(userData.username && userData.email && userData.nome && userData.senha)) {
      setErrorMessage('Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post('http://168.75.100.153:5000/cadastrar_usuario', userData);
      console.log('Usuário cadastrado com sucesso');
      updateTableData();
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target === event.currentTarget) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open, handleClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="box-config"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '80%',
          height: '300px',
          borderRadius: 4
        }}
      >
        <h2>Preencha as informações do novo usuário</h2>
        <div className='inputs-config'>
        <input
          className="outlined-basic-cadas"
          type="text"
          size="small"
          placeholder="Username"
          variant="filled"
          value={userData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
        />
        <input
          className="outlined-basic-cadas"
          type="text"
          size="small"
          placeholder="Email"
          variant="filled"
          value={userData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <input
          className="outlined-basic-cadas"
          type="text"
          size="small"
          placeholder="Nome"
          variant="filled"
          value={userData.nome}
          onChange={(e) => handleInputChange('nome', e.target.value)}
        />
        <input
          className="outlined-basic-cadas"
          type="password"
          size="small"
          placeholder="Senha"
          variant="filled"
          value={userData.senha}
          onChange={(e) => handleInputChange('senha', e.target.value)}
        />
        </div>
         {errorMessage && <p>{errorMessage}</p>}
        <Stack className='button-config-space' spacing={5} direction="row">
          <button className="custom-button3" onClick={createUser}>
            Cadastrar
          </button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default Cadastro;
