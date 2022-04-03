import React, { useState } from 'react'
import { CartTotal } from '../components/Cart/CartTotal/CartTotal'
import { EmptyCart } from '../components/Cart/EmptyCart/EmptyCart'
import { ShoppingCart } from '../components/Cart/ShoppingCart/ShoppingCart'
import { Title } from '../components/Title/Title'

import './Cart.css'
export const Cart = () => {
    const [showListCart, setShowListCart] = useState(false)
    return (
        <div className='container'>
            <div className='container-cart'>
                <div className='row'>
                    <div className='container-info-cart'>
                        <div className="col-12">
                            <Title title="Carrito" bar={false} className="text-left" />
                        </div>
                        {showListCart ? (
                            <EmptyCart />
                        ) : (
                            <>
                                <ShoppingCart />
                                <div className='col-12 d-flex justify-content-end p-3'>
                                    <button type='submit' className='btn-toAccess' >Eliminar todos</button>
                                </div>
                                <CartTotal/>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
