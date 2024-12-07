import React, { useEffect, useState, useContext } from "react";
import { useGetAllgenreQuery } from "../../services/api/GetAllGenre";
import HomeTap from "../Ui/HomeTap";
import { Clapperboard, ImageDown } from "lucide-react";
import HomeGenre from "../Ui/HomeGenre";
import { useLocation } from "react-router-dom";
import SidebarTap from "../Ui/SidebarTap";
import { stateContext } from '../../context/StateContext'

const homeMenu = [
    { id: 1, path: "Video", icon: <Clapperboard /> },
    { id: 2, path: "Photo", icon: <ImageDown /> },
];

const HomeCatagory = () => {
    const [HomeTapActive, setHomeTapActive] = useState(() => {
        // Check localStorage value first, then set state
        return localStorage.getItem('HomeTapActive') || 'Video';
    });
    const [HomeGernActive, setHomeGernActive] = useState(() => {
        // Check localStorage value first, then set state
        return localStorage.getItem('HomeGernActive') || 'All';
    });
    
    const { currentData } = useGetAllgenreQuery();
    const { sideBarTap, setSideBarTap } = useContext(stateContext);
    const location = useLocation();

    useEffect(() => {
        // Set sidebar visibility based on URL hash
        if (
            location.pathname === '/home' &&
            (location.hash === '#most-view' ||
                location.hash === '#popular' ||
                location.hash === '#top-rates')
        ) {
            setSideBarTap(true);
        } else {
            setSideBarTap(false);
        }
    }, [location, setSideBarTap]);

    return (
        <div>
            <div className={`${sideBarTap ? " hidden" : " visible"} mt-12 px-2 sm:px-1 grid gap-y-4`}>
                <h1 className="text-2xl text-[var(--font-color)] custom-header">
                    Categories
                </h1>
                <div className={`${HomeTapActive === "Video" ? " visible" : " hidden"} flex flex-wrap gap-4 lg:gap-4 w-full lg:w-auto`}>
                    <HomeGenre currentData={currentData} HomeGernActive={HomeGernActive} setHomeGernActive={setHomeGernActive} setHomeTapActive={setHomeTapActive} />
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-start gap-4 w-full">
                    <div className={`flex gap-4 w-full lg:w-auto`}>
                        <HomeTap homeMenu={homeMenu} HomeTapActive={HomeTapActive} setHomeTapActive={setHomeTapActive} />
                    </div>
                </div>
            </div>
            <div className={`${sideBarTap ? " visible" : "hidden"} mx-auto mt-10 px-3`}>
                <SidebarTap />
            </div>
        </div>
    );
};

export default HomeCatagory;
