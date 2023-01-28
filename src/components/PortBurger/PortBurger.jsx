import React from 'react'

import './PortBurger.css'
export const PortBurger = ({ widthImg }) => {
  return (
    <div className='container_img'>
      <img width={widthImg} height='350' className='img_port' src="https://res.cloudinary.com/freelance01/image/upload/v1648490237/burger_web/Portada_burger.2_yannxf.webp" alt="Portada" />
    </div>
  )
}
