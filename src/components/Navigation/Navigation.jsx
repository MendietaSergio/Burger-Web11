import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'
export const Navigation = ({ categoria, tipo }) => {
    console.log("categoria navigation ", categoria);
    return (
        <>
            <div className="container-navigation-page">
                <span className='navigation-page'>
                    <Link to="/" >Home <i className="fas fa-chevron-right"></i></Link>
                    <Link to="/productos" >Productos <i className="fas fa-chevron-right"></i></Link>
                    {categoria === undefined ? (null) : (
                        <Link to={`/productos/${categoria}`} >{categoria}</Link>
                    )}
                    {tipo === undefined ? (null) : (
                        <Link to={`/productos/${categoria}/${tipo}`} ><i className="fas fa-chevron-right"></i> {tipo}</Link>
                    )}
                </span>
            </div>
        </>
    )
}
