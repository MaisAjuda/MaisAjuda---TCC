import { useState } from 'react';
import { Footer } from './components/Footer/Footer';
import acompanhante from './assets/acompanhante-de-idosos.jpg';
import manin from './assets/icons8-usuário-homem-com-círculo-48.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { gsap } from "gsap";
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import InputMask from 'react-input-mask';
import { useDispatch } from 'react-redux';
import { setEspCode } from './Slice/espSlice/espSlice';
function Menu() {
  const nav = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectCuid, setSelectCuid] = useState<string>("");
  const dispatch = useDispatch();


  function handleCuidChange(option: string) {
    setSelectCuid(option);
    setDropdownOpen(false);
    gsap.to("#dropdown-list", {
      opacity: 1,
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

  function setEspId(id: number){
    console.log(id)
    dispatch(setEspCode(id));
  }

  return (
    <>
      
      <Header></Header>

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
                  <div onClick={() => {
                    handleCuidChange('PCD')
                    setEspId(1)
                  }} className="dropdown-list__item"><span className="textoSelect"><span className="textoSelect">PCD</span></span></div>
                  <hr />
                  <div onClick={() => {
                    handleCuidChange('Pós Operatório')
                    setEspId(2)
                  }} className="dropdown-list__item"><span className="textoSelect">Pós Operatório</span></div>
                  <hr />
                  <div onClick={() => {
                    handleCuidChange('Idoso')
                    setEspId(3)
                  }} className="dropdown-list__item"><span className="textoSelect">Idoso</span></div>
                  <hr />
                  <div onClick={() => {
                    handleCuidChange('Recém nascido')
                    setEspId(4)
                  }} className="dropdown-list__item"><span className="textoSelect">Recém nascido</span></div>
                  <hr />
                  <div onClick={() => {
                    handleCuidChange('Todos')
                    setEspId(0)
                  }} className="dropdown-list__item"><span className="textoSelect">Todos</span></div>
                </div>
              </div>

              <div id="input-2">
                <label htmlFor="cidade">Informe seu CEP</label><br />
                <InputMask
                  className="input-cep"
                  mask="99999-999"
                  type="text"
                  name="cpf"
                  id="form-cpf"
                  title="Digite um CEP no formato: xxxxx-xxx"
                  required

                />
              </div>
            </div>
            <p className='pp'>Para quem precisa de acompanhamento domiciliar para si ou para seus familiares.</p>
            <button onClick={() => {
              nav('/home-cliente')
            }} id='buscar'><h3>Buscar</h3></button>
          </div>
        </section>

        <hr className='linha-site'/>

        <section className='cuidador'>
          <div className="conteiner-text">
            <h2 id='text-cuidador'>
            Seja um cuidador! cadastre-se no clique botão abaixo
            </h2>
            <p className='pp1'>Há muitas oportunidades esperando por você!</p>
            <button onClick={()=> nav('cadCuidador')}  className='btnCuid'>Quero ser um cuidador</button>  
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
      <Footer></Footer>
    </>
  );
}

export default Menu;
