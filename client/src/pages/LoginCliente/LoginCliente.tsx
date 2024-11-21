import './LoginCliente.css';
import Senhor from '../../assets/senhor.png';
import MaisAjuda from '../../assets/AJUDA-black.png';
import { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserType, setEmail, setSenha } from '../../Slice/UserSlice/UserSlice';
import { RootState } from '../../redux/store';

export function LoginCliente() {
  const dispatch = useDispatch();
  const { tipo, email, senha } = useSelector((state: RootState) => state.user);
  const [userEmail, setUserEmail] = useState('');
  const [userSenha, setUserSenha] = useState('');
  const nav = useNavigate();

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setUserEmail(e.target.value);
  }

  function handleSenha(e: React.ChangeEvent<HTMLInputElement>) {
    setUserSenha(e.target.value);
  }

  async function Logar() {
    try {
      // Dispatching actions to store the user info in Redux
      dispatch(setUserType('cliente'));
      dispatch(setEmail(userEmail));
      dispatch(setSenha(userSenha));

      // Making an API call to login
      const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cliente/login', {
        cli_email: userEmail,
        cli_senha: userSenha,
      });

      // Handle success
      const notyf = new Notyf({
        duration: 3000,
        dismissible: true,
      });
      notyf.success(response.data.mensagem);

      // Navigate to the home page
      nav('/home-cliente');
    } catch (error: any) {
      // Handle errors
      const notyf = new Notyf({
        duration: 3000,
        dismissible: true,
      });
      notyf.error(error.response?.data ?? 'Erro de autenticação');
    }
  }

  useEffect(() => {
    // Log the user info whenever it changes
    console.log({
      tipo,
      email,
      senha,
    });
  }, [tipo, email, senha]);

  return (
    <div className="conteiner-are">
      <div className="divAre">
        <h2 className="H2S">Mais <br /> Ajuda</h2>
        <img src={Senhor} alt="senhor" className="senhor" />
        <h1 className="H1S">Seja Bem-vindo(a)</h1>
      </div>
      <div className="divAre2">
        <h1 className="H112">Login</h1>
        <input
          onChange={handleEmail}
          name="email"
          type="email"
          placeholder="Email..."
          className="inp"
        />
        <input
          onChange={handleSenha}
          type="password"
          name="senha"
          placeholder="Senha..."
          className="inp"
        />
        <button onClick={Logar} className="entrar">Entrar</button>
        <img src={MaisAjuda} alt="maisAjuda" className="Mais" />
      </div>
    </div>
  );
}