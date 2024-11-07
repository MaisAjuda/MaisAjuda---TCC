import './Login.css';
import Senhor from '../../assets/senhor.png';
import MaisAjuda from '../../assets/AJUDA-black.png';
import { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';




 export function Login() {

    let notyf = new Notyf({
        duration: 0,
    })
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleEmail(e:any){
        setEmail(e.target.value)
    }
    function handleSenha(e:any){
        setSenha(e.target.value)
    }

    async function logar(){
        console.log(email)
        console.log(senha)
        if(email == '' || senha == ''){
            console.log('olasd')
            return(
               notyf.error('Preencha todos os campos')
            )
        };

        const response = await axios.get('http://localhost:3344/cliente').then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        });
    }

    return(
        <>
            <div className='conteiner-are'>
                 <div className='divAre'>
                            <h2 className='H2S'>Mais <br /> Ajuda</h2>
                            <img src={Senhor} alt="senhor" className='senhor' />

                            <h1 className='H1S'>Seja Bem vindo (a) </h1>
                    </div>
                    <div className='divAre2'>
                        <h1 className='H112'>Login</h1>
                        <label htmlFor="email"></label>
                        <input onChange={handleEmail} name='email' type="email" placeholder='Email...' className='inp'/>
                        <label htmlFor="senha"></label>
                        <input onChange={handleSenha}  type="password" name='senha' placeholder='Senha...' className='inp'/><br />
                        <button onClick={logar} className='entrar'>Entrar</button><br /><br />
                        <img src={MaisAjuda} alt="maisAjuda" className='Mais' />
                    </div>
            </div>
        </>
    )
    
}
