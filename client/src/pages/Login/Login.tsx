import './Login.css';
import Senhor from '../../assets/senhor.png';
import MaisAjuda from '../../assets/AJUDA-black.png';


 export function Login() {
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
                        <input name='email' type="email" placeholder='Email...' className='inp'/>
                        <label htmlFor="senha"></label>
                        <input type="password" name='senha' placeholder='Senha...' className='inp'/><br />
                        <button className='entrar'>Entrar</button><br /><br />
                        <img src={MaisAjuda} alt="maisAjuda" className='Mais' />
                    </div>
            </div>
        </>
    )
    
}
