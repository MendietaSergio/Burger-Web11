import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ItemDetail.css'
import { Navigation } from '../../Navigation/Navigation'
import { SkeletonCard } from '../../Skeleton/SkeletonCard'
import { CartContextUse } from '../../../Context/CartContextProvider'
export const ItemDetail = ({ productDetail, loading, success }) => {
    const { addItem, cart } = CartContextUse()
    const { nombre, img_art, precio, descripcion, nombre_categoria, _id, oferta, descuento } = productDetail;
    const [loadingCart, setLoadingCart] = useState(false)
    const [cant, setCant] = useState(1);
    const [cantView, setCantView] = useState(false)
    const [update, setUpdate] = useState(false)
    const { idDetail } = useParams()
    const [loadingNumber, setLoadingNumber] = useState(true)
    useEffect(() => {
        if (productDetail != undefined) {
            let product = cart.find(element => element.item._id === idDetail)
            if (product) {
                setCant(product.cantidad)
                setCantView(true)
            } else {
                setCantView(false)
                setCant(1)
            }
        }
        setTimeout(() => {
            setLoadingNumber(false)
        }, 2000)
    }, [productDetail, cart, success])
    useEffect(() => {
        if (update) {
            addItem(productDetail, Number(cant))
            setUpdate(false)
        }
    }, [update])
    const cantSum = () => {
        if (cant < 15) {
            setCant(cant + 1)
            setUpdate(true)
        }
    }
    const cantRest = () => {
        if (cant > 1) {
            setCant(cant - 1)
            setUpdate(true)
        }
    }
    const onChangeValue = (e) => {
        setCant((cant) => parseInt(e.target.value));
        setUpdate(true)

    };
    const AddCart = (productDetail) => {
        if (!loadingNumber) {
            setLoadingCart(true)
            addItem(productDetail, Number(cant))
            setTimeout(() => {
                setCantView(true)
                setLoadingCart(false)
            }, 2500)
        }
    }
    return (
        <div className='container my-5'>
            <div className='row'>

                <div className="col-12 col-md-6">
                    {loading ? (
                        <SkeletonCard skeletonImg={true} className="image-detail" />
                    ) : (
                        <>
                            {oferta &&
                                <div className='container-offertDetail'>
                                    <span>{" "}-{descuento}%{" "}</span>
                                </div>
                            }
                            <img className='img-detail' src={img_art} title={nombre} />
                        </>
                    )}
                </div>
                <div className="col-12 col-md-6">
                    {loading ? (
                        <SkeletonCard skeletonDetail={true} />
                    ) : (
                        <>

                            <div className='detail-info'>

                                <Navigation
                                    categoria={nombre_categoria.nombre}
                                    tipo={nombre_categoria.tipo}
                                />
                                <h5 className=''>{nombre}</h5>
                                {/* <span className='price'>${precio},00</span> */}
                                {oferta ? (
                                    <div className='container-priceOfert'>
                                        <h6 className='price'><del>${precio},00</del></h6>
                                        <h2 className='priceOfert'>${precio - ((descuento / 100) * precio)},00</h2>
                                    </div>
                                ) : (<>
                                    <h2 className='price'>${precio},00</h2>
                                </>
                                )
                                }
                                {/* FALTA MOSTRAR LA DESCRIPCION, SACANDO LA INFO Y PASANDOLA COMO ARRAY PARA IR MOSTRANDO UNA LISTA */}
                                <div className='detail-list'>
                                    <ul>
                                        <li>mac cheese</li>
                                        <li>panceta</li>
                                        <li>salsa bbq</li>
                                        <li>200g de carne</li>
                                        <li>deep fried</li>
                                    </ul>
                                </div>
                                <span className='detail-categorie'>{descripcion}</span>
                                <div className='d-flex justify-content-center'>
                                    {cantView ? (
                                        <div className='d-flex flex-row justify-content-center w-100'>
                                            <button className='btn btn-light btnCount' onClick={() => cantRest()}>-</button>
                                            <input
                                                type="number"
                                                className='form-control input-changeValue'
                                                onChange={(e) => onChangeValue(e)}
                                                value={cant}
                                                min="1"
                                                max="15"
                                            />
                                            <button className='btn btn-light btnCount' onClick={() => cantSum()}>+</button>

                                        </div>
                                    ) : (
                                        <div className='btn-link'>
                                            <a
                                                className='optionsLink'
                                                onClick={() => AddCart(productDetail)}
                                            >Pedime Ahora {loadingCart ? (
                                                <i className="fas fa-spinner fa-pulse"></i>
                                            ) : (
                                                <i className="fas fa-angle-right"></i>
                                            )}
                                            </a>
                                        </div>
                                    )}


                                </div>
                            </div>
                            <hr />
                            <span>Categoría: <Link to={`/productos/${nombre_categoria.nombre}/${nombre_categoria.categoria}`} className='detail-subItem'>{nombre_categoria.categoria}</Link></span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
