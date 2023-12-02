import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function AtualizarItem() {
    const [formData, setFormData] = useState({
        id_ficha: null,
        id_item: null,
        nome_item: '',
        raridade: '',
        efeito: '',
        tipo: '',
        xp: null,
        custo: null,
        alcance: '',
        duracao: '',
        qualidades: [],
        requisitos: [],
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInputQualidade = (field, value) => {
        if (field === 'qualidades' || field === 'requisitos') {
            // Separa por vírgula e cria um array
            const arrayValues = value.split(',').map((item) => item.trim());
            setFormData({ ...formData, [field]: arrayValues });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const [errorMessage, setErrorMessage] = useState('');

    const atualizarItem = async () => {
        try {
          const formDataToSend = {
            id_ficha: parseInt(formData.id_ficha),
            id_item: parseInt(formData.id_item),
            nome_item: formData.nome_item,
            raridade: formData.raridade,
            efeito: formData.efeito,
            tipo: formData.tipo,
            xp: formData.xp !== '' ? parseInt(formData.xp) : null,
            custo: formData.custo !== '' ? parseInt(formData.custo) : null,
            alcance: formData.alcance,
            duracao: formData.duracao,
            qualidades: formData.qualidades.filter(Boolean), // Remove valores vazios do array
            requisitos: formData.requisitos.filter(Boolean), // Remove valores vazios do array
          };
          // Enviar para a API somente os campos preenchidos
          const response = await axios.put(`http://168.75.100.153:5000/atualizar_ficha/item/${formData.id_ficha}/${formData.id_item}`, formDataToSend);
          console.log('Item atualizado com sucesso:', response.data);
        } catch (error) {
          console.error('Erro ao atualizar o Item:', error);
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
                height: '600px',
                borderRadius: 4,
            }}
        >
            <h2>Atualizar informações do Item</h2>
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
                    placeholder="ID do Item"
                    variant="filled"
                    value={formData.id_item}
                    onChange={(e) => handleInputChange('id_item', e.target.value)}
                />
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Nome do Item"
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
                    placeholder="Tipo"
                    variant="filled"
                    value={formData.tipo}
                    onChange={(e) => handleInputChange('tipo', e.target.value)}
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
                    placeholder="Custo"
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
                    placeholder="Qualidades (separadas por vírgula)"
                    variant="filled"
                    value={formData.qualidades.join(', ')}
                    onChange={(e) => handleInputQualidade('qualidades', e.target.value)}
                />
                <input
                    className="outlined-basic-cadas"
                    type="text"
                    size="small"
                    placeholder="Requisitos (separados por vírgula)"
                    variant="filled"
                    value={formData.requisitos.join(', ')}
                    onChange={(e) => handleInputQualidade('requisitos', e.target.value)}
                />
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            <Stack className="button-config-space" spacing={5} direction="row">
                <button className="custom-button3" onClick={atualizarItem}>
                    Atualizar Item
                </button>
            </Stack>
        </Box>
    );
}

export default AtualizarItem;
