import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteGard from './RouteGard';
import TvLoader from '../components/Ui/TvLoader';

// Lazy-loaded components
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const HomeDetail = lazy(() => import('../components/Home/HomeDetail'));
const Contant = lazy(() => import('../pages/Contant'));

const Index = () => {
    return (
        <Suspense fallback={<TvLoader />}>
            <Routes>
                <Route path="/" element={<RouteGard><Dashboard /></RouteGard>} />
                <Route path="/home" element={<Home />} />
                <Route path="/video/:id" element={<HomeDetail />} />
                <Route path="/contact" element={<Contant />} />
            </Routes>
        </Suspense>
    );
};

export default Index;
