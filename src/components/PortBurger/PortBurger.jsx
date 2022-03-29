import React,{ useState, useEffect }  from 'react'

import './PortBurger.css'
export const PortBurger = () => {
    // const useScreenSize = () => {
        const [ widthImg, setWidthImg] = useState(window.innerWidth)
      
        useEffect(() => {
          window.addEventListener("resize", handleResize);
      
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, [window.innerWidth]);
      
        const handleResize = () => {
          setWidthImg(window.innerWidth);
          console.log("Tamaño de la pantalla => ",widthImg);
        };
      
        // return { widthImg };
    //   };
    // useEffect(() =>{
    //     useScreenSize()
    // },[])
  return (
    <div className='container_img'>
        <img width={widthImg} height='350' className='img_port' src="https://res.cloudinary.com/freelance01/image/upload/v1648490237/burger_web/Portada_burger.2_yannxf.webp" alt="Portada" />
    </div>
  )
}
