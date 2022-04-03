import React from 'react'
import './ShoppingCart.css'
export const ShoppingCart = () => {
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
            <div className='col-12'>
                <div className="container-item-cart">
                    <div className='container-cart-section'>
                        <i class="far fa-times-circle"></i>
                    </div>
                    <div className='container-cart-section'>
                        <img className='cart-img' src="https://res.cloudinary.com/freelance01/image/upload/v1648984024/burger_web/img-prueba_lqluh4.png" alt="Producto" />
                    </div>
                    <div className='container-cart-section'>
                        <span className='cart-section-title'>Producto:</span>
                        <span>agua con gas</span>
                    </div>
                    <div className='container-cart-section'>
                        <span className='cart-section-title'>Precio:</span>
                        <span>180,00</span>
                    </div>
                    <div className='container-cart-section'>
                        <span className='cart-section-title'>Cantidad:</span>
                        <input type="number" className='form-control'value='1' />
                    </div>
                    <div className='container-cart-section'>
                        <span className='cart-section-title'>Subtotal:</span>
                        <span>$180,00</span>
                    </div>
                </div>
            </div>
        </>
    )
}
