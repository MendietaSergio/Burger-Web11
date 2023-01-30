import React from 'react'
import { Link } from 'react-router-dom'
import './CartTotal.css'
export const CartTotal = ({ priceTotal, viewCartModal, clear, setShowCartList }) => {
    const deleteCart = () => {
        setShowCartList(false)
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
    if (viewCartModal) {
        return (
            <>
                <div className="col-12 container-itemcart-modal">
                    <span>Total: ${priceTotal},00</span>
                </div>
                <div className="col-12 container-btncart-modal">
                    <button type='submit' className='btn-toAccess my-2' ><Link className='btn-viewCart' to="/micarrito" onClick={() => setShowCartList(false)}>Ver carrito</Link></button>
                    <button type='submit' className='btn-toAccess my-2' onClick={() => deleteCart()} >Vaciar carrito</button>
                </div>
            </>
        )
    } else {

        return (
            <div className='col-12'>
                <div className="container-cartTotal">
                    <div className="container-cartTotal-section">
                        <h5 className=''>Total del carrito</h5>
                    </div>
                    <div className='container-cartTotal-info'>
                        <div className="">
                            <span>Total:</span>
                            <span>${priceTotal},0</span>
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

}
