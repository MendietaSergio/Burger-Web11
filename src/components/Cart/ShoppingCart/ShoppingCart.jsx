import React from 'react'
import { CartContextUse } from '../../../Context/CartContextProvider';
import './ShoppingCart.css'
export const ShoppingCart = ({ cart }) => {
    const { addItem, removeItem } = CartContextUse()
    const handleCant = (product, e) => {
        let { item } = product;
        addItem(item, Number(e.target.value))
    }
    return (

        <>
            <div className="col-12">
                <div className='row-cart-title'>
                    <span className='cart-section-title'></span>
                    <span className='cart-section-title'>Producto</span>

                    <span className='cart-section-title'>Precio</span>
                    <span className='cart-section-title'>Cantidad</span>
                    <span className='cart-section-title'>Subtotal</span>
                </div>
            </div>
            {cart.map((item, index) => (
                <div key={index}>
                    <div className='col-12'>
                        <div className="container-item-cart">
                            <div className='container-cart-section'>
                                <i className="far fa-times-circle" onClick={() => removeItem(item.item._id)}></i>
                            </div>
                            <div className='container-cart-section'>
                                <img className='cart-img' src={item.item.img_art} alt="Producto" />
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Producto:</span>
                                <span>{item.item.nombre}</span>
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Precio:</span>
                                <span>{item.item.precio},00</span>
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Cantidad:</span>
                                <input type="number" className='form-control' max={15} min={1} defaultValue={item.cantidad} onChange={(e) => handleCant(item, e)} />
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Subtotal:</span>
                                <span>${item.item.precio * item.cantidad},00</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}
