import { useEffect } from 'react';
import logo from './assets/logo.svg';
import logoMaior from './assets/+AJUDA.png';
import Ajuda from './assets/Hospital wheelchair-bro.png';
import maisajuda from './assets/MAIS-removebg-preview.png'
import face from './assets/face.png'
import insta from './assets/insta.png'
import youtube from './assets/youtube.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";


import './App.css';

function App() {
  return (
    <>
      <header className='header'>
        <img className='logo' src={logo} alt="logo-mais-ajuda" />
        <nav>
          <p className='p1'><a href='#'>Sobre Nós</a></p>
          <p className='p2'><a href='#'>Torne-se um Cuidador</a></p>
          <p className='p3'><a href='#'>Depoimentos</a></p>  
          <p className='p4'><a href='#'>Contato</a></p>  
        </nav>
        <RxHamburgerMenu className='menu-hamburguer'/>
      </header>

      <main>
        <section>
          <div className="border-conteiner">
            <div className="conteiner">
              <img src={logoMaior} alt="logo-mais-ajuda" />
              <p>QUAIS CUIDADOS VOCÊ BUSCA?</p>
              <input name='pesquisa' type="text" />
              <FaSearch className='icon-search'/>
              <PiWheelchairFill className='icon-cadeira'/>
              <button>Encontre seu Cuidador ideal</button>
            </div>
          </div>
        </section>

        <section>
            <h2>Destaques da Semanda</h2>
              <div className="avaliacao">
                <GoChevronLeft className='esquerda'/>
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
                </div>
              </div>
        </section>

        <section>
          <div className='Voluntário1'>
            <div className='Voluntário2'>
              <div className="text-conteiner">
                <h1 className='h11'>Olá Cliente, </h1>
                <h1>Deseja se tornar</h1> 
                <h1>um Cuidador?</h1>
                <button className='button'>Torne-se um cuidador</button>
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
        <p className='copy'>© Copyright 2024-2025 maisajuda.com.br - All Rights Reserved - MaisAjuda</p>
      </footer>
    </>
  );
}

export default App;
 
