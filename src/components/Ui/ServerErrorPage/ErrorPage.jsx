import React from 'react'
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, Home, Hexagon } from 'lucide-react';
import GlitchText from './GlitchText';
import { useNavigate } from 'react-router-dom';


const ErrorPage = () => {
    const nav = useNavigate()
    const GoHome = () => {
        window.location.reload()
    }
    const RpAdmin = () => {
        nav(`/contact`)
    }
    return (
        <div className=' fixed top-0 h-screen w-full z-50'>
            <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] text-white">
                {/* Ambient Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
                    <div className="absolute inset-0 bg-black/40" /> {/* Video overlay */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full scale-110 object-center object-cover"
                        style={{
                            filter: 'hue-rotate(-10deg) saturate(1.2)',
                        }}
                    >
                        <source
                            src="https://v1.pinimg.com/videos/mc/720p/08/4f/0f/084f0fc0d305890018f9e150d70a63e6.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>

                {/* Decorative Hexagons */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 3,
                                delay: i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Hexagon className="h-32 w-32 text-purple-500/30" />
                        </motion.div>
                    ))}
                </div>

                {/* Glass Container */}
                <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-2xl backdrop-blur-md"
                    >
                        <div className="relative z-10 bg-black/50 p-8 shadow-2xl">
                            {/* Animated Border */}
                            <div className="absolute inset-0 z-0">
                                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="mb-8 inline-flex"
                                >
                                    <AlertCircle className="h-24 w-24 bg-gradient-to-br from-red-500 to-purple-500 bg-clip-text text-transparent" />
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <GlitchText
                                        text="SYSTEM ERROR"
                                        className="mb-4 text-6xl font-bold tracking-wider sm:text-7xl"
                                    />
                                    <h2 className="mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-xl font-medium text-transparent sm:text-2xl">
                                        CRITICAL SYSTEM FAILURE DETECTED
                                    </h2>
                                </motion.div>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="mb-12 text-gray-300"
                                >
                                    We're working to fix it
                                    <br />
                                    "We couldn’t load the information you requested. Please refresh the page or contact support."
                                </motion.p>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                                >
                                    <button onClick={RpAdmin} className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                                        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180" />
                                        Report Admin
                                    </button>
                                        <button onClick={GoHome} className="group relative flex items-center gap-2 overflow-hidden rounded-full border-2 border-purple-500/50 px-6 py-3 font-semibold text-purple-400 transition-all hover:scale-105 hover:border-pink-500 hover:text-pink-400">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <Home className="h-5 w-5" />
                                            Return
                                        </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced Scan Line Effect */}
                <div className="pointer-events-none absolute inset-0 z-20">
                    <div className="absolute left-0 top-0 h-px w-full animate-scan bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
                </div>
            </div>
        </div>
    )
}

export default ErrorPage