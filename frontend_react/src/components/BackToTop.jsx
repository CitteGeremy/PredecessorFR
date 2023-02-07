import React, { useState, useEffect } from 'react';
import { HiOutlineArrowUp } from "react-icons/hi";

import './BTT.scss';

const BackToTop = () => {
    const [backToTopButton, setBackToTopButton] =  useState(false);


    useEffect(() => {
        window.addEventListener('scroll', () =>{
            if(window.scrollY > 800){
                setBackToTopButton(true);
            }
            else{
                setBackToTopButton(false);
            }
        })
    }, [])


    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
    }

  return (
    <div>
        {backToTopButton && (
            <button className='BTT_button' onClick={scrollUp}><HiOutlineArrowUp className='btn_icon' id='btn_up'/></button>
        )}
    </div>
  )
}

export default BackToTop