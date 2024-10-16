import './SobreNos.css';
import idosos from '../../assets/idosos21.jpg';
import bebe from '../../assets/bebezinha.jpg';
import pcd from '../../assets/pcd.jpg';
import pos from '../../assets/pos.jpg';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export function SobreNos() {
    return(
        <>
            <Header></Header>
            <main id='main-sobre-nos'>
                <h1 id='SobreNos'>Sobre Nós</h1>

                <p className='p'>Somos uma plataforma que conecta de forma segura e eficiente familiares a cuidadores de pessoas dependentes
                facilitando o acesso mútuo.</p>

                <h1 id='NossosCuid'>Nossos Cuidados</h1>

                <div id="conteiner-sobre-nos">
                    <div id='pcd'>
                        <img src={pcd} alt="pcd" width={286} height={220} className='imgpcd'/>
                        <p id='P2'>PCD</p>
                    </div>
                    <div id='pos-opera'>
                        <img src={pos} alt="pos" width={375} height={220} className='imgpos'/>
                        <p id='P3'>Pós Operatório</p>
                    </div>
                    <div id='Idosos'>
                        <img src={idosos} alt="idosos" width={267} height={220} className='imgidoso'/>
                        <p id='P4'>Idosos</p>
                    </div>
                    <div id='Recem'>
                        <img src={bebe} alt="bebe" width={379} height={220} className='imgbebe'/>
                        <p id='P5'>Recém Nascidos</p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}   