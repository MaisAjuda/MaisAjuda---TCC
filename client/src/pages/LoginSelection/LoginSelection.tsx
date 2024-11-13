import { useNavigate } from 'react-router-dom';
import icon_cuidador from '../../assets/icon-cuidador.png'
import icon_cliente from '../../assets/icon-cuidador.png'
import './LoginSelection.css'; 

const LoginSelection = () => {

  const nav = useNavigate()

  function redirecionarCliente(){
    nav('/login-cliente')
  }
  function redirecionarCuidador(){
    nav('/login-cuidador')
  }

  return (
    <div className="login-selection">
      <div className="login-option" onClick={redirecionarCuidador} >
        <img src={icon_cuidador} alt="Ícone Cuidador" />
        <h2>Cuidador</h2>
        <p>Entre como cuidador para oferecer seus serviços</p>
      </div>
      
      <div className="login-option" onClick={redirecionarCliente} >
        <img src={icon_cliente} alt="Ícone Cliente" />
        <h2>Cliente</h2>
        <p>Entre como cliente para encontrar cuidadores</p>
      </div>
    </div>
  );
};

export default LoginSelection;