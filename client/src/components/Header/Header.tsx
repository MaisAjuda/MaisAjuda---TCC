import logo from '../../assets/AJUDA.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";  
import { useNavigate } from 'react-router-dom';
import './Header.css'
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';

gsap.registerPlugin(CSSPlugin);


export function Header(){
    const nav = useNavigate();

    function EntraMouse(e: React.MouseEvent<HTMLParagraphElement>){
        console.log('entrou')

        gsap.to(e.currentTarget, {
            scale: 1.05,
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
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} id='p-home' className='p-header' onClick={()=> nav('/')}>Home </p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={()=> nav('/sobreNos')} >Sobre Nós</p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={()=> nav('/contato')}>Contato</p>
                <p>|</p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className='p-header' onClick={() => nav('/login-selecao')}><IoPersonOutline /> Entrar</p>
            </nav>
            <RxHamburgerMenu className='menu-hamburguer'/>
        </header>
    )
}
