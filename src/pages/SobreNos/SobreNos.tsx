import './SobreNos.css';
import logo from '../../assets/AJUDA.png';
import idosos from '../../assets/idosos21.jpg';
import bebe from '../../assets/bebezinha.jpg';
import pcd from '../../assets/pcd.jpg';
import pos from '../../assets/pos.jpg';
import face from '../../assets/face.png';
import insta from '../../assets/insta.png';
import youtube from '../../assets/youtube.png';
import maisajuda from '../../assets/MAIS-removebg-preview.png';
import { Footer } from '../../components/Footer';

export function SobreNos() {
    return(
        <>
            <main id='main-sobre-nos'>
                <h1 id='SobreNos'>Sobre Nós</h1>
                <p className='Paragrafo1'>Somos uma plataforma que conecta de forma segura e eficiente familiares a cuidadores de pessoas dependentes
                facilitando o acesso mútuo.</p>
                <h1 id='NossosCuid'>Nossos Cuidados</h1>

                <div id="conteiner-sobre-nos">
                    <div className='Pcd'>
                        <img src={pcd} alt="pcd" width={286} height={220} className='imgpcd'/>
                        <p className='P2'>PCD</p>
                    </div>
                    <div className='Pós'>
                        <img src={pos} alt="pos" width={382} height={220} className='imgpos'/>
                        <p className='P3'>Pós Operatório</p>
                    </div>
                    <div className='Idosos'>
                        <img src={idosos} alt="idosos" width={267} height={220} className='imgidoso'/>
                        <p className='P4'>Idosos</p>
                    </div>
                    <div className='Recem'>
                        <img src={bebe} alt="bebe" width={379} height={220} className='imgbebe'/>
                        <p className='P5'>Recém Nascidos</p>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>
    )
}   