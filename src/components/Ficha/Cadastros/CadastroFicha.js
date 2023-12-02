import React, { useState } from 'react';
import axios from 'axios';
import '../Ficha.css';
import Box from '@mui/material/Box';


const CadastroFicha = ({ updateTableData }) => {
    const [formData, setFormData] = useState({
        nome: "",
        tipo_ficha: "",
        id_mesa: "",
        arquetipo: "",
        poder: "",
        habilidade: "",
        resistencia: "",
        email_usuario: "",
        xp: ""
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const cadastrarFicha = async () => {
        if (!(formData.nome && formData.id_mesa && formData.email_usuario)) {
            setErrorMessage('Preencha todos os campos obrigatórios');
            return;
        }
        try {
            const response = await axios.post('http://168.75.100.153:5000/cadastrar_ficha', formData);
            console.log('Resposta da API:', response.data);
            console.log('Ficha cadastrada com sucesso');
            updateTableData();
            // Lógica para redirecionar ou exibir mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar a ficha:', error);
            // Lógica para exibir mensagem de erro
        }
    };

    return (
        <div className="body">
            <Box className="box-config"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    maxWidth: 500,
                    width: '80%',
                    height: '400px',
                    borderRadius: 4
                }}
            >
                
                <h1>Cadastrar Ficha</h1>
                <div className='config-space-ficha'>
                <div className='input-row'>
                <input
                    className="outlined-basic2"
                    type="text"
                    name="id_mesa"
                    placeholder='ID da Mesa'
                    onChange={(e) => handleInputChange('id_mesa', e.target.value)} />
                <input
                    className="outlined-basic2"
                    type="text"
                    name="email_usuario"
                    placeholder='Email:'
                    onChange={(e) => handleInputChange('email_usuario', e.target.value)} />
                <input
                    className="outlined-basic2"
                    type="text"
                    name="nome"
                    placeholder='Nome:'
                    onChange={(e) => handleInputChange('nome', e.target.value)} />

                <select
                    className="outlined-basic2"
                    name="tipo_ficha"
                    type="text"
                    onChange={(e) => handleInputChange('tipo_ficha', e.target.value)}
                    defaultValue="Player"
                >
                    <option value="" >
                        Tipo Ficha
                    </option>
                    <option value="Player">Player</option>
                    <option value="Veiculo">Veículo</option>
                </select>
                </div>
                <div  className='input-row'>
                <input
                    className="outlined-basic2"
                    type="text"
                    name="arquetipo"
                    placeholder='Arquétipo:'
                    onChange={(e) => handleInputChange('arquetipo', e.target.value)} />
                <input
                    className="outlined-basic2"
                    type="number"
                    name="poder"
                    placeholder='Poder:'
                    onChange={(e) => handleInputChange('poder', e.target.value)} />
                <input
                    className="outlined-basic2"
                    type="number"
                    name="habilidade"
                    placeholder='Habilidade:'
                    onChange={(e) => handleInputChange('habilidade', e.target.value)} />

                <input
                    className="outlined-basic2"
                    type="number"
                    name="resistencia"
                    placeholder='Resistência:'
                    onChange={(e) => handleInputChange('resistencia', e.target.value)} />
                <input
                    className="outlined-basic2"
                    type="number"
                    name="xp"
                    placeholder='XP:'
                    onChange={(e) => handleInputChange('xp', e.target.value)} />
                    </div>
                    </div>
                <button className="button-custom-enviar" onClick={cadastrarFicha}>Cadastrar Ficha</button>
                {errorMessage && <p>{errorMessage}</p>}
            </Box>
        </div>
    );
};


export default CadastroFicha;