import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ValidationAddProduct } from '../../../utils/ValidationAddProduct'
import { Message } from '../../Message/Message'
import { Title } from '../../Title/Title'
import './UpdateProduct.css'
import clearImg from '../../../Img/closed.png'
// FALTA AGREGAR DISPONIBLE, DESCUENTO
export const UpdateProduct = ({ _id, view, setView }) => {
    const { register, handleSubmit, reset, formState: { errors }, watch, setValue, getValues } = useForm()
    const [viewMessage, setViewMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingView, setLoadingView] = useState(true)
    const [success, setSuccess] = useState(false)
    const [categoria, setCategoria] = useState([])
    const [totalCategoria, setTotalCategoria] = useState([])
    const [showDiscount, setShowDiscount] = useState('si');
    const [valueOfert, setValueOfert] = useState()
    const [product, setProduct] = useState({})
    const [showImgViewLoad, setShowImgViewLoad] = useState(true)
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    useEffect(() => {

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
        getProductDetail()
    }, [_id])
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
    // useEffect(() => {
    //     setValue('nombre', product.nombre)
    //     setValue('precio', product.precio)
    //     setValue('oferta', product.oferta ? 'si' : 'no')
    //     setValue('subcategoria', product.nombre_categoria.categoria)
    //     setValue('categoria', product.nombre_categoria.nombre)
    // }, [])
    const updateProducto = async (data) => {
        await axios.post('http://localhost:3001/api/products/new', { data, config })
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
            })
    }
    const uploadImage = async (newData, img) => {
        await axios
            .post("https://api.cloudinary.com/v1_1/freelance01/image/upload", img)
            .then((resp) => {
                if (resp.status === 200) {
                    newData = {
                        ...newData,
                        img: resp.data.url
                    }
                    sendProducto(newData)
                } else {
                    console.log(resp);
                }
            });
    };
    useEffect(() => {
        setValueOfert(watch('oferta'))
        // setValueOfert(watch('oferta'))
    }, [watch('oferta')])
    // useEffect(() => {
    //     setCate(watch('categoria'))
    // }, [watch('categoria')])
    // useEffect(() => {
    //     setSubCate(watch('subcategoria'))
    // }, [watch('subcategoria')])
    const submit = async (data) => {
        console.log(data);
        setLoading(true)
        let newData = {
            ...data
        }
        // const img = new FormData();
        // img.append("file", data.img[0]);
        // img.append("api_key", "349254229288134");
        // img.append("upload_preset", "burger_web");
        // uploadImage(newData, img)
        setTimeout(() => {
            setViewMessage(false)
            setSuccess(false)
            setMessage('')
            setLoading(false)
        }, 5000);
    }
    console.log(getValues('nombre'));

    return (
        <>
            {loadingView ? (
                <div className='d-flex justify-content-center align-items-center container-lodear-update '>
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submit)} className="form-login">
                    <div className='row'>
                        <div className='col-12  col-md-6'>
                            <label name="nombre">Nombre del producto <small>*</small> </label>
                            <input name="nombre"
                                defaultValue={product.nombre}
                                className={errors.nombre ? ("form-control is-invalid") : ("form-control")} type="text" {...register('nombre', ValidationAddProduct.nombre)} />
                            {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
                        </div>
                        <div className='col-6 '>
                            <label name="precio">Precio <small>*</small> </label>
                            <input name="precio" defaultValue={product.precio} type="number" className={errors.precio ? ("form-control is-invalid") : ("form-control")}  {...register('precio', ValidationAddProduct.precio)} />
                            {errors.precio ? <small className='text-danger'>{errors.precio.message}</small> : null}
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
                            {errors.oferta ? (
                                <p className="text-danger">{errors.oferta.message}</p>
                            ) : null}
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
                                {errors.descuento ? (
                                    <p className="text-danger">{errors.descuento.message}</p>
                                ) : null}
                            </div>
                        ) : null}
                        <div className='col-12  my-3'>
                            <label name="ingredientes">Ingredientes </label>
                            <input name="ingredientes"
                                defaultValue={product.ingredientes}
                                className={errors.ingredientes ? ("form-control is-invalid") : ("form-control")} type="text" {...register('ingredientes', ValidationAddProduct.ingredientes)} />
                            {errors.ingredientes ? <small className='text-danger'>{errors.ingredientes.message}</small> : null}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-12 col-md-6 d-flex align-items-center container_img_update'>
                            {/* <label htmlFor="img">Subir imagen</label>
                        <div>
                            <input
                                {...register("img", ValidationAddProduct.img)}
                                type="file"
                                name="img"
                                accept=".png , .jpg, .jpeg"
                                className="form-control-file"
                                id="img"
                            />
                        </div> */}
                            {showImgViewLoad ? (<>
                                <img className="img-modal" src={product.img_art} name='img' />
                                <img src={clearImg} alt="Borrar imagen" className='clearImg'/>
                                {/* <AiOutlineCloseCircle
                                className="iconClose-img"
                                onClick={() => DeleteImage()}
                            /> */}
                            </>
                            ) : (
                                <div className="form-group my-3">
                                    <img src={newImg} alt="NewImg" className="img-modal" />
                                    <label htmlFor="img">Subir imagen</label>
                                    <div>
                                        <input
                                            {...register("img", ValidationAddProduct.img)}
                                            type="file"
                                            name="img"
                                            accept=".png , .jpg, .jpeg"
                                            className="form-control-file"
                                            id="img"
                                        // onChange={(e) => changeImg(e)}
                                        />
                                    </div>
                                    {errors.image ? (
                                        <p className="text-danger">{errors.image.message}</p>
                                    ) : null}
                                </div>
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
                                {errors.categoria ? <small className='text-danger'>{errors.categoria.message}</small> : null}

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
                                {errors.subcategoria ? <small className='text-danger'>{errors.subcategoria.message}</small> : null}
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
                                    {errors.subcategoria ? <small className='text-danger'>{errors.subcategoria.message}</small> : null}
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
                        {errors.descripcion ? <small className='text-danger'>{errors.descripcion.message}</small> : null}
                    </div>
                    <div className="form-group">
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