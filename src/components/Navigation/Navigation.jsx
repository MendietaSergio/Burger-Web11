import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'
export const Navigation = () => {
    return (
        <>
            <div className="container-navigation-page">
                <span className='navigation-page'>
                    <Link to="/" >Home <i className="fas fa-chevron-right"></i></Link>
                    <Link to="/productos" >Productos <i className="fas fa-chevron-right"></i></Link>

                </span>
            </div>
        </>
    )
}
