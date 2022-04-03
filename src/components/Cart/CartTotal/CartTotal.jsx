import React from 'react'
import './CartTotal.css'
export const CartTotal = () => {
    return (
        <div className='col-12'>
            <div className="container-cartTotal">
                <div className="container-cartTotal-section">
                    <h5 className=''>Total del carrito</h5>
                </div>
                <div className='container-cartTotal-info'>
                    <div className="">
                        <span>Subtotal:</span>
                        <span>$.1960,0</span>
                    </div>
                    <div className="">
                        <span>Envío:</span>
                        <span></span>
                    </div>
                    <div className="">
                        <button type='submit' className='btn-toAccess' >Finalizar compra</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
