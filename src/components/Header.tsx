import logo from '../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";  
import { useNavigate } from 'react-router-dom';
import '../App.css'



export function Header(){
    const nav = useNavigate();
    
    function NavSn() {
        nav('/sobreNos')
        
    }
    function NavDp() {
        nav('/depoimentos')
        
    }
    function NavCtt() {
        nav('/contato')
        
    }
    return(  
        <header className='header'>
            <img src={logo} className='logo'  alt="logo-mais-ajuda" />
            <nav>
                <p className='p' onClick={NavSn}>Sobre Nós</p>
                <p className='p' onClick={NavDp}>Depoimentos</p>
                <p className='p' onClick={NavCtt}>Contato</p>
                <p>|</p>
                <p className='p' onClick={() => nav('/login')}><IoPersonOutline /> Entrar</p>
            </nav>
            <RxHamburgerMenu className='menu-hamburguer'/>
        </header>
    )
}