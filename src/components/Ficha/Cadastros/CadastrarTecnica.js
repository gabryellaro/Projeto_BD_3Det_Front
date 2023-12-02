import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function CadastroTecnica() {
    const [formData, setFormData] = useState({
        id_ficha: null,
        nome_item: '',
        raridade: '',
        efeito: '',
        xp: null,
        custo: null,
        alcance: '',
        duracao: '',
        tipo: "tecnica",
        requisitos: []
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInputRequisito = (field, value) => {
        if (field === 'requisitos') {
            // Separa as requisitos por vírgula e cria um array
            const requisitosArray = value.split(',').map((requisit) => requisit.trim());
            setFormData({ ...formData, [field]: requisitosArray });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    const cadastrarTecnica = async () => {
        try {
          const formDataToSend = {
            id_ficha: parseInt(formData.id_ficha), // Garanta que o ID seja um número
            nome_item: formData.nome_item,
            raridade: formData.raridade,
            efeito: formData.efeito,
            xp: parseInt(formData.xp), // Garanta que a XP seja um número
            custo: parseInt(formData.custo), // Garanta que o Custo seja um número
            alcance: formData.alcance,
            duracao: formData.duracao,
            tipo: formData.tipo,
            requisitos: formData.requisitos, // Deixe os requisitos como um array
          };
      
          console.log(formData)
          const response = await axios.post('http://168.75.100.153:5000/cadastrar_ficha/tecnica', formDataToSend);
          console.log('Técnica cadastrada com sucesso');
        } catch (error) {
          console.error('Erro ao cadastrar a Técnica:', error);
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
            <h2>Preencha as informações da nova Técnica</h2>
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
                    placeholder="Nome da Tecnica"
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
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="XP"
                    variant="filled"
                    value={formData.xp}
                    onChange={(e) => handleInputChange('xp', e.target.value)}
                />
                 <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Custo em Magia"
                    variant="filled"
                    value={formData.custo}
                    onChange={(e) => handleInputChange('custo', e.target.value)}
                />
                 <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Alcance"
                    variant="filled"
                    value={formData.alcance}
                    onChange={(e) => handleInputChange('alcance', e.target.value)}
                />
                 <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Duração"
                    variant="filled"
                    value={formData.duracao}
                    onChange={(e) => handleInputChange('duracao', e.target.value)}
                />
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Requisitos (separadas por vírgula)"
                    variant="filled"
                    value={formData.requisitos.join(', ')} // Use .join para transformar o array em string
                    onChange={(e) => handleInputRequisito('requisitos', e.target.value)}
                />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <Stack className="button-config-space" spacing={5} direction="row">
                <button className="custom-button3" onClick={cadastrarTecnica}>
                    Cadastrar
                </button>
            </Stack>
        </Box>
    );
}

export default CadastroTecnica;
