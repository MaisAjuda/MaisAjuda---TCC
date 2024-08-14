import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu'
import { Login } from './pages/Login/Login';
import { CadCuidador } from "./pages/CadCuidador/CadCuidador";
export function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadCuidador" element={<CadCuidador/>} />
            </Routes>
        </BrowserRouter>
    )
}