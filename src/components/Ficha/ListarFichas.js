import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ficha.css'
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconDelete from '../../assets/lixo.svg'
import IconEdit from '../../assets/atualizar.svg'
import CadastroDesvantagem from './CadastroDesvantagem';
import CadastroVantagem from './CadastroVantagem';
import Modal from '@mui/material/Modal';
import AtualizarFicha from './AtualizarFicha';

const ListarFicha = () => {
  const [fichas, setFichas] = useState([]);
  const [erro, setErro] = useState(null);
  const [formData, setFormData] = useState({
    id_ficha: '',
    nome: '',
  });

  const useModal = (initialState = false) => {
    const [showModal, setShowModal] = useState(initialState);

    const handleOpenModal = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    return { showModal, handleOpenModal, handleCloseModal };
  };

  // Uso para o modal de adicionar vantagem
  const {
    showModal: showAdicionarVantagemModal,
    handleOpenModal: handleOpenAdicionarVantagemModal,
    handleCloseModal: handleCloseAdicionarVantagemModal
  } = useModal();

  // Uso para o modal de adicionar desvantagem
  const {
    showModal: showAdicionarDesvantagemModal,
    handleOpenModal: handleOpenAdicionarDesvantagemModal,
    handleCloseModal: handleCloseAdicionarDesvantagemModal
  } = useModal();

  // Uso para o modal de atualizar
  const {
    showModal: showAtualizarModal,
    handleOpenModal: handleOpenAtualizarModal,
    handleCloseModal: handleCloseAtualizarModal
  } = useModal();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const [errorMessage, setErrorMessage] = useState('');


  const deletarFicha = async (id_ficha) => {
    try {
      await axios.delete(`http://168.75.100.153:5000/excluir_ficha/${id_ficha}`);
      console.log("Ficha deletada com sucesso");
      setFichas(fichas.filter(ficha => ficha.id_ficha !== id_ficha)); // Remova a ficha da lista local
    } catch (error) {
      console.error("Erro ao deletar a ficha:", error);
    }
  };

  const [selectedFicha, setSelectedFicha] = useState(null);

  const updateTableData = () => {
    fetchData();
  };

  const [isEditing, setIsEditing] = useState(false);

  // Função para atualizar a ficha
  const atualizarFicha = async () => {
    if (!selectedFicha) return;

    try {
      await axios.put(`http://168.75.100.153:5000/atualizar_ficha/${selectedFicha.id_ficha}`, selectedFicha);
      console.log(`Ficha com ID ${selectedFicha.id_ficha} atualizada com sucesso`);
      setSelectedFicha(null);
      // Lógica para atualizar a lista de fichas após a edição
      // Recarregue a lista de fichas ou faça uma nova requisição para atualizar a lista
    } catch (error) {
      console.error('Erro ao atualizar a ficha:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://168.75.100.153:5000/listar_fichas');
      setFichas(response.data.fichas);
    } catch (error) {
      setErro('Erro ao carregar as fichas.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className='config-space-listar'>
      <h1>Listagem de Fichas</h1>
      {erro && <p>{erro}</p>}
      <TableContainer component={Paper}>
        <Table className="table-config-ficha">
          <TableHead>
            <TableRow>
              <TableCell>ID da Ficha</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo Ficha</TableCell>
              <TableCell> <Button onClick={handleOpenAdicionarVantagemModal}>Adicionar Vantagem</Button>
                <Modal open={showAdicionarVantagemModal} onClose={handleCloseAdicionarVantagemModal}>
                  <CadastroVantagem onClose={handleCloseAdicionarVantagemModal} updateTableData={updateTableData} />
                </Modal>
              </TableCell>
              <TableCell>
                <Button onClick={handleOpenAdicionarDesvantagemModal}>Adicionar Desvantagem</Button>
                <Modal open={showAdicionarDesvantagemModal} onClose={handleCloseAdicionarDesvantagemModal}>
                  <CadastroDesvantagem onClose={handleCloseAdicionarDesvantagemModal} updateTableData={updateTableData} />
                </Modal>
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {fichas.map((ficha) => (
              <TableRow key={ficha.id_ficha}>
                <TableCell>{ficha.id_ficha}</TableCell>
                <TableCell>{ficha.nome}</TableCell>
                <TableCell>{ficha.tipo_ficha}</TableCell>
                <TableCell>
                  <div style={{ maxHeight: '70px', overflowY: 'auto' }}>
                    <h4>Vantagens</h4>
                    <ul style={{ listStyle: 'none', padding: 0, overflowY: 'hidden'}}>
                      {ficha.vantagens.map((vantagem, index) => (
                        <li key={`vantagem_${ficha.id_ficha}_${index}`}>
                          {vantagem.nome_vant}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ maxHeight: '70px', overflowY: 'auto' }}>
                    <h4>Desvantagens</h4>
                    <ul style={{ listStyle: 'none', padding: 0, overflowY: 'hidden'}}>
                      {ficha.desvantagens.map((desvantagem, index) => (
                        <li key={`desvantagem_${ficha.id_ficha}_${index}`}>
                          {desvantagem.nome_desvant}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deletarFicha(ficha.id_ficha)}><img src={IconDelete} alt="Deletar"></img></Button>
                  <Button onClick={handleOpenAtualizarModal}><img src={IconEdit} alt="Atualizar"></img></Button>
                  <Modal open={showAtualizarModal} onClose={handleCloseAtualizarModal}>
                    <AtualizarFicha ficha={ficha} handleUpdate={fetchData} onClose={handleCloseAtualizarModal} />
                  </Modal>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      {isEditing && selectedFicha && (
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
      )}
    </div>
  );
};

export default ListarFicha;
