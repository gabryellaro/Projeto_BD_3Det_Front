import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function CadastroItemGen() {
    const [formData, setFormData] = useState({
        id_ficha: null,
        nome_item: '',
        raridade: '',
        efeito: '',
        xp: 0,
        qualidades: [''],
        tipo: "Artefato"
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const [errorMessage, setErrorMessage] = useState('');

    const cadastrarItemGen = async () => {
        try {
            const formDataToSend = {
                id_ficha: parseInt(formData.id_ficha), // Garanta que o ID seja um número
                nome_item: formData.nome_item,
                raridade: formData.raridade,
                efeito: formData.efeito,
                xp: parseInt(formData.xp), // Garanta que a XP seja um número
                qualidades: formData.qualidades, // Deixe as qualidades como um array
            };
            console.log(formData)
            const response = await axios.post('http://168.75.100.153:5000/cadastrar_ficha/artefato', formDataToSend);
            console.log('Item cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar o Item:', error);
        }
    };

    return (
        <Box
            className="box-config"
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
                borderRadius: 4,
            }}
        >
            <h2>Preencha as informações do novo Item Comum</h2>
            <div className="inputs-config">
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
                    placeholder="Nome do Item Comum"
                    variant="filled"
                    value={formData.nome_item}
                    onChange={(e) => handleInputChange('nome_item', e.target.value)}
                />
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Raridade"
                    variant="filled"
                    value={formData.raridade}
                    onChange={(e) => handleInputChange('raridade', e.target.value)}
                />
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Efeito"
                    variant="filled"
                    value={formData.efeito}
                    onChange={(e) => handleInputChange('efeito', e.target.value)}
                />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <Stack className="button-config-space" spacing={5} direction="row">
                <button className="custom-button3" onClick={cadastrarItemGen}>
                    Cadastrar
                </button>
            </Stack>
        </Box>
    );
}

export default CadastroItemGen;
