import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import '../Ficha.css';

function CadastroVantagem({updateTableData}) {
    const [formData, setFormData] = useState({
        id_ficha: '',
        nome: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const cadastrarVantagem = async () => {
        if (!(formData.id_ficha && formData.nome)) {
            setErrorMessage('Preencha todos os campos');
            return;
        }

        try {
            const response = await axios.post('http://168.75.100.153:5000/cadastrar_ficha/vantagem', formData);
            console.log('Vantagem cadastrada com sucesso');
            updateTableData();
        } catch (error) {
            console.error('Erro ao cadastrar a vantagem:', error);
        }
    };

    return (
        <div>
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
                <h2>Preencha as informações da nova vantagem</h2>
                <div className='inputs-config'>
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        size="small"
                        placeholder="ID da Ficha"
                        variant="filled"
                        value={formData.id_ficha}
                        onChange={(e) => handleInputChange('id_ficha', e.target.value)}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        size="small"
                        placeholder="Nome da Vantagem"
                        variant="filled"
                        value={formData.nome}
                        onChange={(e) => handleInputChange('nome', e.target.value)}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <Stack className='button-config-space' spacing={5} direction="row">
                    <button className="custom-button3" onClick={cadastrarVantagem}>
                        Cadastrar
                    </button>
                </Stack>
            </Box>
        </div>
    );
}

export default CadastroVantagem;
