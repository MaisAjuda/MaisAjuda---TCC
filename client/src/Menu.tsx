import { useEffect } from 'react';
import logo from './assets/AJUDA.png';
import logoMaior from './assets/AJUDA.png';
import Ajuda from './assets/Hospital wheelchair-bro.png';
import maisajuda from './assets/MAIS-removebg-preview.png';
import foto_idoso from './assets/foto-idoso.png'
import coiso from './assets/coiso.png'
import face from './assets/face.png';
import insta from './assets/insta.png';
import youtube from './assets/youtube.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";

import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate()
  return (
    <>
      <header className='header'>
        <img src={logo} className='logo' alt="logo-mais-ajuda" />
        <nav>
          <p className='p'><a href='#'>Sobre Nós</a></p>
          <p className='p'><a href='#'>Depoimentos</a></p>  
          <p className='p'><a href='#'>Contato</a></p>  
        </nav>
        <RxHamburgerMenu className='menu-hamburguer'/>
      </header>

      <main>
        <section>
          <div className='conteiner-slider'>
            <img src={coiso} id='coiso'/>
            <ul className="slider">
              <li>
                <div className="img-1"></div>
              </li>
            </ul>
          </div>
        </section>

        <section>
            <h2>Destaques da Semanda</h2>
              <div className="avaliacao">
                {/* <GoChevronLeft className='esquerda'/>
                <GoChevronRight className='direita'/>
                <div className="person">
                 <IoPersonCircleOutline className='foto-anony'/>
                 <p>Jeferon Azevedo </p>
                 ⭐⭐⭐⭐⭐
                </div>
                <div className="person">
                  <IoPersonCircleOutline className='foto-anony'/>
                  <p>Maria Teixeira </p>
                  ⭐⭐⭐⭐⭐
                </div>
                <div className="person">
                  <IoPersonCircleOutline className='foto-anony'/>
                  <p>João Persona</p>
                  ⭐⭐⭐⭐⭐
                </div> */}
              </div>
        </section>

        <section>
          <div className='Voluntário1'>
            <div className='Voluntário2'>
              <div className="text-conteiner">
                <h1 className='h11'>Olá Cliente, </h1>
                <h1>Deseja se tornar</h1> 
                <h1>um Cuidador?</h1>
                <button className='button' onClick={() => nav('/login')}>Torne-se um cuidador</button>
              </div>
              <img className='Ajuda' src={Ajuda} alt="ajuda" />
            </div>
          </div>
        </section>
      </main>
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
  );
}

export default App;
 
