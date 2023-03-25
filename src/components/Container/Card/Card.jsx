import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import deleteIcon from "../../../Img/delete.png";
import editIcon from "../../../Img/edit.png";
import axios from "axios";
import { CartContextUse } from "../../../Context/CartContextProvider";
import { useDeleteProducts } from "../../../hooks/useDeleteProducts";

export const Card = ({
  product,
  admin = false,
  setView,
  setSuccess,
  setIdProduct,
  relatedView = false,
}) => {
  const { _id, nombre, precio, nombre_categoria, img_art, oferta, descuento } =
    product;
  const [loading, setLoading] = useState(false);
  const { addItem, cart } = CartContextUse();
  const [cantView, setCantView] = useState(false);
  const [cant, setCant] = useState(1);
  const [update, setUpdate] = useState(false);
  const { deleteProduct } = useDeleteProducts()

  const viewData = (e) => {
    setView(true);
    setIdProduct(product._id);
  };
  useEffect(() => {
    if (cart.length > 0) {
      let foundProduct = cart.find(
        (element) => element.item._id === product._id
      );
      if (foundProduct) {
        setCant(foundProduct.cantidad);
        setCantView(true);
      }
    } else {
      setCantView(false);
      setCant(1);
    }
  }, [cart]);
  useEffect(() => {
    if (update) {
      addItem(product, Number(cant));
      setUpdate(false);
    }
  }, [update]);
  const cantSum = () => {
    setCant(cant + 1);
    setUpdate(true);
  };
  const cantRest = () => {
    setCant(cant - 1);
    setUpdate(true);
  };
  const onChangeValue = (e) => {
    setCant((cant) => parseInt(e.target.value));
    setUpdate(true);
  };
  const AddCart = (product) => {
    setLoading(true);
    addItem(product, Number(cant));
    setTimeout(() => {
      setLoading(false);
      setCantView(true);
    }, 2500);
  };
  if (!admin) {
    return (
      <div className="container-featuredProduct my-3">
        <div className="container-img-featuredProduct">
          <Link className="viewDetail" to={`/productos/detalle/${_id}`}>
            {oferta && (
              <div className="container-offert">
                <span> -{descuento}% </span>
              </div>
            )}
            <img
              className="img-featuredProduct"
              src={img_art}
              alt="Burger"
              height="255"
            />
          </Link>
        </div>
        <div className="container-info">
          <span className="title-categorie">{nombre_categoria.categoria}</span>
          <div className="container-info-name">
            <span className="title-productCard">{nombre}</span>
          </div>
          {oferta ? (
            <div className="container-priceOfert">
              <span className="price">
                <del>${precio},00</del>
              </span>
              <span className="priceOfert">
                ${precio - (descuento / 100) * precio},00
              </span>
            </div>
          ) : (
            <>
              <h2 className="price">${precio},00</h2>
            </>
          )}
          {relatedView ? (
            <div className="btn-link">
              <Link
                className="optionsLink"
                to={`/productos/detalle/${_id}`}
                onClick={() => setSuccess(false)}
              >
                Ver detalles <i className="fas fa-angle-right"></i>
              </Link>
            </div>
          ) : cantView ? (
            <div className="d-flex flex-row justify-content-center w-100">
              <button
                className="btn btn-light btnCount"
                onClick={() => cantRest()}
              >
                -
              </button>
              <input
                type="number"
                className="form-control input-changeValue"
                onChange={(e) => onChangeValue(e)}
                value={cant}
                min="1"
                max="10"
              />
              <button
                className="btn btn-light btnCount"
                onClick={() => cantSum()}
              >
                +
              </button>
            </div>
          ) : (
            <div className="btn-link">
              <button
                className="optionsLink"
                type="button"
                onClick={() => AddCart(product)}
              >
                Pedime Ahora{" "}
                {loading ? (
                  <i className="fas fa-spinner fa-pulse"></i>
                ) : (
                  <i className="fas fa-angle-right"></i>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (admin) {
    return (
      <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
        <div className="image-parent">
          <img
            src={product.img_art}
            className="img-fluid"
            alt={product.nombre}
          />
        </div>
        <div className="w-100 flex-column container-info">
          <>
            <h5>{product.nombre}</h5>
            <div className="descriptionUpdate">
              <small>{product.descripcion}</small>
            </div>
            <div className="container-cant">
              {product.oferta ? (
                <div className="container-priceOfertUpdate">
                  <span className="price">Precio: </span>
                  <span className="price">
                    <del>${product.precio},00</del>
                  </span>
                  <span className="priceOfert">
                    $
                    {product.precio -
                      (product.descuento / 100) * product.precio}
                    ,00
                  </span>
                </div>
              ) : (
                <>
                  <span className="price">Precio: </span>
                  <span className="price">${product.precio},00</span>
                </>
              )}
            </div>
            <div className="container-cant"></div>
          </>
        </div>
        <div className="contianer_optonIcon">
          <img
            src={editIcon}
            alt="editIcon"
            className="optionIcon"
            onClick={() => viewData()}
          />
          <img
            src={deleteIcon}
            alt="deleteIcon"
            className="optionIcon"
            onClick={() => deleteProduct(product._id, setSuccess)}
          />
        </div>
      </div>
    );
  }
};
