import React from 'react'
import { Link } from 'react-router-dom';
import { CartContextUse } from '../../../Context/CartContextProvider';
import './ShoppingCart.css'
export const ShoppingCart = ({ cart }) => {
    console.log("cart ",cart);
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
                                <Link className='viewDetail' to={`/productos/detalle/${item.item._id}`}>
                                    {item.item.oferta &&
                                        <div className='container-offertCart'>
                                            <span>{" "}-{item.item.descuento}%{" "}</span>
                                        </div>
                                    }
                                    <img className='cart-img' src={item.item.img_art} alt="Producto" />
                                </Link>
                            </div>
                            <div className='container-cart-section'>
                                <h6 className='cart-section-title'>Producto:</h6>
                                <h6>{item.item.nombre}</h6>
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Precio:</span>
                                {item.item.oferta ? (
                                    <div className='container-priceOfertCart'>
                                        <h6 className='price'><del>${item.item.precio},00</del></h6>
                                        <h2 className='priceOfert'>${item.item.precio - ((item.item.descuento / 100) * item.item.precio)},00</h2>
                                    </div>
                                ) : (<>
                                    <h2 className='price'>${item.item.precio},00</h2>
                                </>
                                )}
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Cantidad:</span>
                                <input type="number" className='form-control' max={10} min={1} defaultValue={item.cantidad} onChange={(e) => handleCant(item, e)} />
                            </div>
                            <div className='container-cart-section'>
                                <span className='cart-section-title'>Subtotal:</span>
                                <span>${item.subtotal},00</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}
