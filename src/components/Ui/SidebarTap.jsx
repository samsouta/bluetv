import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SidebarTap = () => {
    const sideItem = useSelector((state) => state.sidebar);

    return (
        <div className="flex w-full flex-col">
            <Tabs color='' size="md" aria-label="Options"
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#007c8e]"
                }}
            >
                <Tab
                    title={
                        <div className="flex items-center space-x-2">
                            <span className='head-font text-[#007c8e]' >{sideItem?.text}</span>
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [-5, 0, -5] }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                            </motion.div>

                        </div>
                    }
                >
                </Tab>
            </Tabs>
        </div>
    );
};

export default SidebarTap;
