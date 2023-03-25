import React, { useEffect, useState } from "react";

import { useAllProduct } from "../../hooks/useAllProduct";
import { useUpdateFeatured } from "../../hooks/useUpdateFeatured";
import { changeFeatured } from "../../utils/changeFeatured";
import { Card } from "../Container/Card/Card";
import { SkeletonCard } from "../Skeleton/SkeletonCard";
import { Title } from "../Title/Title";
import "./featuredProduct.css";

export const FeaturedProduct = ({
  viewAdmin = false,
  success,
  setSuccess,
  relatedView = false,
  productDetail,
}) => {
  const [updateProduct, setUpdateProduct] = useState([]);
  const {
    getProducts,
    loading,
    feacturedProducts,
    relatedProducts
  } = useAllProduct()
  const { sendUpdateFeatured } = useUpdateFeatured()
  useEffect(() => {
    if (relatedView) {
      getProducts({ relatedView, productDetail });
    }
    if (!relatedView) {
      getProducts({ relatedView });
    }
    setUpdateProduct([]);
  }, [relatedView, success, productDetail]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updateProduct.length > 0) {
      sendUpdateFeatured({ updateProduct, setSuccess, setUpdateProduct })
    } else {
      Swal.fire("No realizaste ningun cambio");
    }
  };
  // if (loading) return <SkeletonCard featuredProduct={true} />
  if (relatedView) {
    return (
      <>
        <div className="container my-5">
          <Title title="Productos Relacionados" />
          {relatedProducts && relatedProducts.length > 0 ? (
            <>
              <div className="featuredProduct-slider">
                {relatedProducts.map((element, index) => (
                  <div className="col-6 col-md-3 my-3" key={index}>
                    <Card
                      product={element}
                      admin={false}
                      relatedView={relatedView}
                      setSuccess={setSuccess}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : <div className="d-flex justify-content-center mx-auto p-5">
            <small className="h6">No hay productos relacionados!</small>
          </div>}
        </div>
      </>
    );
  }
  if (viewAdmin) {
    return (
      <>
        <div className="container my-5">
          {feacturedProducts.length > 0 ? (
            <>
              <Title title="Productos Destacados" />
              <div className="d-flex justify-content-end">
                <span>Cantidad: {feacturedProducts.length}</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {feacturedProducts.map((element, index) => (
                    <div className="col-6 col-md-3 px-0" key={index}>
                      <label
                        htmlFor={element._id}
                        className="d-block w-100"
                        onChange={(e) => changeFeatured(element._id, e, updateProduct, setUpdateProduct)}
                      >
                        <div
                          className="container-featuredProductUpdate my-3 form-check-label"
                          htmlFor={element._id}
                        >
                          <input
                            class="form-check-input input-featured"
                            name={element._id}
                            type="checkbox"
                            defaultChecked={element.destacado}
                            id={element._id}
                          />
                          <div className="container-img-featuredProductUpdate">
                            <img
                              className="img-featuredProductUpdate"
                              src={element.img_art}
                              alt="Burger"
                            />
                          </div>
                          <div className="container-info">
                            <span className="title-categorie">
                              {element.nombre_categoria.categoria}
                            </span>
                            <span className="title-productCard">
                              {element.nombre}
                            </span>
                            <span className="price">
                              ${element.precio},00
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success">
                    GUARDAR
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="d-flex justify-content-center mx-auto p-5">
              <small className="h6">No hay productos destacados!</small>
            </div>
          )}
        </div>
      </>
    );
  }
  if (!viewAdmin) {
    return (
      <>
        <div className="container my-5">
          <Title title="Productos Destacados" />
          <div className={`featuredProduct-slider ${feacturedProducts.length < 3 ? 'justify-content-around' : 'justify-content-between'}`}>
            {loading && <SkeletonCard featuredProduct={true} />}
            {feacturedProducts.length > 0
              ? feacturedProducts.map((element, index) => (
                <div className="col-6 col-md-3 my-3" key={index}>
                  <Card product={element} admin={false} />
                </div>
              ))
              : (
                <div className="d-flex justify-content-center mx-auto p-5">
                  <small className="h6">No hay productos destacados!</small>
                </div>
              )}
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
