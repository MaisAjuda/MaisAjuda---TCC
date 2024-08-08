
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './Menu';
import { Area } from './AreaRestrita';

export function RouteApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/Area' element={<Area/>} />
            </Routes>
        </BrowserRouter>
    )
}
