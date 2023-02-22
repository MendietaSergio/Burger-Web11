import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemListProducts } from "../components/Container/ItemListProducts/ItemListProducts";
import { Pagination } from "../components/Container/Pagination/Pagination";
import { UpdateProduct } from "../components/containerProfile/UpdateProduct/UpdateProduct";
import { Navigation } from "../components/Navigation/Navigation";
import { SkeletonCard } from "../components/Skeleton/SkeletonCard";
import { Title } from "../components/Title/Title";
import "./filter.css";
export const Productos = ({
  admin = false,
  cantPages,
  success,
  setSuccess,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewCant, setViewCant] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage] = useState(cantPages ? 8 : 12);
  const [filter, setFilter] = useState("");
  const { idCategoria } = useParams();
  const [viewProduct, setViewProduct] = useState(true);
  const { idSubcategoria } = useParams();
  const [view, setView] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const getProducts = async () => {
    setLoading(true);
    if (idCategoria) {
      let categorie =
        idCategoria.charAt(0).toUpperCase() + idCategoria.slice(1);
      await axios
        .get(`http://localhost:3001/api/products`)
        .then((res) => {
          setProducts(
            res.data.filter(
              (idCategorie) => idCategorie.nombre_categoria.nombre === categorie
            )
          );
          setTotal(
            res.data.filter(
              (idCategorie) => idCategorie.nombre_categoria.nombre === categorie
            ).length
          );
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
          setCurrentPage(1);
        });
      if (idSubcategoria) {
        await axios
          .get(`http://localhost:3001/api/products`)
          .then((res) => {
            setProducts(
              res.data.filter(
                (idSubCategorie) =>
                  idSubCategorie.nombre_categoria.categoria === idSubcategoria
              )
            );
            setTotal(
              res.data.filter(
                (idSubCategorie) =>
                  idSubCategorie.nombre_categoria.categoria === idSubcategoria
              ).length
            );
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false);
            setCurrentPage(1);
          });
      }
    } else {
      await axios
        .get(`http://localhost:3001/api/products`)
        .then((res) => {
          setProducts(res.data);
          setTotal(res.data.length);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
          setCurrentPage(1);
        });
    }
    setViewCant(true);
  };
  useEffect(() => {
    setViewProduct(false);

    getProducts();
    setTimeout(() => {
      setViewProduct(true);
    }, 3000);
  }, [idCategoria, idSubcategoria]);
  useEffect(() => {
    getProducts();
  }, [success]);

  //FILTROS
  useEffect(() => {
    TopToLow(filter);
    setLoading(false);
    setFilter("");
  }, [filter]);

  //PAGINACION
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //FUNCION PARA DEFITIR TIPO DE FILTRO
  const TopToLow = (filter) => {
    setLoading(true);
    if (filter === "Ordenar por precios altos") {
      const newProduct = products.sort(function (a, b) {
        return b.precio - a.precio;
      });
      setProducts(newProduct);
    }
    if (filter === "Ordenar por precios bajos") {
      const newProduct = products.sort(function (a, b) {
        return a.precio - b.precio;
      });
      setProducts(newProduct);
    }
    if (filter === "Ordenar por los últimos") {
      const newProduct = products.sort(function (a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return d - c;
      });
      setProducts(newProduct);
    }
    if (filter === "Ordenar por popularidad") {
      const newProduct = products.sort(function (a, b) {
        return b.vistas - a.vistas;
      });
      setProducts(newProduct);
    }
    if (filter === "Ordenar alfabeticamente") {
      const newProduct = products.sort(function (a, b) {
        return a.nombre.localeCompare(b.nombre);
      });
      setProducts(newProduct);
    }
    paginate(1);
  };
  let indexOfLastPost = currentPage * productsPage;
  let indexOfFirstPost = indexOfLastPost - productsPage;
  let currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  if (admin === true) {
    return (
      <div className="container">
        <Title title={view ? "Actualizar producto" : "Productos"} />
        {view ? (
          <>
            <div className="back_icon" onClick={() => setView(false)}>
              <i className="fas fa-arrow-left "></i>
            </div>
            <UpdateProduct
              _id={idProduct}
              setView={setView}
              setSuccess={setSuccess}
              success={success}
            />
          </>
        ) : (
          <>
            <div className="row">
              {viewProduct ? (
                <ItemListProducts
                  products={currentProducts}
                  loading={loading}
                  admin={true}
                  setView={setView}
                  setIdProduct={setIdProduct}
                  setSuccess={setSuccess}
                />
              ) : (
                <SkeletonCard viewListProduct={true} />
              )}
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center my-2">
                <Pagination
                  loading={loading}
                  productsPage={productsPage}
                  viewProducts={true}
                  totalProducts={products.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  if (admin === false) {
    return (
      <div className="container">
        <Navigation />
        <Title title="Productos" />
        <div className="row result-filter">
          <div className="col-12 col-md-6">
            {viewCant ? (
              <span>
                Mostrando 1 -{" "}
                {currentProducts === undefined ? null : (
                  <span>{currentProducts.length}</span>
                )}{" "}
                de {total} resultados
              </span>
            ) : null}
          </div>
          <div className="col-12 col-md-6 selectFilter">
            <select
              name="filter"
              className="optionsFilter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option className="selectOptions">Ordenar por precios bajos</option>
              <option className="selectOptions">Ordenar por precios altos</option>
              <option className="selectOptions">Ordenar por popularidad</option>
              <option className="selectOptions">Ordenar alfabeticamente</option>
              <option className="selectOptions">Ordenar por los últimos</option>
            </select>
          </div>
        </div>
        <div className="row">
          {viewProduct ? (
            <ItemListProducts products={currentProducts} loading={loading} />
          ) : (
            <SkeletonCard product={true} />
          )}
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center my-2">
            <Pagination
              loading={loading}
              productsPage={productsPage}
              totalProducts={products.length}
              paginate={paginate}
              viewProducts={true}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
