import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Title } from '../Title/Title'
import './featuredProduct.css'
export const FeaturedProduct = ({
    viewAdmin = false,
    success,
    setSuccess
}) => {
    const [showCart, setShowCart] = useState(false)
    const [loading, setLoading] = useState(false)
    const [updateProduct, setUpdateProduct] = useState([])
    const [feacturedProducts, setFeaturedProducts] = useState([])
    const getProducts = async () => {
        setLoading(true)
        await axios.get(`http://localhost:3001/api/products`)
            .then(res => {
                setFeaturedProducts(res.data.filter(item => item.destacado === true))
            })
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        getProducts()
        setUpdateProduct([])
    }, [success])
    useEffect(() => {
        setUpdateProduct([])
    }, [])
    const addCart = (e) => {
        setLoading(true)
        setTimeout(() => {
            setShowCart(true)
            setLoading(false)
        }, 3000)
    }
    const changeFeatured = (item, e) => {
        if (updateProduct.length === 0) {
            setUpdateProduct([...updateProduct, { _id: item, status: e.target.checked }])
        }
        else {
            updateProduct.map(element => {
                if (element._id !== item) {
                    return setUpdateProduct([...updateProduct, { _id: item, status: e.target.checked }])
                }
            })
            updateProduct.map(element => {
                if (element._id === item && element.status === false) {
                    let prev = updateProduct.filter(product => product._id != item)
                    return setUpdateProduct(prev)
                }
            })
        }
    }
    const config = {
        headaers: {
            "Content-Type": "multipart/form-data",
        },
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (updateProduct.length > 0) {
            setSuccess(false)
            Swal.fire({
                title: '¿Avanzar?',
                text: "¿Estas seguro que quieres sacarlo de la sección 'Destacados'?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, sacarlo!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.put('http://localhost:3001/api/products/updateFeatureProduct', { updateProduct, config })
                        .then(resp => {
                            setSuccess(true)
                            Swal.fire(
                                'Listo!',
                                `${resp.data.msg}`,
                                'success'
                            )
                        })
                }
            })
        } else {
            Swal.fire('No realizaste ningun cambio')
        }
    }
    if (viewAdmin) {
        return (
            <>
                <div className='container my-5'>
                    {feacturedProducts.length > 0 ? (
                        <>
                            <Title title="Productos Destacados" />
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    {loading ? (<span>Cargando...</span>) : (
                                        feacturedProducts.map((element, index) => (
                                            <div className="col-6 col-md-3" key={index}>
                                                <label htmlFor={element._id} className="d-block"
                                                    onChange={(e) => changeFeatured(element._id, e)}
                                                >
                                                    <div className='container-featuredProduct my-3 form-check-label' htmlFor={element._id}>
                                                        <input class="form-check-input input-featured" name={element._id} type="checkbox" defaultChecked={element.destacado} id={element._id} />
                                                        <div className='container-img-featuredProduct'>
                                                            <img className='img-featuredProduct' src={element.img_art} alt="Burger" />
                                                        </div>
                                                        <div className='container-info'>
                                                            <span className='title-categorie'>{element.nombre_categoria.categoria}</span>
                                                            <h5 className='title-productCard'>{element.nombre}</h5>
                                                            <span className='price'>${element.precio},00</span>
                                                        </div>
                                                    </div>
                                                </label>

                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type='submit' className='btn btn-success'>GUARDAR</button>
                                </div>
                            </form>

                        </>
                    ) : (<h1 className='text-center'>No hay productos destacados!</h1>)}
                </div>
            </>
        )
    } if (!viewAdmin) {

        return (
            <>
                <div className='container my-5'>
                    <Title title="Productos Destacados" />
                    <div className='featuredProduct-slider'>
                        {feacturedProducts.length > 0 ? (
                            feacturedProducts.map((element, index) => (
                                <div className="col-6 col-md-3" key={index}>
                                    <div className='container-featuredProduct my-3'>
                                        <div className='container-img-featuredProduct'>
                                            <img className='img-featuredProduct' src={element.img_art} alt="Burger" />
                                            <div className='container-img-detail'>
                                                <h5 className='viewDetail'>Ver Detalle</h5>
                                            </div>
                                        </div>
                                        <div className='container-info'>
                                            <span className='title-categorie'>{element.nombre_categoria.categoria}</span>
                                            <h5 className='title-productCard'>{element.nombre}</h5>
                                            <span className='price'>${element.precio},00</span>
                                            <div className='btn-link' onClick={() => addCart()}>
                                                <a className='optionsLink' >Pedime Ahora {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : (<i className="fas fa-angle-right"></i>)}</a>
                                            </div>
                                            {showCart ? (
                                                <Link className='text-danger ' to="/micarrito">Ver carrito</Link>
                                            ) : (null)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (null)}

                    </div>
                </div>

            </>
        )
    }
    else {
        return null
    }
}
