import axios from "axios";
import { Notyf } from "notyf";
import { useDispatch } from 'react-redux';
import { setEmail, setSenha, setUserType } from "../../Slice/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";

const notyf = new Notyf({
    duration: 0,
    dismissible: true,
  });
const dispatch = useDispatch();
const nav = useNavigate();

export async function Login(userEmail:string,userSenha:string,tipo:string){
    try {
        const response = await axios.post('http://localhost:3344/cliente/login', {
          cli_email: userEmail,
          cli_senha: userSenha,
        });
    
        notyf.success(response.data.mensagem);
    
        dispatch(setUserType('cliente'));
        dispatch(setEmail(userEmail));
        dispatch(setSenha(userSenha));
    
        nav('/home-cliente');
      } catch (error: any) {
        notyf.error(error.response?.data ?? 'Erro de autenticação');
    }
}