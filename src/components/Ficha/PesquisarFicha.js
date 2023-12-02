import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './Ficha.css'


const PesquisaFicha = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fichas, setFichas] = useState([]);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://168.75.100.153:5000/pesquisar_ficha/${searchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setFichas(data || []);
        setMessage('');
        setModalOpen(true);
      } else {
        setFichas([]);
        setMessage(data.message || 'Nenhuma ficha encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar ficha:', error);
      setFichas([]);
      setMessage('Ocorreu um erro ao buscar a ficha');
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setFichas([]);
    setMessage('');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <input className="outlined-basic-ficha"type="text" value={searchTerm} onChange={handleInputChange} />
      <button className="custom-button4" onClick={handleSearch}>Pesquisar</button>
      <button className="custom-button4"onClick={handleClear}>Limpar Pesquisa</button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box className="box-config"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 4,
                    maxWidth: 400,
                    width: '80%',
                    height: '300px',
                }}
            >
        <div>
          {fichas.length > 0 ? (
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo Ficha</TableCell>
                  <TableCell>XP</TableCell>
                  <TableCell>Poder</TableCell>
                  <TableCell>Habilidade</TableCell>
                  <TableCell>Resistencia</TableCell>
                </TableRow>
                </TableHead>
              <TableBody>
                {fichas.map((ficha) => (
                  <TableRow key={ficha.id_ficha}>
                    <TableCell>{ficha.id_ficha}</TableCell>
                    <TableCell>{ficha.nome}</TableCell>
                    <TableCell>{ficha.tipo_ficha}</TableCell>
                    <TableCell>{ficha.xp}</TableCell>
                    <TableCell>{ficha.poder}</TableCell>
                    <TableCell>{ficha.habilidade}</TableCell>
                    <TableCell>{ficha.resistencia}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>{message || 'Nenhum resultado encontrado'}</p>
          )}
        </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PesquisaFicha;
