import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContextUse } from "../../../Context/CartContextProvider";
import { CartTotal } from "../CartTotal/CartTotal";
import "./CartModal.css";
export const CartModal = ({ showCartList, setShowCartList }) => {
  const { cart, removeItem, clear, addItem } = CartContextUse();
  const [priceTotal, setPriceTotal] = useState(0);
  const handleCant = (product, e) => {
    let { item } = product;
    addItem(item, Number(e.target.value));
  };
  useEffect(() => {
    let sumTotal = 0;
    cart.map((element) => {
      if (element.item.oferta) {
        sumTotal +=
          (element.item.precio -
            (element.item.descuento / 100) * element.item.precio) *
          element.cantidad;
      } else {
        sumTotal += element.item.precio * element.cantidad;
      }
    });
    setPriceTotal(sumTotal);
  }, [cart]);
  const hiddenCart = (select) => {
    if (select === "background") {
      setShowCartList(false);
    }
  };
  return (
    <>
      <div className="container-cart-widget" onClick={() => hiddenCart("none")}>
        <div className="container-cartTitle-movil">
          <h5 className="text-center">Carrito de compras</h5>
          <i
            className="far fa-times-circle clear-itemCart-modal"
            onClick={() => setShowCartList(false)}
          ></i>
        </div>
        {cart.length === 0 ? (
          <>
            <div className="container_cart_empty">
              <span className="text-emptycart">
                No hay productos en el carrito
              </span>
              <div className="container-btncart-modal">
                <button type="submit" className="btn-toAccess my-2">
                  <Link
                    className="btn-viewCart"
                    to="/productos"
                    onClick={() => setShowCartList(false)}
                  >
                    Ver productos
                  </Link>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="row row-itemCart-modal">
              {cart.map((item, index) => (
                <div key={index} className="col-12 container-itemCart">
                  <div className="container-cartImg-modal">
                    <Link
                      className="viewDetail"
                      to={`/productos/detalle/${item.item._id}`}
                    >
                      {item.item.oferta && (
                        <div className="container-offertCartModal">
                          <span> -{item.item.descuento}% </span>
                        </div>
                      )}
                      <img
                        className="cart-img-modal"
                        src={item.item.img_art}
                        alt="Producto"
                      />
                    </Link>
                  </div>
                  <div className="flex-column d-flex container_cant_cart_widget_price">
                    <span className="itemTitle-modal">
                      {item.item.nombre}
                    </span>
                    <div className="container_cant_cart_widget">
                      <input
                        type="number"
                        className="form-control input-cart-widget"
                        max={10}
                        min={1}
                        defaultValue={item.cantidad}
                        onChange={(e) => handleCant(item, e)}
                      />
                      <div className="flex-column d-flex justify-content-center align-items-center">
                        <div className="container-title-price text-center">
                          <span>Precio</span>
                        </div>
                        {item.item.oferta ? (
                          <div className="container-priceOfert">
                            <span className="price">x </span>
                            <span className="price px-2">
                              <del> ${item.item.precio},00</del>
                            </span>
                            <span className="priceOfert px-2">
                              $
                              {item.item.precio -
                                (item.item.descuento / 100) *
                                item.item.precio}
                              ,00
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="price">
                              x ${item.item.precio},00
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="container_subtotal_cart_widget">
                    <div className="h-100">
                      <i
                        className="clear-itemCart-modal far fa-times-circle"
                        onClick={() => removeItem(item.item._id)}
                      ></i>
                    </div>
                    <div className="flex-column d-flex justify-content-center align-items-end">
                      <span className="price ">Subtotal</span>
                      <span className="price">${item.subtotal}</span>
                    </div>
                  </div>
                </div>
              ))}
              <CartTotal
                clear={clear}
                priceTotal={priceTotal}
                viewCartModal={true}
                setShowCartList={setShowCartList}
              />
            </div>
          </>
        )}
      </div>
      <div
        className={showCartList && "container-shadow-cart"}
        onClick={() => hiddenCart("background")}
      ></div>
    </>
  );
};
