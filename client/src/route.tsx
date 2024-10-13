import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu'
import { Login } from './pages/Login/Login';
import { CadCuidador } from "./pages/CadCuidador/CadCuidador";
import { SobreNos } from "./pages/SobreNos/SobreNos";
import { Depoimentos } from "./pages/Depoimentos/Depoimentos";
import { Contato } from "./pages/Contato/Contato";
export function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadCuidador" element={<CadCuidador/>} />
                <Route path="/sobreNos" element={<SobreNos />} />
                <Route path="/depoimentos" element={<Depoimentos />} />
                <Route path="/contato" element={<Contato />} />
            </Routes>
        </BrowserRouter>
    )
}
