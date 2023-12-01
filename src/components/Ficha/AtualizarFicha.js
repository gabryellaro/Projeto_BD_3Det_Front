import React, { useState } from 'react';
import axios from 'axios';
import './Ficha.css';

const AtualizarFicha = () => {
    const [formData, setFormData] = useState({
        id_ficha: '',
        nome: '',
        arquetipo: '',
        poder: '',
        habilidade: '',
        resistencia: '',
        tipo_ficha: '',
        email_usuario: '',
        id_mesa: '',
        id_veiculo: '',
        xp: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const atualizarFicha = async () => {
        if (!formData.id_ficha) {
            setErrorMessage('Informe o ID da ficha a ser atualizada');
            return;
        }
        try {
            await axios.put(`http://168.75.100.153:5000/atualizar_ficha/${formData.id_ficha}`, formData);
            console.log(`Ficha com ID ${formData.id_ficha} atualizada com sucesso`);
            // Lógica para redirecionar ou exibir mensagem de sucesso
        } catch (error) {
            console.error('Erro ao atualizar a ficha:', error);
            // Lógica para exibir mensagem de erro
        }
    };

    return (
        <div className="body">
            <div className="container">
                <h1>ATUALIZAR FICHA</h1>
                <form>
                    <div className="input-row">
                        <label>
                            ID da Ficha:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="id_ficha"
                                onChange={(e) => handleInputChange('id_ficha', e.target.value)} />
                        </label>
                    </div>
                    {/* Adicione aqui os demais inputs correspondentes aos campos da ficha */}
                    {/* Exemplo: */}
                    <div className="input-row">
                        <label>
                            Nome:
                            <input
                                className="outlined-basic2"
                                type="text"
                                name="nome"
                                onChange={(e) => handleInputChange('nome', e.target.value)} />
                        </label>
                    </div>
                    {/* Repita para outros campos que deseja atualizar */}
                    {/* ... */}

                </form>
                <button className="button-custom-enviar" onClick={atualizarFicha}>Atualizar Ficha</button>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default AtualizarFicha;
