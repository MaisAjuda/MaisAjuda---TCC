import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu'
import { LoginCliente } from './pages/LoginCliente/LoginCliente';
import { LoginCuidador } from './pages/LoginCuidador/LoginCuidador';
import { CadCuidador } from "./pages/CadCuidador/CadCuidador";
import { SobreNos } from "./pages/SobreNos/SobreNos";
import { Contato } from "./pages/Contato/Contato";
import LoginSelection from "./pages/LoginSelection/LoginSelection";
import { HomeCliente } from "./pages/HomeCliente/HomeCliente";

export function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/login-selecao" element={<LoginSelection/>} />
                <Route path="/login-cliente" element={<LoginCliente/>} />
                <Route path="/login-cuidador" element={<LoginCuidador/>} />
                <Route path="/home-cliente" element={<HomeCliente/>} />
                <Route path="/cadCuidador" element={<CadCuidador/>} />
                <Route path="/sobreNos" element={<SobreNos />} />
                <Route path="/" element={<Menu />} />
                <Route path="/contato" element={<Contato />} />
                
            </Routes>
        </BrowserRouter>
    )
}
