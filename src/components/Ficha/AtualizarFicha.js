import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import './Ficha.css'

const AtualizarFicha = ({ ficha, handleUpdate }) => {
    const [selectedFicha, setSelectedFicha] = useState({ ficha });  // Inicializa com a ficha passada por propriedade

    const atualizarFicha = async () => {
        if (!selectedFicha) {
            console.error('Ficha não está definida');
            return;
        }

        try {
            await axios.put(`http://168.75.100.153:5000/atualizar_ficha/${selectedFicha.id_ficha}`, selectedFicha);
            console.log(`Ficha com ID ${selectedFicha.id_ficha} atualizada com sucesso`);
            handleUpdate(); // Chama a função de atualização fornecida pelo componente pai
        } catch (error) {
            console.error('Erro ao atualizar a ficha:', error);
        }
    };

    useEffect(() => {
        setSelectedFicha(ficha);
    }, [ficha]);

    return (
        <div className="form-edit">
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
                <h2>Editar Ficha</h2>
                <div className='inputs-config'>
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Id da ficha'
                        value={selectedFicha.id_ficha}
                        disabled
                    />

                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Nome'
                        value={selectedFicha.nome}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, nome: e.target.value })}
                    />

                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Tipo Ficha'
                        value={selectedFicha.tipo_ficha}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, tipo_ficha: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Poder'
                        value={selectedFicha.poder}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, poder: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Habilidade'
                        value={selectedFicha.habilidade}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, habilidade: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Arquétipo'
                        value={selectedFicha.arquetipo}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, arquetipo: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Resistência'
                        value={selectedFicha.resistencia}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, resistencia: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='XP'
                        value={selectedFicha.xp}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, xp: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Email'
                        value={selectedFicha.email_usuario}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, email_usuario: e.target.value })}
                    />
                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Id Mesa'
                        value={selectedFicha.id_mesa}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, id_mesa: e.target.value })}
                    />

                    <input
                        className="outlined-basic-cadas"
                        type="text"
                        placeholder='Id Veículo'
                        value={selectedFicha.id_veiculo}
                        onChange={(e) => setSelectedFicha({ ...selectedFicha, id_veiculo: e.target.value })}
                    />
                </div>
                <button className="button-custom-enviar"onClick={atualizarFicha}>Salvar</button>
            </Box>
        </div>
    );
};

export default AtualizarFicha;