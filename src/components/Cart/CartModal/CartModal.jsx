import React, { useState } from 'react'
import './CartModal.css'
export const CartModal = ({ showCartList, setShowCartList }) => {
  const [preview, setPreview] = useState(false)

  return (
    <div className='container-cart-widget'>
      <div className='container-cartTitle-movil my-3'>
        <h5 className='text-center'>Carrito de compras</h5>
        <i class="far fa-times-circle" onClick={() => setShowCartList(!showCartList)}></i>
      </div>
      {preview ? (
        <>
          <div className='d-flex justify-content-center'>
            <span className='text-emptycart'>No hay productos en el carrito</span>
          </div>
        </>
      ) : (
        <>
          <div className='row row-itemCart-modal'>
            <div className='col-12 d-flex justify-content-around'>
              <div className='container-cartImg-modal'>
                <img className='cart-img-modal' src="https://res.cloudinary.com/freelance01/image/upload/v1648984024/burger_web/img-prueba_lqluh4.png" alt="Producto" />
              </div>
              <div className='flex-column d-flex'>
                <span className='itemTitle-modal'>Burger WHOPBURGER</span>
                <span className=''>1 x $890,00</span>
              </div>
              <div>
                <i className="clear-itemCart-modal far fa-times-circle"></i>
              </div>
            </div>
            <div className="col-12 container-itemcart-modal">
              <span>Subtotal: $6.230,00</span>
            </div>
            <div className="col-12 container-btncart-modal">
              <button type='submit' className='btn-toAccess my-2' >Ver carrito</button>
              <button type='submit' className='btn-toAccess my-2' >Finalizar compra</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
