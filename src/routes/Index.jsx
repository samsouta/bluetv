import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import { Footer, HNavbar } from '../components/Layout';
import RouteGard from '/src/routes/RouteGard.jsx';
import HomeDetail from '../components/Home/HomeDetail';
import About from '../pages/About';
const Index = () => {
    return (
        <>
            <HNavbar/>
            <Routes>
                <Route path='/' element={<RouteGard><Dashboard/></RouteGard>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/detail/:id' element={<HomeDetail/>} />
                <Route path='/about' element={<About/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default Index;
