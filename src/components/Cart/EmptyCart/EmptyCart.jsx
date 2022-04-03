import React from 'react'

export const EmptyCart = () => {
    return (
        <>
            
                <div className='col-12 container-textInfo'>
                    <div className='container-emptyCart'>
                        <span className='cart-line-red'></span>
                        <i class="fa-solid fa-cart-circle-xmark"></i><span>Tu carrito está vacío.</span>
                    </div>
                </div>
                <div className="col-12">
                    <div className='my-3'>
                        <button type='submit' className='btn-toProducts' >VOLVER A LA TIENDA</button>
                    </div>
                </div>
        </>
    )
}
