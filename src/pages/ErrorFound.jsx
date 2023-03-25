import React from 'react'
import './ErrorFound.css'
import imgNotFound from '../Img/NotFound.png'
import { Link } from 'react-router-dom'
export const ErrorFound = () => {
  return (
    <div className='container'>
      <div className='container-notPages d-flex justify-content-center'>
        <h1 className='text-center my-5'>Página no encontrada</h1>
        <img className='imgNotFound my-4' src={imgNotFound} alt="notFound" />
        <ul className='list-enlaces'>
          <li><Link className="nav-link" to="/">Inicio</Link></li>
          <li><Link className="nav-link" to="/productos" >Productos</Link></li>
        </ul>
      </div>
    </div>
  )
}
