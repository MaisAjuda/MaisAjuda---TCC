import logo from '../../assets/logo.svg';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";  
import { useNavigate } from 'react-router-dom';
import './Header.css'



export function Header(){
    const nav = useNavigate();

    

    return(  
        <header className='header'>
            <img src={logo} className='logo'  alt="logo-mais-ajuda" />
            <nav>
                <p className='p' onClick={() => nav('sobreNos')}>Sobre Nós</p>
                <p className='p' onClick={() => nav('depoimentos')}>Depoimentos</p>
                <p className='p' onClick={() => nav('contato')}>Contato</p>
                <p>|</p>
                <p className='p' onClick={() => nav('/login')}><IoPersonOutline /> Entrar</p>
            </nav>
            <RxHamburgerMenu className='menu-hamburguer'/>
        </header>
    )
}