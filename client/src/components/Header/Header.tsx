import logo from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";  
import { useNavigate } from 'react-router-dom';
import './Header.css'
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

// Registre o plugin CSSPlugin
gsap.registerPlugin(CSSPlugin);

export function Header(){
    const nav = useNavigate();

    function EntraMouse(e: React.MouseEvent<HTMLParagraphElement>){
        console.log('entrou')

        gsap.to(e.currentTarget, {
            scale: 1.3,
            duration: 0.3,
            color: '#026773'
        });
    }

    function SaiMouse(e: React.MouseEvent<HTMLParagraphElement>){
        console.log('saiu')

        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            color: '#FFF'
        });
    }

    return(  
        <header className='header'>
            <img src={logo} className='logo'  alt="logo-mais-ajuda" />
            <nav>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={() => nav('sobreNos')}>Sobre Nós</p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={() => nav('depoimentos')}>Depoimentos</p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={() => nav('contato')}>Contato</p>
                <p>|</p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={() => nav('/login')}><IoPersonOutline /> Entrar</p>
            </nav>
            <RxHamburgerMenu className='menu-hamburguer'/>
        </header>
    )
}
