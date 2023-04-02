import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { useCloudinary } from "../../../hooks/useCloudinary";
import { useProducts } from "../../../hooks/useProducts";
import { changeImg } from "../../../utils/LoadImg";
import { ValidationAddProduct } from "../../../utils/ValidationAddProduct";
import { Message } from "../../Message/Message";
import { TagsInput } from "../../TagsInput/TagsInput";
import { Title } from "../../Title/Title";
import "./AddProduct.css";
const VITE_API_KEY = import.meta.env.VITE_API_KEY
const VITE_UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
export const AddProduct = ({ setSuccess, success }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const [viewSubmit, setViewSubmit] = useState(true)
  const [showDiscount, setShowDiscount] = useState("si");
  const { filteredCategory, menuCategorie } = useCategories()
  const { uploadImage, loading,
    message,
    viewMessage,
    setViewMessage,
    setMessage,
    setTags,
    setLoading,
    tags } = useCloudinary()
  const submit = async (data, e) => {
    data.tags = tags;
    let image = data.img[0]
    let newData = {
      ...data,
    };
    setLoading(true)
    uploadImage(newData, image, setSuccess, reset);
    setTimeout(() => {
      setViewMessage(false);
      setSuccess(false);
      setMessage("");
    }, 5000);
  };
  return (
    <>
      <div className="container-form">
        <Title title={"Nuevo producto"} bar={false} />
        <div className="container-message-addProduct">
          {viewMessage ? (
            <Message
              message={message}
              viewMessage={viewMessage}
              setViewMessage={setViewMessage}
              className={success ? "alert-success" : "alert-danger"}
            />
          ) : null}
        </div>
        <form onSubmit={handleSubmit(submit)} className="form-addProduct">
          <div className="row">
            <div className="col-12  col-md-6">
              <label name="nombre">
                Nombre del producto <small>*</small>{" "}
              </label>
              <input
                name="nombre"
                className={
                  errors.nombre ? "form-control is-invalid" : "form-control"
                }
                type="text"
                {...register("nombre", ValidationAddProduct.nombre)}
              />
              <div className={`container-errors`}>
                {errors.nombre ? (
                  <small className="text-danger">{errors.nombre.message}</small>
                ) : null}
              </div>
            </div>
            <div className="col-12  col-md-6">
              <label name="precio">
                Precio <small>*</small>{" "}
              </label>
              <input
                name="precio"
                type="number"
                className={
                  errors.precio ? "form-control is-invalid" : "form-control"
                }
                {...register("precio", ValidationAddProduct.precio)}
              />
              <div className={`container-errors`}>
                {errors.precio ? (
                  <small className="text-danger">{errors.precio.message}</small>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="oferta">Oferta</label>
              <select
                name="oferta"
                className={
                  errors.oferta ? "form-control is-invalid" : "form-control"
                }
                id="oferta"
                {...register("oferta", ValidationAddProduct.oferta)}
              >
                <option value="">Seleccione si tiene oferta</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>
              <div className={`container-errors`}>
                {errors.oferta ? (
                  <p className="text-danger">{errors.oferta.message}</p>
                ) : null}
              </div>
            </div>
            {showDiscount === watch("oferta") ? (
              <div className="col-12 col-md-6">
                <label htmlFor="descuento">Descuento</label>
                <input
                  type="number"
                  className={
                    errors.descuento
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="descuento"
                  name="descuento"
                  min="0"
                  placeholder="Descuento"
                  {...register("descuento", ValidationAddProduct.descuento)}
                />
                <div className={`container-errors`}>
                  {errors.descuento ? (
                    <p className="text-danger">{errors.descuento.message}</p>
                  ) : null}
                </div>
              </div>
            ) : null}
            <div className="col-12">
              <label name="ingredientes">Ingredientes </label>
              <TagsInput addIngredients={true} name="ingredientes"
                setViewSubmit={setViewSubmit}
                setTags={setTags}
                tags={tags}
                className={"form-control"} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 ">
              <label name="categoria">
                Categoria <small>*</small>
              </label>
              <select
                name="categoria"
                className={
                  errors.categoria
                    ? "form-select form-control is-invalid"
                    : "form-select form-control"
                }
                {...register("categoria", ValidationAddProduct.categoria)}
              >
                <option value="">Seleccione la categoria</option>
                {filteredCategory.length > 0 && filteredCategory.map((categorie) => (
                  <option key={categorie._id} value={categorie.nombre}>
                    {categorie.nombre}
                  </option>
                ))}
              </select>
              <div className={`container-errors`}>
                {errors.categoria ? (
                  <small className="text-danger">
                    {errors.categoria.message}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="col-12 col-md-6 ">
              <label name="subcategoria">
                Subcategoria <small>*</small>
              </label>
              <select
                name="subcategoria"
                className={
                  errors.subcategoria
                    ? "form-select form-control is-invalid"
                    : "form-select form-control"
                }
                {...register("subcategoria", ValidationAddProduct.subcategoria)}
              >
                <option value="">Seleccione a subcategoria</option>
                {menuCategorie.length > 0 && menuCategorie
                  .filter(
                    (subCategoria) => subCategoria.nombre === watch("categoria")
                  )
                  .map((subcategoria) => (
                    <option
                      key={subcategoria._id}
                      value={subcategoria.categoria}
                    >
                      {subcategoria.categoria}
                    </option>
                  ))}
              </select>
              <div className={`container-errors`}>
                {errors.subcategoria ? (
                  <small className="text-danger">
                    {errors.subcategoria.message}
                  </small>
                ) : null}
              </div>
            </div>
            {watch("categoria") === "Bebidas" && (
              <div className="col-12 col-md-6 ">
                <label name="tipo">
                  Tipo <small>*</small>
                </label>
                <select
                  name="tipo"
                  className={
                    errors.tipo
                      ? "form-select form-control is-invalid"
                      : "form-select form-control"
                  }
                  {...register("tipo", ValidationAddProduct.tipo)}
                >
                  <option value="">Seleccione tipo</option>
                  <option value="Sin alchocol">Sin alchocol</option>
                  <option value="Con alchocol">Con alchocol</option>
                </select>
                <div className={`container-errors`}>
                  {errors.subcategoria ? (
                    <small className="text-danger">
                      {errors.subcategoria.message}
                    </small>
                  ) : null}
                </div>
              </div>
            )}
          </div>
          <div className="col-12 col-md-12">
            <label htmlFor="img">Subir imagen</label>
            <div>
              <input
                {...register("img", ValidationAddProduct.img)}
                type="file"
                name="img"
                accept=".png , .jpg, .jpeg"
                onChange={(e) => changeImg(e.target.files[0], setValue)}
                className="form-control-file"
                id="img"
              />
            </div>
            <div className={`container-errors`}>
              {errors.img ? (
                <small className="text-danger">{errors.img.message}</small>
              ) : null}
            </div>
          </div>
          <div className="col-12 col-md-12">
            <label name="descripcion">Description</label>
            <textarea
              name="descripcion"
              className={
                errors.descripcion ? "form-control is-invalid" : "form-control"
              }
              type="text"
              maxLength="500"
              minLength="20"
              placeholder="Deje detalles del producto..."
              {...register("descripcion", ValidationAddProduct.descripcion)}
            />
            <div className={`container-errors`}>
              {errors.descripcion ? (
                <small className="text-danger">
                  {errors.descripcion.message}
                </small>
              ) : null}
            </div>
          </div>
          <div className="d-flex justify-content-around form-group flex-row align-center">
            <div className="form-check m-3">
              <input
                className={
                  errors.disponible
                    ? "form-check-input is-invalid"
                    : "form-check-input"
                }
                type="checkbox"
                name="disponible"
                id="disponible"
                defaultChecked={true}
                {...register("disponible", ValidationAddProduct.disponible)}
              />
              <label htmlFor="disponible">Producto disponible</label>
            </div>
            <div className="form-check m-3">
              <input
                className={
                  errors.disponible
                    ? "form-check-input is-invalid"
                    : "form-check-input"
                }
                type="checkbox"
                name="destacado"
                id="destacado"
                {...register("destacado", ValidationAddProduct.destacado)}
                defaultChecked={false}
              />
              <label htmlFor="destacado">Producto destacado</label>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-around my-4">
            <div>
              <button type={viewSubmit ? 'submit' : 'button'} className="btn-toRegister">
                Agregar{" "}
                {loading ? <i className="fas fa-spinner fa-pulse"></i> : null}
              </button>
            </div>
            <div>
              <a
                type="button"
                className="btn-toCancel btn-toReset"
                onClick={() => reset()}
              >
                Reiniciar
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};