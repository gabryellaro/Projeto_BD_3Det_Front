import React, { useState, useEffect } from "react";
import axios from 'axios';

function CadastroFicha() {
    const [sheets, setSheets] = useState([]);
    const [SheetData, setSheetData] = useState({
        id_ficha: "",
        nome: "",
        tipo_ficha: "",
        id_mesa: "",
        arquetipo: "",
        poder: "",
        habilidade: "",
        resistencia: "",
        email_usuario: "",
        id_veiculo: "",
    });

    const [Advantages, setAdvantage] = useState([]);
    const [AdvantageData, setAdvantageData] = useState({
        id_ficha: "",
        nome: "",
    });

    const [Disadvantages, setDisadvantage] = useState([]);
    const [DisadvantageData, setDisadvantageData] = useState({
        id_ficha: "",
        nome: "",
    });

    const [Expertises, setExpertise] = useState([]);
    const [ExpertiseData, setExpertiseData] = useState({
        id_ficha: "",
        nome: "",
    });

    const [Artifacts, setArtifact] = useState([]);
    const [ArtifactData, setArtifactData] = useState({
        id_item: "",
        nome: "",
        raridade: "",
        efeito: "",
        id_ficha: "",
        xp_custo: "",
        qualidades: [],
    });

    const [Techniques, setTechnique] = useState([]);
    const [TechniqueData, setTechniqueData] = useState({ 
        id_item: "",
        nome: "",
        raridade: "",
        efeito: "",
        id_ficha: "",
        xp_custo: "",
        custo_PM: "",
        alcance: "",
        duracao: "",
        requisitos: [],
    });
    

    const createSheet = async () => {
        // Verifica se algum campo está vazio
        if (!(SheetData.id_ficha && SheetData.nome && SheetData.tipo_ficha && SheetData.id_mesa && SheetData.arquetipo && SheetData.poder && SheetData.habilidade && SheetData.resistencia && SheetData.email_usuario && SheetData.id_veiculo)) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha', SheetData);
            console.log("Ficha cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a ficha:", error);
        }
    };
    
    const registerAdvantage = async () => {
        if (!(AdvantageData.id_ficha && AdvantageData.nome )) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha/vantagem', AdvantageData);
            console.log("Vantagem cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a vantagem:", error);
        }
    };

    const registerDisadvantage = async () => {
        if (!(DisadvantageData.id_ficha && DisadvantageData.nome )) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha/desvantagem', DisadvantageData);
            console.log("Desvantagem cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a desvantagem:", error);
        }
    };

    const registerExpertise = async () => {
        if (!(ExpertiseData.id_ficha && ExpertiseData.nome )) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha/pericia', ExpertiseData);
            console.log("Perícia cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a perícia:", error);
        }
    };

    const registerArtifact = async () => {
        if (!(ArtifactData.id_item && ArtifactData.nome && ArtifactData.raridade && ArtifactData.efeito && ArtifactData.id_ficha && ArtifactData.xp_custo && ArtifactData.qualidades)) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha/artefato', ArtifactData);
            console.log("Artefato cadastrado com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar o artefato:", error);
        }
    };

    const registeTechnique = async () => {
        if (!(TechniqueData.id_item && TechniqueData.nome && TechniqueData.raridade && TechniqueData.efeito && ArtifactData.id_ficha && ArtifactData.xp_custo && TechniqueData.custo_PM && TechniqueData.alcance && TechniqueData.duracao && TechniqueData.requisitos)) {
            console.log("Preencha todos os campos");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/cadastrar_ficha/tecnica', TechniqueData);
            console.log("Técnica cadastrada com sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar a técnica:", error);
        }
    };

    const fetchSheet = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/listar_fichas');
            setTables(response.data.fichas); // Ajuste aqui para acessar response.data.fichas
        } catch (error) {
            console.error("Erro ao listar mesas:", error);
        }
    };

    const searchSheet = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/pesquisar_ficha/${nome}`);
          setSearchedSheet(response.data);
          setSheetFound(true); // Define SheetFound como true se a ficha for encontrada
        } catch (error) {
          console.error("Erro ao pesquisar ficha:", error);
          setSearchedSheet(null);
          setSheetFound(false); // Define SheetFound como false em caso de erro
        }
    };

    const deleteSheet = async (id_ficha) => {
        try {
          await axios.delete(`http://127.0.0.1:5000/excluir_ficha/${id_ficha}`);
          console.log("Ficha deletada com sucesso");
          setSheet(sheets.filter(sheet => sheet.id_ficha !== id_ficha)); // Remova a ficha da lista local
        } catch (error) {
          console.error("Erro ao deletar a ficha:", error);
        }
    };

    const deleteAdvantage = async () => {
        try {
          await axios.delete(`http://127.0.0.1:5000/excluir_vantagem/${id_ficha}/${nome}`);
          console.log("Vantagem deletada com sucesso");
          setAdvantage(advantage.filter(advantage => advantage.nome !== nome)); // Remova a vantagem da lista local
        } catch (error) {
          console.error("Erro ao deletar a vantagem:", error);
        }
    };

    const deleteDisadvantage = async () => {
        try {
          await axios.delete(`http://127.0.0.1:5000/excluir_desvantagem/${id_ficha}/${nome}`);
          console.log("Desvantagem deletada com sucesso");
          setDisadvantage(disadvantage.filter(disadvantage => disadvantage.nome !== nome)); // Remova a desvantagem da lista local
        } catch (error) {
          console.error("Erro ao deletar a desvantagem:", error);
        }
    };

    const deleteExpertise = async () => {
        try {
          await axios.delete(`http://127.0.0.1:5000/excluir_pericia/${id_ficha}/${nome}`);
          console.log("Perícia deletada com sucesso");
          setExpertise(expertise.filter(expertise => expertise.nome !== nome)); // Remova a perícia da lista local
        } catch (error) {
          console.error("Erro ao deletar a perícia:", error);
        }
    };

    const deleteItem = async () => {
        try {
          await axios.delete(`http://127.0.0.1:5000/excluir_item/${id_item}`);
          console.log("Item deletada com sucesso");
          setItem(item.filter(item => item.id_item !== id_item)); // Remova o item da lista local
        } catch (error) {
          console.error("Erro ao deletar a item:", error);
        }
    };
};