import React, { useState } from 'react';
import axios from 'axios';
import './Ficha.css';

const CadastroFicha = () => {
    const [formData, setFormData] = useState({
        id_ficha:"",
        id_veiculo:"",
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

    const atualizarFicha = async (id_ficha, dataToUpdate) => {
        try {
            const response = await axios.put(`http://168.75.100.153:5000/atualizar_ficha/${id_ficha}`, dataToUpdate);
            console.log(`Ficha com ID ${id_ficha} atualizada com sucesso:`, response.data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar a ficha com ID ${id_ficha}:`, error);
            throw error;
        }
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
            // Lógica para redirecionar ou exibir mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar a ficha:', error);
            // Lógica para exibir mensagem de erro
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h1>CADASTRAR FICHA</h1>
                <form>
                    <div className="input-row">
                        <label>
                            ID da Mesa:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="id_mesa"
                                onChange={(e) => handleInputChange('id_mesa', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Email:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="email_usuario"
                                onChange={(e) => handleInputChange('email_usuario', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Nome:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="nome"
                                onChange={(e) => handleInputChange('nome', e.target.value)} />
                        </label>
                        <label>
                            Tipo de Ficha:
                            <select
                                className="outlined-basic2"
                                name="tipo_ficha"
                                type="text"
                                onChange={(e) => handleInputChange('tipo_ficha', e.target.value)}
                            >
                                <option type="text" value="Player">Player</option>
                                <option type="text" value="Veiculo">Veículo</option>
                            </select>
                            {/* Tipo Ficha:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="tipo_ficha"
                                onChange={(e) => handleInputChange('tipo_ficha', e.target.value)} /> */}
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Arquétipo:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="arquetipo"
                                onChange={(e) => handleInputChange('arquetipo', e.target.value)} />
                        </label>
                        <label>
                            Poder:
                            <input
                                className="outlined-basic2"
                                type="number"
                                name="poder"
                                onChange={(e) => handleInputChange('poder', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Habilidade:
                            <input
                                className="outlined-basic2"
                                type="number"
                                name="habilidade"
                                onChange={(e) => handleInputChange('habilidade', e.target.value)} />
                        </label>
                        <label>
                            Resistência:
                            <input
                                className="outlined-basic2"
                                type="number"
                                name="resistencia"
                                onChange={(e) => handleInputChange('resistencia', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            XP:
                            <input
                                className="outlined-basic2"
                                type="number"
                                name="xp"
                                onChange={(e) => handleInputChange('xp', e.target.value)} />
                        </label>
                    </div>
                </form>
                <button className="button-custom-enviar" onClick={cadastrarFicha}>Cadastrar Ficha</button>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};


export default CadastroFicha;