import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import videoBg from '../assets/Predecessor.mp4';

export default function Home() {

  useEffect(() => {
    document.title = `Predecessor FR`
  }, [])


  return (
    <motion.div className='body_actu' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .3 } }}>
      <video src={videoBg} autoPlay loop muted id='bg-video' />
      <section className='flex flex-col items-center justify-center text-center h-screen' id='home-sec'>
        <h1 className='uppercase font-bold text-4xl tracking-wide mb-20 md:text-5xl lg:text-7xl' id='title'>Actualités Predecessor</h1>
        <button>
          <Link to='/actu' className='animate-pulse py-2 px-6 rounded shadow text-white bg-black hover:bg-yellow-300 border 
          border-yellow-300 transition-all duration-500 hover:text-black font-bold uppercase'>Voir plus</Link>
        </button>
      </section>
    </motion.div>
  )
}
