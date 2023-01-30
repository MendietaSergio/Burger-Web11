import React, { useEffect, useState } from 'react'
import { CartContextUse } from '../../../Context/CartContextProvider'
import { CartTotal } from '../CartTotal/CartTotal'
import './CartModal.css'
export const CartModal = ({ showCartList, setShowCartList }) => {
  const { cart, removeItem, clear, addItem } = CartContextUse()
  const [priceTotal, setPriceTotal] = useState(0)
  const handleCant = (product, e) => {
    let { item } = product;
    addItem(item, Number(e.target.value))
  }
  useEffect(() => {
    let sumTotal = 0;

    cart.map((element) => (sumTotal += element.item.precio * element.cantidad));
    setPriceTotal(sumTotal);
  }, [cart]);
  const hiddenCart = (select) => {
    if (select === "background") {
      setShowCartList(false);
    }
  }
  return (<>
    <div className='container-cart-widget' onClick={() => hiddenCart("none")}>

      <div className='container-cartTitle-movil my-3'>
        <h5 className='text-center'>Carrito de compras</h5>
        <i className="far fa-times-circle clear-itemCart-modal" onClick={() => setShowCartList(false)}></i>
      </div>
      {cart.length === 0 ? (
        <>
          <div className='container_cart_empty'>
            <span className='text-emptycart'>No hay productos en el carrito</span>
          </div>
        </>
      ) : (
        <>
          <div className='row row-itemCart-modal'>
            {cart.map((item, index) => (
              <div key={index} className='col-12 d-flex justify-content-between'>
                <div className='container-cartImg-modal'>
                  <img className='cart-img-modal' src={item.item.img_art} alt="Producto" />
                </div>
                <div className='flex-column d-flex container_cant_cart_widget_price'>
                  <span className='itemTitle-modal'>{item.item.nombre}</span>
                  <div className='container_cant_cart_widget'>
                    <input type="number" className='form-control input-cart-widget' max={15} min={1} defaultValue={item.cantidad} onChange={(e) => handleCant(item, e)} />
                    <div className='flex-column d-flex justify-content-center align-items-center'>
                      <span>Precio</span>
                      <span className=''> x ${item.item.precio},00</span>
                    </div>
                  </div>
                </div>
                <div className='container_subtotal_cart_widget'>
                  <div>
                    <i className="clear-itemCart-modal far fa-times-circle" onClick={() => removeItem(item.item._id)}></i>
                  </div>
                  <div className='flex-column d-flex justify-content-center align-items-end'>
                    <span>Subtotal</span>
                    <span className=''>${item.cantidad * item.item.precio},00</span>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            <CartTotal clear={clear} priceTotal={priceTotal} viewCartModal={true} setShowCartList={setShowCartList} />
          </div>
        </>
      )}
    </div >
    <div className={showCartList && 'container-shadow-cart'} onClick={() => hiddenCart("background")} >

    </div>
  </>

  )
}
