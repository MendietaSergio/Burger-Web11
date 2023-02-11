import React, { useState, useEffect } from 'react'
import { CartTotal } from '../components/Cart/CartTotal/CartTotal'
import { EmptyCart } from '../components/Cart/EmptyCart/EmptyCart'
import { ShoppingCart } from '../components/Cart/ShoppingCart/ShoppingCart'
import { Title } from '../components/Title/Title'
import { CartContextUse } from '../Context/CartContextProvider'

import './Cart.css'
export const Cart = () => {
    const [showListCart, setShowListCart] = useState(false)
    const { clear, remoteItem, cart } = CartContextUse()
    const [priceTotal, setPriceTotal] = useState(0)
    useEffect(() => {
        let sumTotal = 0;
        cart.map((element) => (sumTotal += element.item.precio * element.cantidad));
        setPriceTotal(sumTotal);
        if (cart.length === 0) {
            setShowListCart(true)
        } else {
            setShowListCart(false)
        }
    }, [cart]);
    const deleteCart = () => {
        Swal.fire({
            title: '¿Vaciarlo?',
            text: "¿Estas seguro que quieres vaciar el arrito?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, vaciar!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Vaciado!',
                    'Carrito vaciado...',
                    'success'
                )
                    .then(() => clear())
            }
        })
    }
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
                                <ShoppingCart cart={cart} />
                                <div className='col-12 d-flex justify-content-end p-3'>
                                    <button type='submit' className='btn-toAccess' onClick={() => deleteCart()} >Eliminar todos</button>
                                </div>
                                <CartTotal priceTotal={priceTotal} />
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
