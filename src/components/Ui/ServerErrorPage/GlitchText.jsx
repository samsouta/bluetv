import React from 'react'
import { motion } from 'framer-motion';


const GlitchText = ({ text, className = '' }) => {
  return (
    <>
        <div className={`relative ${className}`}>
      <motion.span
        className="absolute left-0 text-purple-500 mix-blend-screen"
        animate={{
          x: [-2, 2, -2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute left-0 text-pink-500 mix-blend-screen"
        animate={{
          x: [2, -2, 2],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {text}
      </motion.span>
      <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        {text}
      </span>
    </div>
    </>
  )
}

export default GlitchText