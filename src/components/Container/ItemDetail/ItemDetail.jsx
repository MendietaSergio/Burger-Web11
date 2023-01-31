import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ItemDetail.css'
import { Navigation } from '../../Navigation/Navigation'
import { SkeletonCard } from '../../Skeleton/SkeletonCard'
import { CartContextUse } from '../../../Context/CartContextProvider'
export const ItemDetail = ({ productDetail, loading }) => {
    const { addItem, cart } = CartContextUse()
    const { nombre, img_art, precio, descripcion, nombre_categoria, _id } = productDetail;
    const [loadingCart, setLoadingCart] = useState(false)
    const [cant, setCant] = useState(0);
    const [loadingNumber, setLoadingNumber] = useState(true)
    useEffect(() => {
        if (productDetail != undefined) {
            let product = cart.find(element => element.item._id === productDetail._id)
            if (product) {
                setCant(product.cantidad)
            } else {
                setCant(1)
            }
        }
        setTimeout(() => {
            setLoadingNumber(false)
        }, 5000)
    }, [productDetail, cart])
    const AddCart = (productDetail) => {
        if (!loadingNumber) {
            setLoadingCart(true)
            addItem(productDetail, Number(cant))
            setTimeout(() => {
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
                        <img className='img-detail' src={img_art} title={nombre} />
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
                                <span className='price'>${precio},00</span>
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
                                    {loadingNumber ? (
                                        <div className='container_detail-spiner'>
                                            <i class="fas fa-circle-notch fa-spin"></i>
                                        </div>
                                    ) : (
                                        <input
                                            type="number"
                                            className='form-control'
                                            onChange={(e) => setCant(e.target.value)}
                                            defaultValue={cant}
                                            min="1"
                                            max="10"
                                        />
                                    )}
                                    <div className='btn-link'>
                                        <a
                                            className='optionsLink'
                                            onClick={() => AddCart(productDetail)}
                                        >Pedime Ahora {loadingCart ? (
                                            <i className="fas fa-spinner fa-pulse"></i>
                                        ) : (
                                            <i className="fas fa-angle-right"></i>
                                        )}</a>
                                    </div>

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
