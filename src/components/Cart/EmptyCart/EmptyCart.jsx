import React from 'react'
import { Link } from 'react-router-dom'

export const EmptyCart = () => {
    return (
        <>

            <div className='col-12 container-textInfo'>
                <div className='container-emptyCart'>
                    <span className='cart-line-red'></span>
                    <i className="fa-solid fa-cart-circle-xmark"></i><span>Tu carrito está vacío.</span>
                </div>
            </div>
            <div className="col-12">
                <div className='my-3'>
                    <Link to='/productos' className='btn-toProducts' >VER PRODUCTOS</Link>
                </div>
            </div>
        </>
    )
}
