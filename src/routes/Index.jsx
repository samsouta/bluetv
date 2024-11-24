import React from 'react';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import RouteGard from '/src/routes/RouteGard.jsx';
import HomeDetail from '../components/Home/HomeDetail';
import { useRoutes } from 'react-router-dom';
import Contant from '../pages/Contant';
const Index = () => {
    const routes = [
        {path: '/' , element: <RouteGard><Dashboard/></RouteGard>},
        {path: '/home' , element: <Home/>},
        {path: '/detail/:id' , element: <HomeDetail/>},
        {path: '/contact' , element: <Contant/>},
    ]
    const element = useRoutes(routes)
    return element;

}

export default Index;
