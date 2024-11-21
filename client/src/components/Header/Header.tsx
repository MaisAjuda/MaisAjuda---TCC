import logo from '../../assets/AJUDA.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import './Header.css';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Notyf } from 'notyf';
import { RootState } from '@reduxjs/toolkit/query';

gsap.registerPlugin(CSSPlugin);

export function Header() {
    const { email } = useSelector((state:any) => state.user);
    const [isUserValid, setIsUserValid] = useState(false);
    const notyf = new Notyf({
        duration: 3000,
        dismissible: true,
    });
    const nav = useNavigate();

    // Validação do usuário
    useEffect(() => {
        const fetchUser = async () => {
            if (email) {
                try {
                    // Monta a URL com o e-mail
                    const response = await axios.get(`https://maisajuda-tcc-backend.onrender.com/cliente/get-user/${encodeURIComponent(email)}`);
        
                    console.log(response.data);
        
                    if (response.data) {
                        setIsUserValid(true); // Usuário encontrado
                        notyf.success('Perfil carregado com sucesso!');
                    } else {
                        setIsUserValid(false); // Usuário não encontrado
                        notyf.error('Usuário não encontrado.');
                    }
                } catch (e:any) {
                    console.error(e);
                    setIsUserValid(false); // Erro na requisição
                    notyf.error(e.response?.data?.message ?? 'Erro ao carregar o perfil.');
                }
            } else {
                setIsUserValid(false); // Nenhum e-mail fornecido
                notyf.error('E-mail não fornecido.');
            }
        };     

        fetchUser();
    }, [email]);

    // Funções de animação
    function EntraMouse(e: React.MouseEvent<HTMLParagraphElement>) {
        gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            color: '#026773',
        });
    }

    function SaiMouse(e: React.MouseEvent<HTMLParagraphElement>) {
        gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            color: '#FFF',
        });
    }

    return (
        <header className="header">
            <img src={logo} className="logo" onClick={()=>{
                nav('/')
            }} alt="logo-mais-ajuda" />
            <nav>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} id="p-home" className="p-header" onClick={() => {
                    const { tipo, email, senha } = useSelector((state: any) => state.user);
                    
                    if (!email || !senha || tipo === 'cuidador') {
                        nav('/home-cliente');
                    }else{
                        nav('/')
                    }
                }}>
                    Home
                </p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className="p-header" onClick={() => nav('/sobreNos')}>
                    Sobre Nós
                </p>
                <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className="p-header" onClick={() => nav('/contato')}>
                    Contato
                </p>
                <p>|</p>
                {/* Renderiza com base no estado */}
                {isUserValid ? (
                    <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className="p-header" onClick={() => nav('/perfil-cliente')}>
                        <IoPersonOutline /> Perfil
                    </p>
                ) : (
                    <p onMouseEnter={EntraMouse} onMouseLeave={SaiMouse} className="p-header" onClick={() => nav('/login-selecao')}>
                        <IoPersonOutline /> Entrar
                    </p>
                )}
            </nav>
            <RxHamburgerMenu className="menu-hamburguer" />
        </header>
    );
}
