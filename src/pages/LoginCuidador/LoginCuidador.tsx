import './LoginCuidador.css';
import icone_grade_cuidador from '../../assets/icone-grande-cuidador.png';
import MaisAjuda from '../../assets/AJUDA-black.png';
import { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail, setSenha, setUserType } from '../../Slice/UserSlice/UserSlice';


 export function LoginCuidador() {

    const nav = useNavigate()
    const dispatch = useDispatch()

    let notyf = new Notyf({
        duration: 0,
        dismissible: true
    })

    const [email, setUserEmail] = useState('')
    const [senha, setUserSenha] = useState('')

    function handleEmail(e:any){
        setUserEmail(e.target.value)
    }
    function handleSenha(e:any){
        setUserSenha(e.target.value)
    }

    async function Logar() {
        try {

            dispatch(setUserType('cuidador'));
            dispatch(setEmail(email));
            dispatch(setSenha(senha));
            
            try {
                const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cuidador/login',{
                    "cui_email": email,
                    "cui_senha": senha
                })
                await 
                nav('/home-cuidador')
                notyf.success(response.data.mensagem)
            } catch (error:any) {
                notyf.error(error.response.data)
            }


        } catch (error) {
            console.log(error)
        }
    }
    

    return(
        <>
            <div className='conteiner-are'>
                 <div className='divAre'>
                            <h2 className='H2S'>Mais <br /> Ajuda</h2>
                            <img src={icone_grade_cuidador} alt="senhor" className='senhor' />

                            <h1 className='H1S'>Seja Bem vindo (a) </h1>
                    </div>
                    <div className='divAre2'>
                        <h1 className='H112'>Login</h1>
                        <label htmlFor="email"></label>
                        <input onChange={handleEmail} name='email' type="email" placeholder='Email...' className='inp'/>
                        <label htmlFor="senha"></label>
                        <input onChange={handleSenha} type="password" name='senha' placeholder='Senha...' className='inp'/><br />
                        <h6 className='AGASEIS' onClick={()=>{
                            nav('/cadCuidador')
                        }}>Não tenho uma conta</h6>
                        <button onClick={Logar} className='entrar'>Entrar</button><br /><br />
                        <img src={MaisAjuda} alt="maisAjuda" className='Mais' />
                    </div>
            </div>
        </>
    )
    
}
