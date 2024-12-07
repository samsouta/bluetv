import React, { useCallback, useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SideMenuItems } from '../../Utils/SideMenuItems';
import { useDispatch } from 'react-redux';
import { getSidebarItem } from '../../services/Feature/SidebarSlice';
import { useNavigate } from 'react-router-dom';
import { stateContext } from '../../context/StateContext';
import TvLoader from '../Ui/TvLoader';
import { useGetMostViewsQuery } from '../../services/api/MostViews';
import { useGetTopRateQuery } from '../../services/api/TopRate';
import { useGetPopularQuery } from '../../services/api/Popular';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const dispatch = useDispatch();
    const { setFilteredMovies,setCurrentPage } = useContext(stateContext);
    const navigate = useNavigate();

    const { data: mostView, isLoading: loadingMostView } = useGetMostViewsQuery();
    const { data: topRate, isLoading: loadingTopRate } = useGetTopRateQuery();
    const { data: popular, isLoading: loadingPopular } = useGetPopularQuery();

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: '100%' },
    };

    const menuItemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 20 },
    };

    const handleSidebarAction = useCallback((url, text, data, isLoading) => {
        if (isLoading) {
            return <TvLoader/>
        }
        setIsOpen(false);
        dispatch(getSidebarItem(text));
        setFilteredMovies(data);
        navigate(url);
    });

    const handleSidebar = useCallback((id, text) => {
        const actions = {
            1: () => {
                localStorage.removeItem('sidetext');
                navigate('/home');
                setIsOpen(false);
                window.location.reload()
                setCurrentPage(1)

            },
            2: () => window.open('/contact', '_blank', 'noopener,noreferrer'),
            3: () => handleSidebarAction('/home#most-view', text, mostView?.data, loadingMostView),
            4: () => handleSidebarAction('/home#popular', text, popular?.data, loadingPopular),
            5: () => handleSidebarAction('/home#top-rates', text, topRate?.data, loadingTopRate),
        };

        actions[id]?.();
    });

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="p-2 text-[var(--font-color)]"
            >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

            <motion.nav
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                variants={sidebarVariants}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 right-0 h-full w-64 bg-[var(--navbar-color)] text-[var(--font-color)] p-5 shadow-xl z-40"
            >
                <div className="flex flex-col h-full">
                    <h2 className="text-2xl font-bold kablammo mb-10">BlueTV</h2>
                    <ul className="space-y-4 flex-grow">
                        {SideMenuItems.map((item, index) => (
                            <motion.li
                                key={item.text}
                                variants={menuItemVariants}
                                transition={{ delay: index * 0.2 }}
                            >
                                <a
                                    onClick={() => handleSidebar(item.id, item.text)}
                                    className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-[var(--a-color)] transition-colors duration-300"
                                >
                                    <item.icon size={20} />
                                    <span>{item.text}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </motion.nav>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default SideBar;