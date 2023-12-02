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
import CadastroFicha from './Cadastros/CadastroFicha';
import CadastroDesvantagem from './Cadastros/CadastroDesvantagem';
import CadastroVantagem from './Cadastros/CadastroVantagem';
import CadastroPericia from './Cadastros/CadastroPericia';
import Modal from '@mui/material/Modal';
import AtualizarFicha from './AtualizarFicha';
import CadastroItem from './Cadastros/Cadastrar itemMenu';

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

  const {
    showModal: showCadastrarModal,
    handleOpenModal: handleOpenCadastrarModal,
    handleCloseModal: handleCloseCadastrarModal
  } = useModal();

  const {
    showModal: showPericiaModal,
    handleOpenModal: handleOpenPericiaModal,
    handleCloseModal: handleClosePericiaModal
  } = useModal();

  const {
    showModal: showItemModal,
    handleOpenModal: handleOpenItemModal,
    handleCloseModal: handleCloseItemModal
  } = useModal();

  const deletarFicha = async (id_ficha) => {
    try {
      await axios.delete(`http://168.75.100.153:5000/excluir_ficha/${id_ficha}`);
      console.log("Ficha deletada com sucesso");
      setFichas(fichas.filter(ficha => ficha.id_ficha !== id_ficha)); // Remova a ficha da lista local
    } catch (error) {
      console.error("Erro ao deletar a ficha:", error);
    }
  };

  const updateTableData = () => {
    fetchData();
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
              <TableCell>
                <button className="custom-button4" onClick={handleOpenCadastrarModal}>Cadastrar</button>
                <Modal open={showCadastrarModal} onClose={handleCloseCadastrarModal}>
                  <CadastroFicha onClose={handleCloseCadastrarModal} updateTableData={updateTableData} />
                </Modal>
              </TableCell>
            <TableCell>
              <button className="custom-button4" onClick={handleOpenAdicionarVantagemModal}>Adicionar Vantagem</button>
              <Modal open={showAdicionarVantagemModal} onClose={handleCloseAdicionarVantagemModal}>
                <CadastroVantagem onClose={handleCloseAdicionarVantagemModal} updateTableData={updateTableData} />
              </Modal>
            </TableCell>
            <TableCell>
              <button className="custom-button4" onClick={handleOpenAdicionarDesvantagemModal}>Adicionar Desvantagem</button>
              <Modal open={showAdicionarDesvantagemModal} onClose={handleCloseAdicionarDesvantagemModal}>
                <CadastroDesvantagem onClose={handleCloseAdicionarDesvantagemModal} updateTableData={updateTableData} />
              </Modal>
            </TableCell>
            <TableCell>
              <button className="custom-button4" onClick={handleOpenPericiaModal}>Adicionar Pericia</button>
              <Modal open={showPericiaModal} onClose={handleClosePericiaModal}>
                <CadastroPericia onClose={handleClosePericiaModal} updateTableData={updateTableData} />
              </Modal>
            </TableCell>
            <TableCell>
              <button className="custom-button4" onClick={handleOpenItemModal}>Adicionar Item</button>
              <Modal open={showItemModal} onClose={handleCloseItemModal}>
                <CadastroItem onClose={handleCloseItemModal} updateTableData={updateTableData} />
              </Modal>
            </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>XP(qtd)</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo Ficha</TableCell>
              <TableCell>Vantagens</TableCell>
              <TableCell>Desvantagens</TableCell>
              <TableCell>Pericias</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fichas.map((ficha) => (
              <TableRow key={ficha.id_ficha}>
                <TableCell>{ficha.xp}</TableCell>
                <TableCell>{ficha.nome}</TableCell>
                <TableCell>{ficha.tipo_ficha}</TableCell>
                <TableCell>
                  <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none', padding: 0, overflowY: 'hidden' }}>
                      {ficha.vantagens.map((vantagem, index) => (
                        <li key={`vantagem_${ficha.id_ficha}_${index}`}>
                          {vantagem.nome_vant}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none', padding: 0, overflowY: 'hidden' }}>
                      {ficha.desvantagens.map((desvantagem, index) => (
                        <li key={`desvantagem_${ficha.id_ficha}_${index}`}>
                          {desvantagem.nome_desvant}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                    <ul style={{ listStyle: 'none', padding: 0, overflowY: 'hidden' }}>
                      {ficha.pericias.map((pericias, index) => (
                        <li key={`pericias_${ficha.id_ficha}_${index}`}>
                          {pericias.nome_pericia}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deletarFicha(ficha.id_ficha)}><img src={IconDelete} alt="Deletar"></img></Button>
                  <Button onClick={handleOpenAtualizarModal}><img src={IconEdit} alt="Atualizar"></img></Button>
                </TableCell>
                <Modal open={showAtualizarModal} onClose={handleCloseAtualizarModal}>
                    <AtualizarFicha ficha={ficha} handleUpdate={fetchData} onClose={handleCloseAtualizarModal} />
                  </Modal>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListarFicha;
