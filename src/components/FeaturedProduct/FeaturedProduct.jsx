import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../Title/Title'
import './featuredProduct.css'
export const FeaturedProduct = () => {
    const [showCart,setShowCart ] = useState(false)
    const [loading, setLoading] = useState (false)
    //FALTA FILTRAR POR LAS 'VISTAS' HASTA 4 ART.
    //DESPUES DE MODIFICAR LAS VISTAS DESDE EL DETALLE DEL PRODUCTO.
    const addCart = ( ) =>{
        setLoading(true)
        setTimeout(() =>{
            setShowCart(true)
            setLoading(false)
        },3000)
    }
    return (
        <>
            <Title title="Productos Destacados"/>
            <div className='container'>
                <div className='row'>

                    <div className="col-6 col-md-3">
                        <div className='container-featuredProduct my-3'>
                            <div className='container-img-featuredProduct'>
                                <img className='img-featuredProduct' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                                <div className='container-img-detail'>
                                    <h5 className='viewDetail'>Ver Detalle</h5>
                                </div>
                            </div>
                            <div className='container-info'>
                                <span className='title-categorie'>New York</span>
                                <h5 className=''>Burger WHOPBURGER</h5>
                                <span className='price'>$890,00</span>
                                <div className='btn-link' onClick={() => addCart()}>
                                    <a className='optionsLink' >Pedime Ahora {loading ? (<i className="fas fa-spinner fa-pulse"></i>):(<i className="fas fa-angle-right"></i>)}</a>
                                </div>
                                    {showCart ? (
                                        <Link className='text-danger ' to="/micarrito">Ver carrito</Link>
                                    ):(null)}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className='container-featuredProduct my-3'>
                            <div className='container-img-featuredProduct'>
                                <img className='img-featuredProduct' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                                <div className='container-img-detail'>
                                    <h5 className='viewDetail'>Ver Detalle</h5>
                                </div>
                            </div>
                            <div className='container-info'>
                                <span className='title-categorie'>New York</span>
                                <h5 className=''>Burger WHOPBURGER</h5>
                                <span className='price'>$890,00</span>
                                <div className='btn-link'>
                                    <a className='optionsLink' href="#">Pedime Ahora <i className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className='container-featuredProduct my-3'>
                            <div className='container-img-featuredProduct'>
                                <img className='img-featuredProduct' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                                <div className='container-img-detail'>
                                    <h5 className='viewDetail'>Ver Detalle</h5>
                                </div>
                            </div>
                            <div className='container-info'>
                                <span className='title-categorie'>New York</span>
                                <h5 className=''>Burger WHOPBURGER</h5>
                                <span className='price'>$890,00</span>
                                <div className='btn-link'>
                                    <a className='optionsLink' href="#">Pedime Ahora <i className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className='container-featuredProduct my-3'>
                            <div className='container-img-featuredProduct'>
                                <img className='img-featuredProduct' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                                <div className='container-img-detail'>
                                    <h5 className='viewDetail'>Ver Detalle</h5>
                                </div>
                            </div>
                            <div className='container-info'>
                                <span className='title-categorie'>New York</span>
                                <h5 className=''>Burger WHOPBURGER</h5>
                                <span className='price'>$890,00</span>
                                <div className='btn-link'>
                                    <a className='optionsLink' href="#">Pedime Ahora <i className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
