import React from 'react'
import { DetectSizeContextUse } from '../../Context/DetectSizeProvider'
import imgPort from '../../Img/logo.png'
import './PortBurger.css'
export const PortBurger = () => {
  const { widthImg } = DetectSizeContextUse()
  return (
    <div className='container_img m-auto'>
      <img width={widthImg > 768 ? '550' : '100%'} height='350' className='img_port ' src={imgPort} alt="Portada" />
    </div>
  )
}
