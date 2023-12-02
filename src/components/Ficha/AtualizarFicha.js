import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const AtualizarFicha = ({ ficha, handleUpdate }) => {
    const [selectedFicha, setSelectedFicha] = useState(ficha); // Inicializa com a ficha passada por propriedade
    const [isEditing, setIsEditing] = useState(false); // Inicializa como falso, se necessário

    const atualizarFicha = async () => {
        if (!selectedFicha) return;

        try {
            await axios.put(`http://168.75.100.153:5000/atualizar_ficha/${selectedFicha.id_ficha}`, selectedFicha);
            console.log(`Ficha com ID ${selectedFicha.id_ficha} atualizada com sucesso`);
            handleUpdate(); // Chama a função de atualização fornecida pelo componente pai
            setSelectedFicha(null);
        } catch (error) {
            console.error('Erro ao atualizar a ficha:', error);
        }
    };

    useEffect(() => {
        setSelectedFicha(ficha);
        setIsEditing(true);
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
                    maxWidth: 400,
                    width: '80%',
                    height: '300px',
                    borderRadius: 4
                }}
            >
            <div className="form-edit">
                <h2>Editar Ficha</h2>
                <label>ID da Ficha:</label>
                <input
                    type="text"
                    value={selectedFicha.id_ficha}
                    disabled
                />
                <label>Nome:</label>
                <input
                    type="text"
                    value={selectedFicha.nome}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, nome: e.target.value })}
                />
                <label>Tipo_Ficha:</label>
                <input
                    type="text"
                    value={selectedFicha.tipo_ficha}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, tipo_ficha: e.target.value })}
                />
                <label>Poder:</label>
                <input
                    type="text"
                    value={selectedFicha.poder}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, poder: e.target.value })}
                />
                <label>Habilidade:</label>
                <input
                    type="text"
                    value={selectedFicha.habilidade}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, habilidade: e.target.value })}
                />
                <label>Arquétipo:</label>
                <input
                    type="text"
                    value={selectedFicha.arquetipo}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, arquetipo: e.target.value })}
                />
                <label>Resistência:</label>
                <input
                    type="text"
                    value={selectedFicha.resistencia}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, resistencia: e.target.value })}
                />
                <label>XP:</label>
                <input
                    type="text"
                    value={selectedFicha.xp}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, xp: e.target.value })}
                />
                <label>Email:</label>
                <input
                    type="text"
                    value={selectedFicha.email_usuario}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, email_usuario: e.target.value })}
                />
                <label>Id_Mesa:</label>
                <input
                    type="text"
                    value={selectedFicha.id_mesa}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, id_mesa: e.target.value })}
                />
                <label>Id_Veiculo:</label>
                <input
                    type="text"
                    value={selectedFicha.id_veiculo}
                    onChange={(e) => setSelectedFicha({ ...selectedFicha, id_veiculo: e.target.value })}
                />
                <Button onClick={atualizarFicha}>Salvar</Button>
                <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
            </div>
            </Box>
        </div>
    );
};

export default AtualizarFicha;