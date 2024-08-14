import { useState } from 'react';
import logo from './assets/AJUDA.png';
import maisajuda from './assets/MAIS-removebg-preview.png';
import face from './assets/face.png';
import insta from './assets/insta.png';
import youtube from './assets/youtube.png';
import acompanhante from './assets/acompanhante-de-idosos.jpg';
import manin from './assets/icons8-usuário-homem-com-círculo-48.png'

import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { gsap } from "gsap";
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownOpen_1, setDropdownOpen_1] = useState<boolean>(false);
  const [selectCuid, setSelectCuid] = useState<string>("");
  const [selectCid, setSelectCid] = useState<string>("");



  function handleCuidChange(option: string) {
    setSelectCuid(option);
    setDropdownOpen(false);
    gsap.to("#dropdown-list", {
      opacity: 0,
      x: -10,
      y: -10,
      duration: 0.3
    });
  }

  function handleCidChange(option: string) {
    setSelectCid(option);
    setDropdownOpen_1(false);
    gsap.to("#dropdown-list-1", {
      opacity: 0,
      x: -10,
      y: -10,
      duration: 0.3
    });
  }

  function toggleDropdown() {
    const newDropdownOpen = !dropdownOpen;
    setDropdownOpen(newDropdownOpen);
    if (newDropdownOpen) {
      gsap.from("#dropdown-list", {
        opacity: 0,
        x: -10,
        y: -10,
        duration: 0.3
      });
      gsap.to("#dropdown-list", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.3
      });
    } else {
      gsap.to("#dropdown-list", {
        opacity: 0,
        x: -10, 
        y: -10,
        duration: 0.3
      });
    }
  }

  function toggleDropdown1() {
    const newDropdownOpen_1 = !dropdownOpen_1;
    setDropdownOpen_1(newDropdownOpen_1);
    if (newDropdownOpen_1) {
      gsap.from("#dropdown-list-1", {
        opacity: 0,
        x: -10,
        y: -10,
        duration: 0.3
      });
      gsap.to("#dropdown-list-1", {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.3
      });
    } else {
      gsap.to("#dropdown-list-1", {
        opacity: 0,
        x: -10,
        y: -10,
        duration: 0.3
      });
    }
  }

  return (
    <>
      <header className='header'>
        <img src={logo} className='logo' alt="logo-mais-ajuda" />
        <nav>
          <p className='p'><a href='#'>Sobre Nós</a></p>
          <p className='p'><a href='#'>Depoimentos</a></p>
          <p className='p'><a href='#'>Contato</a></p>
          <p>|</p>
          <p className='p' onClick={() => nav('/login')}><IoPersonOutline /> Entrar</p>
        </nav>
        <RxHamburgerMenu className='menu-hamburguer'/>
      </header>

      <main>
        <section>
          <div className='conteiner-slider'>
            <div className="img-1">
              <h1 className='h11'>CONECTANDO CUIDADORES A QUEM PRECISA DE CUIDADOS DOMICILIARES</h1>
              <p className='pp21'>O Mais Ajuda foi especialmente desenvolvida para ser uma solução tecnológica através da qual pessoas que precisam de CUIDADOS encontrem CUIDADORES.</p>
            </div>
          </div>
        </section>

        <section className='encontrar'>
          <h1>Encontre o cuidador ideal</h1>
          <div id="conteiner-selects">
            <div className="selects">
              <div id="input-1">
                <label htmlFor="caixa-cuidado">Qual tipo de cuidado você busca?</label>
                <div onClick={toggleDropdown} className="dropdown-select">
                  { selectCuid ? <span className='textoSelect'>{selectCuid}</span> : <span className='textoSelect'>Selecione</span>}
                  <IoMdArrowDropdown className='seta'/>
                </div>
                <div id='dropdown-list' className={`dropdown-list ${dropdownOpen ? 'show' : 'hide'}`}>
                  <div onClick={() => handleCuidChange('PCD')} className="dropdown-list__item"><span className="textoSelect"><span className="textoSelect">PCD</span></span></div>
                  <hr />
                  <div onClick={() => handleCuidChange('Pós Operatório')} className="dropdown-list__item"><span className="textoSelect">Pós Operatório</span></div>
                  <hr />
                  <div onClick={() => handleCuidChange('Idoso')} className="dropdown-list__item"><span className="textoSelect">Idoso</span></div>
                  <hr />
                  <div onClick={() => handleCuidChange('Recém nascido')} className="dropdown-list__item"><span className="textoSelect">Recém nascido</span></div>
                  <hr />
                  <div onClick={() => handleCuidChange('Outros')} className="dropdown-list__item"><span className="textoSelect">Outros</span></div>
                </div>
              </div>

              <div id="input-2">
                <label htmlFor="cidade">De qual cidade você é?</label>
                <div onClick={toggleDropdown1} className="dropdown-select">
                  { selectCid ? <span className='textoSelect'>{selectCid}</span> : <span className='textoSelect'>Selecione</span>}
                  <IoMdArrowDropdown className='seta'/>
                </div>
                <div id='dropdown-list-1' className={`dropdown-list-1 ${dropdownOpen_1 ? 'show' : 'hide'}`}>
                  <div onClick={() => handleCidChange('Volta Redonda')} className="dropdown-list__item"><span className='textoSelect'>Volta Redonda</span></div>
                  <hr />
                  <div onClick={() => handleCidChange('Barra Mansa')} className="dropdown-list__item"><span className='textoSelect'>Barra Mansa</span></div>
                  <hr />
                  <div onClick={() => handleCidChange('Barra do Piraí')} className="dropdown-list__item"><span className='textoSelect'>Barra do Piraí</span></div>
                  <hr />
                  <div onClick={() => handleCidChange('Vassouras')} className="dropdown-list__item"><span className='textoSelect'>Vassouras</span></div>
                </div>
              </div>
            </div>
            <p className='pp'>Para quem precisa de acompanhamento domiciliar para si ou para seus familiares.</p>
            <button id='buscar'>Buscar</button>
          </div>
        </section>

        <hr className='linha-site'/>

        <section className='cuidador'>
          <div className="conteiner-text">
            <h2 id='text-cuidador'>
            Seja um cuidador! cadastre-se no clique botão abaixo
            </h2>
            <p className='pp1'>Há muitas oportunidades esperando por você!</p>
            <button className='btnCuid'>Quero ser um cuidador</button>  
          </div>
          <img src={acompanhante}  alt="acompanhante" className='imgacom'/>
        </section>

        <hr className='linha-site'/>
        
        <h1>Destaques</h1>
        <section id='destaques'>

          <div className="conteiner-destaque_user">
            <img src={manin} alt="homem no círculo"className='imgmanin'/>
            <p className='avaliacao'>🌟🌟🌟🌟🌟 </p>
            <p className='nome_espec'>João Gabriel <br /> (Cuidador de pós-operatório)</p>
          </div>

          <div className="conteiner-destaque_user">
            <img src={manin} alt="homem no círculo"className='imgmanin' />
            <p className='avaliacao'>🌟🌟🌟🌟🌟 </p>
            <p  className='nome_espec'>Pricíla Meirelles <br /> (Cuidadora infantil)</p>
          </div>

          <div className="conteiner-destaque_user">
            <img src={manin} alt="homem no círculo"className='imgmanin' />
            <p className='avaliacao'>🌟🌟🌟🌟🌟</p>
            <p className='nome_espec'>Flavio Ramos <br /> (Cuidador de Idosos)</p>
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
