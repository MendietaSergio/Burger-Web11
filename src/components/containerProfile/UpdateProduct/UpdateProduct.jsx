import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ValidationAddProduct } from '../../../utils/ValidationAddProduct'
import { Message } from '../../Message/Message'
import { Title } from '../../Title/Title'
import './UpdateProduct.css'
import clearImg from '../../../Img/closed.png'
import imgDefault from '../../../Img/imgDefault.png'
import { Cloudinary } from '@cloudinary/url-gen'

// import cloudinary from "cloudinary/lib/cloudinary";

// FALTA AGREGAR DISPONIBLE, DESCUENTO
export const UpdateProduct = ({ _id, setView, setSuccess, success }) => {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm()
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingView, setLoadingView] = useState(true)
    const [categoria, setCategoria] = useState([])
    const [totalCategoria, setTotalCategoria] = useState([])
    const [showDiscount, setShowDiscount] = useState('si');
    const [valueOfert, setValueOfert] = useState()
    const [product, setProduct] = useState({})
    const [showImgViewLoad, setShowImgViewLoad] = useState(true)
    const [newImg, setNewImg] = useState(
        "http://localhost:3000/src/img/imgDefault.png"
    );
    const [imgChange, setImgChange] = useState(false)
    const changeImg = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setNewImg(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const getProductDetail = async () => {
        await axios.get(`http://localhost:3001/api/products/detail/${_id}`)
            .then(res => {
                setProduct(res.data.productDetail)
                console.log(res.data.productDetail);
                setLoadingView(false)
                if (res.data.productDetail.nombre_categoria.tipo !== '') {
                    setValue('categoria', 'Bebidas')
                }
            })
    }
    useEffect(() => {
        console.log("entra");
        getProductDetail()
    }, [_id, success])
    useEffect(() => {
        const getCategoria = async () => {
            await axios.get('http://localhost:3001/api/products/categories')
                .then(resp => {
                    let hash = {}
                    setTotalCategoria(resp.data)
                    setCategoria(resp.data.filter((current => {
                        let exists = !hash[current.nombre]
                        hash[current.nombre] = true
                        return exists
                    })))
                })
                .catch(error => console.log(error))

        }
        getCategoria()
    }, [])
    const updateProducto = async (data) => {
        console.log("data antes del axios.post=> ", data);
        // ACTUALIZAR PRODUCTO
        await axios.put(`http://localhost:3001/api/products/update/${product._id}`, { data, config })
            .then(resp => {
                if (resp.data.ok) {
                    setMessage(resp.data.msg)
                    setTimeout(() => {
                        reset()
                    }, 3000);

                } else {
                    setMessage(resp.data.msg)
                }
            })
            .finally(() => {
                setViewMessage(true)
                setSuccess(true)
                setShowImgViewLoad(true)
            })
    }
    const uploadImage = async (newData, img) => {

        // Cloudinary.v2.uploader.destoy("burger_web/g7urru3rqxbjr6aymtu2", function (error, result) {
        //     console.log(result, error);
        // })
        //     .then(resp => console.log(resp))
        // console.log("img uplaodImage=> ", img.get('img'));
        // console.log("img a eliminar uplaodImage=> ", product.img_art);


        // CARGAR IMG
        await axios
            .post("https://api.cloudinary.com/v1_1/freelance01/image/upload", img)
            .then((resp) => {
                console.log(resp);
                if (resp.status === 200) {
                    newData = {
                        ...newData,
                        img: resp.data.url,//despues sacar esto 
                        images: {
                            img: resp.data.url,
                            public_id: resp.data.public_id,
                            public_id_old: product.images.public_id
                        }
                    }
                    updateProducto(newData)
                } else {
                    console.log(resp);
                }
            });
    };
    useEffect(() => {
        setValueOfert(watch('oferta'))
    }, [watch('oferta')])
    const submit = async (data) => {
        console.log("data >= ", data);
        setLoading(true)
        let newData = {
            ...data
        }
        if (imgChange) {
            const img = new FormData();
            img.append("file", data.img[0]);
            img.append("api_key", "349254229288134");
            img.append("upload_preset", "burger_web");
            uploadImage(newData, img);
        } else {
            updateProducto(newData);
        }
        setTimeout(() => {
            setViewMessage(false)
            setSuccess(false)
            setMessage('')
            setLoading(false)
        }, 5000);
    }
    const DeleteImage = () => {
        if (showImgViewLoad) {
            setNewImg("http://localhost:3000/src/img/imgDefault.png")
            setShowImgViewLoad(false);
            setImgChange(true)
        } else {
            setNewImg(product.img_art)
            setShowImgViewLoad(true);
            setImgChange(false)
        }

    }
    return (
        <>
            {loadingView ? (
                <div className='d-flex justify-content-center align-items-center container-lodear-update '>
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submit)} className="form-addProduct">
                    <div className='row'>
                        <div className='col-12  col-md-6'>
                            <label name="nombre">Nombre del producto <small>*</small> </label>
                            <input name="nombre"
                                defaultValue={product.nombre}
                                className={errors.nombre ? ("form-control is-invalid") : ("form-control")} type="text" {...register('nombre', ValidationAddProduct.nombre)} />
                            <div className={`container-errors`}>
                                {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
                            </div>
                        </div>
                        <div className='col-6 '>
                            <label name="precio">Precio <small>*</small> </label>
                            <input name="precio" defaultValue={product.precio} type="number" className={errors.precio ? ("form-control is-invalid") : ("form-control")}  {...register('precio', ValidationAddProduct.precio)} />
                            <div className={`container-errors`}>
                                {errors.precio ? <small className='text-danger'>{errors.precio.message}</small> : null}
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
                                defaultValue={product.oferta ? 'si' : 'no'}
                                {...register("oferta", ValidationAddProduct.oferta)}
                            >
                                <option value="">Seleccione si tiene oferta</option>
                                <option Value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                            <div className={`container-errors`}>

                                {errors.oferta ? (
                                    <p className="text-danger">{errors.oferta.message}</p>
                                ) : null}
                            </div>
                        </div>
                        {showDiscount === watch('oferta') ? (
                            <div className="col-6">
                                <label htmlFor="descuento">Descuento</label>
                                <input
                                    type="number"
                                    defaultValue={product.descuento}
                                    className={
                                        errors.descuento ? "form-control is-invalid" : "form-control"
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
                        <div className='col-12  my-3'>
                            <label name="ingredientes">Ingredientes </label>
                            <input name="ingredientes"
                                defaultValue={product.ingredientes}
                                className={errors.ingredientes ? ("form-control is-invalid") : ("form-control")} type="text" {...register('ingredientes', ValidationAddProduct.ingredientes)} />
                            <div className={`container-errors`}>
                                {errors.ingredientes ? <small className='text-danger'>{errors.ingredientes.message}</small> : null}
                            </div>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className={`col-12 col-md-6 d-flex align-items-center container_img_update ${showImgViewLoad ? null : 'flex-column'}`}>
                            {showImgViewLoad ? (<>
                                <div className="prueba">

                                    <img className="img-modal" src={product.img_art} name='img' />
                                    <img src={clearImg} alt="Borrar imagen"
                                        onClick={() => DeleteImage()}
                                        className='clearImg' />
                                </div>
                            </>
                            ) : (
                                <>
                                    <div className='prueba'>
                                        <img src={newImg} alt="NewImg" className="img-modal" />
                                        <img src={clearImg} alt="Borrar imagen"
                                            onClick={() => DeleteImage()}
                                            className='clearImg' />
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
                                            onChange={(e) => changeImg(e)}
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
                        <div className='col-12 col-md-6'>
                            <div className='col-12'>
                                <label name="categoria">Categoria <small>*</small></label>
                                <select
                                    name="categoria"
                                    defaultValue={product.nombre_categoria.nombre}
                                    className={errors.categoria ? ('form-select form-control is-invalid') : ('form-select form-control')}

                                    {...register('categoria', ValidationAddProduct.categoria)}
                                >
                                    <option value="" >Seleccione la categoria</option>
                                    {categoria.map(categorie => (
                                        <option
                                            key={categorie._id}
                                            value={categorie.nombre}
                                        >{categorie.nombre}</option>
                                    ))}
                                </select>
                                <div className={`container-errors`}>
                                    {errors.categoria ? <small className='text-danger'>{errors.categoria.message}</small> : null}
                                </div>

                            </div>
                            <div className='col-12'>
                                <label name="subcategoria">Subcategoria <small>*</small></label>
                                <select
                                    name="subcategoria"
                                    defaultValue={product.nombre_categoria.categoria}
                                    className={errors.subcategoria ? ('form-select form-control is-invalid') : ('form-select form-control')}
                                    {...register('subcategoria', ValidationAddProduct.subcategoria)}
                                >
                                    <option value="" >Seleccione a subcategoria</option>
                                    {totalCategoria.filter(subCategoria => subCategoria.nombre === product.nombre_categoria.nombre).map(subcategoria => (
                                        <option
                                            key={subcategoria._id}
                                            value={subcategoria.categoria}
                                        >
                                            {subcategoria.categoria}
                                        </option>
                                    ))}
                                </select>
                                <div className={`container-errors`}>
                                    {errors.subcategoria ? <small className='text-danger'>{errors.subcategoria.message}</small> : null}
                                </div>
                            </div>
                            {watch('categoria') === 'Bebidas' ? (
                                <div className='col-12'>
                                    <label name="tipo">Tipo <small>*</small></label>
                                    <select
                                        name="tipo"
                                        defaultValue={product.nombre_categoria.tipo}
                                        className={errors.tipo ? ('form-select form-control is-invalid') : ('form-select form-control')}
                                        {...register('tipo', ValidationAddProduct.tipo)}
                                    >

                                        <option value="Con Alcohol">Con Alcohol</option>
                                        <option value="Sin Alcohol">Sin Alcohol</option>
                                    </select>
                                    <div className={`container-errors`}>
                                        {errors.subcategoria ? <small className='text-danger'>{errors.subcategoria.message}</small> : null}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className='col-12 col-md-12  my-3'>
                        <label name="descripcion">Description</label>
                        <textarea
                            name="descripcion"
                            className={errors.descripcion ? ("form-control is-invalid") : ("form-control")} type="text"
                            maxLength="500"
                            minLength="20"
                            defaultValue={product.descripcion}
                            placeholder='Deje detalles del producto...'
                            {...register('descripcion', ValidationAddProduct.descripcion)}
                        />
                        <div className={`container-errors`}>
                            {errors.descripcion ? <small className='text-danger'>{errors.descripcion.message}</small> : null}

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
                                type="checkbox"
                                name="destacado"
                                id="destacado"
                                {...register("destacado", ValidationAddProduct.destacado)}
                                defaultChecked={product.destacado}
                            />
                            <label htmlFor="destacado">Producto destacado</label>
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-around my-4'>
                        <div>
                            <button type='submit' className='btn-toRegister' >Agregar {" "}
                                {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                            </button>
                        </div>
                        <div>
                            <a type='submit' className='btn-toCancel btn-toReset' onClick={() => setView(false)} >Volver</a>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}
