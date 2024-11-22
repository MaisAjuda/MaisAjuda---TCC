import './ModalCliente.css'; // Adicione um arquivo CSS para estilizar o modal
import { FaTimes } from 'react-icons/fa';

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  cuidador: {
    nome: string;
    numero: string;
    descricao: string;
  };
  onContratar: (numero: string) => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, cuidador, onContratar }) => {
  if (!isOpen) return null; // Não renderiza o modal se não estiver aberto

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="modal-content">
          <h2>{cuidador.nome}</h2>
          <p><strong>Número:</strong> {cuidador.numero}</p>
          <p><strong>Descrição:</strong> {cuidador.descricao}</p>
          <button className="contratar-button" onClick={() => onContratar(cuidador.numero)}>
            Contratar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;