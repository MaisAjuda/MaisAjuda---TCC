import maisajuda from '../../assets/MAIS-removebg-preview.png';
import face from '../../assets/face.png';
import insta from '../../assets/insta.png';
import youtube from '../../assets/youtube.png';
import  './Footer.css'

export function Footer(){
    return(
        <>
        <footer>
            <div className="footer-conteiner">
            <img src={maisajuda} alt="logo-mais-ajuda" />
            <article className='article'>
                <p className='para'>Contatos</p>
                <ul>
                <li>contato@maisajuda.com</li>
                <li>(00) 00000-0000</li>
                <li>(00) 00000-0000</li>
                <li>(00) 00000-0000</li>
                </ul>
                <h2 className='h22'>Siga o Mais Ajuda nas redes </h2>
                <h2 className='h2'>sociais</h2>
                <div className='imgRedes'>
                <img className='face' src={face} alt="facebook" />
                <img className='insta' src={insta} alt="instagram" />
                <img className='youtube' src={youtube} alt="youtube" />
                </div>
            </article>
            </div>
            <p className='copy'>© Copyright 2024-2025 maisajuda.com.br - All Rights Reserved - MaisAjuda</p>
      </footer>
        </>
    )
}