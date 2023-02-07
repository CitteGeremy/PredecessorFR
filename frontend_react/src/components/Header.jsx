import React from 'react';
import { Link } from 'react-router-dom';

import predIcon from '../assets/predecessorfr.png';
import './Header.scss';

export default function Header() {
  return (
    <>
    <header className='flex items-center justify-between bg-black text-white navbar'>
        <div className='logo'>
            <Link to='/'>
                <img src={predIcon}
                className='animate-bounce w-6 h-6 predlogo' alt='logo' />
                <h2 className='font-bold text-1xl md:text-2xl lg:text-2xl uppercase ml-16' id='predfr'>Predecessor FR</h2>
            </Link>
        </div>

        <nav>
            <ul className='flex'>
            {/*    <li className='mr-5 lg:text-lg'><button><Link to="/">Accueil</Link></button></li>    */}
                <li className='text-1xl' id='navbar'><button><Link to="/actu" className='font-bold uppercase hover:text-yellow-300'>Actualités</Link></button></li>
            </ul>
        </nav>
    </header>
    </>
  )
}
