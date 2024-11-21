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
    if(tipo === 'cliente'){
        try {
          const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cliente/login', {
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
    }if(tipo === 'cuidador'){
      try {
        return
      } catch (error) {
        return
      }
    }
    console.error("deu erro");
}