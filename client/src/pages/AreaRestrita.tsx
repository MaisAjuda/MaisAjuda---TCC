import './App2.css';
import Senhor from '../assets/senhor.png';
import MaisAjuda from '../assets/AJUDA.png';


 export function Area () {
    return(
        <>
            <div className='conteiner-are'>
                 <div className='divAre'>
                            <h2 className='H2S'>Mais <br /> Ajuda</h2>
                            <img src={Senhor} alt="senhor" className='senhor' />

                            <h1 className='H1S'>Área <br /> do <br /> Cuidador <br /> <span>Olá Cuidador seja Bem Vindo(a)</span></h1>


                        {/* <h1 className='H1S'>Área  </h1>
                        <h1 className='H1SS'>do</h1>
                        <h1 className='H11S'>Cuidador</h1>
                        <p className='PS'>Olá Cuidador</p>
                         */}
                    </div>
                    <div className='divAre2'>
                        <h1 className='H112'>Login</h1>
                        <input type="email" placeholder='Email...' className='inp'/>
                        <input type="password" placeholder='Senha...' className='inp'/><br />
                        <button className='entrar'>Entrar</button><br /><br />
                        {/* <img src={MaisAjuda} alt="maisAjuda" className='Mais' /> */}
                    </div>
            </div>
        </>
    )
    
}
