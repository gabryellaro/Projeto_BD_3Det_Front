import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CadastroArtefato from './CadastrarArtefato';
import CadastroTecnica from './CadastrarTecnica';
import CadastroItemGen from './CadastroItemGen';

function CadastroItem() {

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
        showModal: showItemModal,
        handleOpenModal: handleOpenItemModal,
        handleCloseModal: handleCloseItemModal
    } = useModal();

    const {
        showModal: showArtefatoModal,
        handleOpenModal: handleOpenArtefatoModal,
        handleCloseModal: handleCloseArtefatoModal
    } = useModal();


    const {
        showModal: showTecnicaModal,
        handleOpenModal: handleOpenTecnicaModal,
        handleCloseModal: handleCloseTecnicaModal
    } = useModal();

    return (
        <Box
            className="box-config"
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
                borderRadius: 4,
            }}
        >
            <h2>Escolha que tipo de item quer cadastrar</h2>

            <button className="custom-button4" onClick={handleOpenItemModal}>Item Comum</button>
            <Modal open={showItemModal} onClose={handleCloseItemModal}>
                <CadastroItemGen onClose={handleCloseItemModal}/>
            </Modal>

            <button className="custom-button4" onClick={handleOpenArtefatoModal}>Artefato</button>
            <Modal open={showArtefatoModal} onClose={handleCloseArtefatoModal}>
                <CadastroArtefato onClose={handleCloseArtefatoModal}/>
            </Modal>

            <button className="custom-button4" onClick={handleOpenTecnicaModal}>Técnica</button>
            <Modal open={showTecnicaModal} onClose={handleCloseTecnicaModal}>
                <CadastroTecnica onClose={handleCloseTecnicaModal}/>
            </Modal>

            


        </Box>
    );
}

export default CadastroItem;
