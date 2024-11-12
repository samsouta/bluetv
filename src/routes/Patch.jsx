import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import RouteGard from './routegard/RouteGard';
import HNavbar from '../components/Navbar/HNavbar';
import HomeDetail from '../components/Home/HomeDetail/HomeDetail';
import Footer from '../components/Footer/Footer';
import About from '../pages/About';

const Patch = () => {
  return (
    <>
      <HNavbar/>
      <Routes>
        <Route path='/' element={<RouteGard><Dashboard/></RouteGard>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/detail/:id' element={<HomeDetail/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default Patch;
