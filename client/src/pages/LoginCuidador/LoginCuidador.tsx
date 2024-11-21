import './LoginCuidador.css';
import icone_grade_cuidador from '../../assets/icone-grande-cuidador.png';
import MaisAjuda from '../../assets/AJUDA-black.png';
import { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';


 export function LoginCuidador() {

    let notyf = new Notyf({
        duration: 0,
        dismissible: true
    })

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleEmail(e:any){
        setEmail(e.target.value)
    }
    function handleSenha(e:any){
        setSenha(e.target.value)
    }

    async function Logar() {
        try {

            
            try {
                const response = await axios.post('https://maisajuda-tcc-backend.onrender.com/cuidador/login',{
                    "cui_email": email,
                    "cui_senha": senha
                })
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
                        <button onClick={Logar} className='entrar'>Entrar</button><br /><br />
                        <img src={MaisAjuda} alt="maisAjuda" className='Mais' />
                    </div>
            </div>
        </>
    )
    
}
