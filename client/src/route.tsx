import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu'
import { Area } from './pages/AreaRestrita';
export function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/login" element={<Area/>} />
            </Routes>
        </BrowserRouter>
    )
}