import './App2.css';
import Senhor from './assets/senhor.png';
import MaiidAj from './assets/maiisAjuda.png';


 export function Area () {
    return(
        <>
            <body className='body'>
                    <div className='divAre'>
                        <h1 className='H1S'>Área  </h1>
                        <h1 className='H1SS'>do</h1>
                        <h1 className='H11S'>Cuidador</h1>
                        <p className='PS'>Olá Cuidador</p>
                        <p className='PS2'>Seja Bem Vindo(a)</p>
                        <h2 className='H2S'>Mais </h2>
                        <h2 className='H22S'>Ajuda</h2>
                        <img src={Senhor} alt="senhor" className='senhor' />
                    </div>
                    <div className='divAre2'>
                        <h1 className='H112'>Login</h1>
                        <input type="email" placeholder='Email' className='inp1'/>
                        <input type="password" placeholder='Senha' className='inp2'/><br />
                        <button className='entrar'>Entrar</button><br /><br />
                        <img src={MaiidAj} alt="maisAjuda" className='Maais' />
                    </div>
            </body>
        </>
    )
    
}
