import React, { useState, useEffect } from "react";
import axios from 'axios';

function CadastroMesa() {
    const [tables, setTables] = useState([]);
    const [tableData, setTableData] = useState({
        nome_mesa: "mesa legal",
        mestre: "kalil@henrique.com",
        id_mesa: "12345",
    });

    // Função para criar um novo usuário
    const createTable = async () => {
        // Verifica se algum campo está vazio
        if (!(tableData.nome_mesa && tableData.mestre && tableData.id_mesa)) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_mesa', tableData);
            console.log("Mesa cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a mesa:", error);
        }
    };

    const fetchTables = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/listar_mesas');
            setTables(response.data.mesas); // Ajuste aqui para acessar response.data.mesas
        } catch (error) {
            console.error("Erro ao listar mesas:", error);
        }
    };

    const deleteTable = async (id_mesa) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/excluir_mesa/${id_mesa}`);
            console.log("Mesa deletada com sucesso");
            setTables(tables.filter(table => table.id_mesa !== id_mesa)); // Remova a mesa da lista local
        } catch (error) {
            console.error("Erro ao deletar a mesa:", error);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return (
        <div>
            <button onClick={createTable}>mesa cadastra</button>
        </div>
    );

};

export default CadastroMesa
