import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ValidationAddProduct } from "../../../utils/ValidationAddProduct";
import { Message } from "../../Message/Message";
import "./UpdateProduct.css";
import clearImg from "../../../Img/closed.png";
import { TagsInput } from "../../TagsInput/TagsInput";
import { useDetailProduct } from '../../../hooks/useDetailProduct'
import { useCategories } from "../../../hooks/useCategories";
import useUpdateProduct from "../../../hooks/useUpdateProduct";
import { useCloudinary } from "../../../hooks/useCloudinary";
import { changeImg, deleteImage } from "../../../utils/LoadImg";
export const UpdateProduct = ({ _id, setView, setSuccess, success }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [valueOfert, setValueOfert] = useState('si');
  const [viewSubmit, setViewSubmit] = useState(true)
  const [imgUpdate, setImgUpdate] = useState(null)

  const [newImg, setNewImg] = useState(
    "http://localhost:3000/src/img/imgDefault.png"
  );
  const [imgChange, setImgChange] = useState(false);
  const {
    getProductDetail,
    setTags,
    product,
    tags,
    loadingView,
  } = useDetailProduct()
  const { menuCategorie, filteredCategory } = useCategories()
  const { updateProducto,
    viewMessage,
    setViewMessage,
    message,
    setMessage,
    showImgViewLoad,
    setShowImgViewLoad } = useUpdateProduct()
  const { uploadImage } = useCloudinary()
  useEffect(() => {
    getProductDetail(_id, setValue);
  }, [_id, success]);
  useEffect(() => {
    if (product.oferta) {
      setValueOfert('si')
    } else {
      setValueOfert('no')
    }
  }, [product]);
  useEffect(() => {
    setValueOfert(watch("oferta"))
  }, [watch("oferta")]);

  const submit = async (data) => {
    setLoading(true);
    data.tags = tags;
    let newData = {
      ...data,
    };
    if (imgChange) {
      let image = data.img[0]
      uploadImage(newData, image, setSuccess, reset, imgChange, product, setImgUpdate)
    } else {
      updateProducto(newData, setSuccess, product);
      setTimeout(() => {
        setSuccess(false);
        setViewMessage(false);
        setMessage("");
        setLoading(false);
      }, 3000);
    };
  }
  useEffect(() => {
    if (imgUpdate) updateProducto(imgUpdate, setSuccess, product);
  }, [imgUpdate])
  return (
    <>
      {loadingView ? (
        <div className="d-flex justify-content-center align-items-center container-lodear-update ">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <>
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
                  defaultValue={product.nombre}
                  className={
                    errors.nombre ? "form-control is-invalid" : "form-control"
                  }
                  type="text"
                  {...register("nombre", ValidationAddProduct.nombre)}
                />
                <div className={`container-errors`}>
                  {errors.nombre ? (
                    <small className="text-danger">
                      {errors.nombre.message}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="col-6 ">
                <label name="precio">
                  Precio <small>*</small>{" "}
                </label>
                <input
                  name="precio"
                  defaultValue={product.precio}
                  type="number"
                  className={
                    errors.precio ? "form-control is-invalid" : "form-control"
                  }
                  {...register("precio", ValidationAddProduct.precio)}
                />
                <div className={`container-errors`}>
                  {errors.precio ? (
                    <small className="text-danger">
                      {errors.precio.message}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="col-6 ">
                <label htmlFor="oferta">Oferta</label>
                <select
                  name="oferta"
                  className={
                    errors.oferta ? "form-control is-invalid" : "form-control"
                  }
                  id="oferta"
                  defaultValue={product.oferta ? "si" : "no"}
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
              {valueOfert === 'si' ? (
                <div className="col-6">
                  <label htmlFor="descuento">Descuento</label>
                  <input
                    type="number"
                    defaultValue={product.descuento}
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
              <div className="col-12  my-3">
                <label name="ingredientes">Ingredientes </label>
                <TagsInput
                  addIngredients={true} name="ingredientes"
                  setViewSubmit={setViewSubmit}
                  setTags={setTags}
                  tags={tags}
                  className={"form-control"}
                />
                <div className={`container-errors`}>
                  {errors.ingredientes ? (
                    <small className="text-danger">
                      {errors.ingredientes.message}
                    </small>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row my-2">
              <div
                className={`col-12 col-md-6 d-flex align-items-center container_img_update ${showImgViewLoad ? null : "flex-column"
                  }`}
              >
                {showImgViewLoad ? (
                  <>
                    <div className="prueba">
                      <img
                        className="img-modal"
                        src={product.img_art}
                        name="img"
                      />
                      <img
                        src={clearImg}
                        alt="Borrar imagen"
                        onClick={() => deleteImage(showImgViewLoad, setShowImgViewLoad, setImgChange, setNewImg, product.img_art)}
                        className="clearImg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="prueba">
                      <img src={newImg} alt="NewImg" className="img-modal" />
                      {/* <img
                        src={clearImg}
                        alt="Borrar imagen"
                        onClick={() => deleteImage(showImgViewLoad, setShowImgViewLoad, setImgChange, setNewImg, product.img_art)}
                        className="clearImg"
                      /> */}
                    </div>
                    <label htmlFor="img">Subir imagen</label>
                    <div>
                      <input
                        {...register("img", ValidationAddProduct.img)}
                        type="file"
                        name="img"
                        accept=".png , .jpg, .jpeg"
                        className="form-control-file"
                        id="img"
                        onChange={(e) => changeImg(e.target.files[0], setValue, setNewImg)}
                      />
                    </div>
                    <div className={`container-errors`}>
                      {errors.image ? (
                        <p className="text-danger">{errors.image.message}</p>
                      ) : null}
                    </div>
                  </>
                )}
                {errors.img ? (
                  <small className="text-danger">{errors.img.message}</small>
                ) : null}
              </div>
              <div className="col-12 col-md-6">
                <div className="col-12">
                  <label name="categoria">
                    Categoria <small>*</small>
                  </label>
                  <select
                    name="categoria"
                    defaultValue={product.nombre_categoria.nombre}
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
                <div className="col-12">
                  <label name="subcategoria">
                    Subcategoria <small>*</small>
                  </label>
                  <select
                    name="subcategoria"
                    defaultValue={product.nombre_categoria.categoria}
                    className={
                      errors.subcategoria
                        ? "form-select form-control is-invalid"
                        : "form-select form-control"
                    }
                    {...register(
                      "subcategoria",
                      ValidationAddProduct.subcategoria
                    )}
                  >
                    <option value="">Seleccione a subcategoria</option>
                    {menuCategorie.length > 0 && menuCategorie
                      .filter(
                        (subCategoria) =>
                          subCategoria.nombre ===
                          product.nombre_categoria.nombre
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
                {watch("categoria") === "Bebidas" ? (
                  <div className="col-12">
                    <label name="tipo">
                      Tipo <small>*</small>
                    </label>
                    <select
                      name="tipo"
                      defaultValue={product.nombre_categoria.tipo}
                      className={
                        errors.tipo
                          ? "form-select form-control is-invalid"
                          : "form-select form-control"
                      }
                      {...register("tipo", ValidationAddProduct.tipo)}
                    >
                      <option value="Con Alcohol">Con Alcohol</option>
                      <option value="Sin Alcohol">Sin Alcohol</option>
                    </select>
                    <div className={`container-errors`}>
                      {errors.subcategoria ? (
                        <small className="text-danger">
                          {errors.subcategoria.message}
                        </small>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-12 col-md-12  my-3">
              <label name="descripcion">Description</label>
              <textarea
                name="descripcion"
                className={
                  errors.descripcion
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                maxLength="500"
                minLength="20"
                defaultValue={product.descripcion}
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
                  className="inputUpdate"
                  type="checkbox"
                  name="destacado"
                  id="destacado"
                  {...register("destacado", ValidationAddProduct.destacado)}
                  defaultChecked={product.destacado}
                />
                <label htmlFor="destacado">Producto destacado</label>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-around my-4">
              <div>
                <button type={viewSubmit ? "submit" : 'button'} className="btn-toRegister">
                  Agregar{" "}
                  {loading ? <i className="fas fa-spinner fa-pulse"></i> : null}
                </button>
              </div>
              <div>
                <a
                  type="submit"
                  className="btn-toCancel btn-toReset"
                  onClick={() => setView(false)}
                >
                  Volver
                </a>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}