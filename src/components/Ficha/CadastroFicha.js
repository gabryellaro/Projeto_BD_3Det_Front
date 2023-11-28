import React, { useState } from 'react';
import axios from 'axios'; // Certifique-se de ter axios instalado no projeto
import './Ficha.css';

const CadastroFicha = () => {
    const [formData, setFormData] = useState({
        id_ficha: '',
        nome: '',
        arquetipo: '',
        xp: '',
        poder: '',
        habilidade: '',
        resistencia: '',
        tipo_ficha: '',
        email_usuario: '',
        id_mesa: '',
        id_veiculo: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const cadastrarFicha = async () => {
        if (!(formData.id_ficha && formData.nome && formData.id_mesa && formData.email_usuario)) {
            setErrorMessage('Preencha todos os campos obrigatórios');
            return;
        }
        try {
            await axios.post('http://168.75.100.153:5000/cadastrar_ficha', formData);
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
                            ID da Ficha:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="id_ficha"
                                onChange={(e) => handleInputChange('id_ficha', e.target.value)} />
                        </label>
                        <label>
                            ID da Mesa:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="id_mesa"
                                onChange={(e) => handleInputChange('id_mesa', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Email:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="email_usuario"
                                onChange={(e) => handleInputChange('email_usuario', e.target.value)} />
                        </label>
                        <label>
                            ID do Veículo:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="id_veiculo"
                                onChange={(e) => handleInputChange('id_veiculo', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Nome:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="nome"
                                onChange={(e) => handleInputChange('nome', e.target.value)} />
                        </label>
                        <label>
                            Tipo de Ficha:{" "}
                            <select
                                className="outlined-basic2"
                                name="tipo_ficha"
                                onChange={(e) => handleInputChange('tipo_ficha', e.target.value)}
                            >
                                <option value="Player">Player</option>
                                <option value="Veiculo">Veículo</option>
                            </select>
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Arquétipo:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="arquetipo"
                                onChange={(e) => handleInputChange('arquetipo', e.target.value)} />
                        </label>
                        <label>
                            Poder:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="poder"
                                onChange={(e) => handleInputChange('poder', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Habilidade:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="habilidade"
                                onChange={(e) => handleInputChange('habilidade', e.target.value)} />
                        </label>
                        <label>
                            Resistência:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="resistencia"
                                onChange={(e) => handleInputChange('resistencia', e.target.value)} />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            XP:{" "}
                            <input
                                className="outlined-basic2"
                                type="text"
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
