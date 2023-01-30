import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
import deleteIcon from '../../../Img/delete.png'
import editIcon from '../../../Img/edit.png'
import axios from 'axios'
import { CartContextUse } from '../../../Context/CartContextProvider'

export const Card = ({
    product,
    admin = false,
    viewListProducts = false,
    setView,
    setIdProduct
}) => {
    const { _id, nombre, precio, nombre_categoria, img_art } = product
    const [loading, setLoading] = useState(false)
    const { addItem } = CartContextUse()
    const deleteProduct = async (_id) => {
        console.log(_id);
        // await axios
        //     .delete(`http://localhost:5000/api/eliminar-producto/${_id}`)
        //     .then((resp) => {
        //         console.log(resp);
        //     });
    };
    const viewData = (e) => {
        setView(true)
        setIdProduct(product._id)
    }

    const AddCart = (product) => {
        console.log("producto añadido => ", product);
        setLoading(true)
        addItem(product, 1)
        setTimeout(() => {
            setLoading(false)
        }, 2500)
    }
    if (viewListProducts && admin) {
        return (
            <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div className="image-parent">
                    <img src={product.img_art} className="img-fluid" alt={product.nombre} />
                </div>
                <div className="w-100 flex-column container-info">
                    <>
                        <h5>{product.nombre}</h5>
                        <p>
                            <small>{product.descripcion}</small>
                        </p>
                        <div className="container-cant">
                            <span>PRECIO</span> $ {product.precio}
                        </div>
                        <div className="container-cant">

                        </div>
                    </>
                </div>
                <div className='contianer_optonIcon'>
                    <img src={editIcon} alt="editIcon" className='optionIcon'
                        onClick={() => viewData()} />
                    <img src={deleteIcon} alt="deleteIcon" className='optionIcon' onClick={() => deleteProduct(product._id)} />
                </div>
            </div>
        )
    } else {

        return (
            <div className='container-featuredProduct my-3'>
                <div className='container-img-featuredProduct'>
                    <img className='img-featuredProduct' src={img_art} alt="Burger" height='255' />
                    <div className='container-img-detail'>
                        <Link className='viewDetail' to={`/productos/detalle/${_id}`}>Ver Detalle</Link>
                    </div>
                </div>
                <div className='container-info'>
                    <span className='title-categorie'>{nombre_categoria.categoria}</span>
                    <div className='container-info-name'>
                        <h5 className='text-center'>{nombre}</h5>
                    </div>
                    <span className='price'>${precio},00</span>
                    <div className='btn-link'>
                        <a className='optionsLink' href="#" onClick={() => AddCart(product)}>Pedime Ahora {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : (<i className="fas fa-angle-right"></i>)}</a>
                    </div>
                </div>
            </div>
        )
    }
}
