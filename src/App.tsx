import { useEffect } from 'react';
import logo from './assets/logo.svg';
import logoMaior from './assets/+AJUDA.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { PiWheelchairFill } from "react-icons/pi";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import Ajuda from './assets/Hospital wheelchair-bro.png';

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
              <h1 className='h11'>Olá Cliente,  </h1>
              <h1>Deseja se tornar</h1>
              <h1>um Cuidador?</h1>
              <button className='button'>Torne-se um cuidador</button>
              <img className='Ajuda' src={Ajuda} alt="ajuda" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
 
