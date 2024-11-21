import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import logo from '../../assets/AJUDA.png';
import './ModalCliente.css'
import { useState } from 'react';
export function ModalCliente(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div>
            <Button id='contratar' variant="primary" onClick={handleShow}>
                Contratar
            </Button>

            <Modal
            id='conteiner-modal'
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton id='modal-header'>
            <Modal.Title id="contained-modal-title-vcenter">
                <img id='img' src={logo} alt="" />
                <Button id='btn-fechar' variant="secondary" onClick={handleClose}>
                X
                </Button>
            </Modal.Title>
            </Modal.Header>
        
        </Modal>
        </div>
    )
}