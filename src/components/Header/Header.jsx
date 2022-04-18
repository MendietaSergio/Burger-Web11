import React, { useState, useEffect } from 'react'
import { CartModal } from '../Cart/CartModal/CartModal'
import './Header.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const Header = () => {
    const [showCartList, setShowCartList] = useState(false)
    const [menuCategorie, setMenuCategorie] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            await axios.get('http://localhost:3001/api/products/categories')
                .then((res) => {
                    setMenuCategorie(res.data)
                })
                .catch((error) => console.log(error))
                .finally(() => {
                    setLoading(true)
                    console.log("state => ", menuCategorie)
                })
        }
        getCategories()
    }, [])
    return (
        <div className='row row-header'>
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Burger</Link>

                    <div className="cart-icon-movil ml-4 my-2 my-lg-0">
                        0<i className="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
                        {
                            showCartList ? (
                                <CartModal setShowCartList={setShowCartList} showCartList={showCartList} />
                            ) : (null)}
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav d-flex justify-content-end">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Inicio </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos">Productos</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Burger's
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {loading ? (
                                        menuCategorie.filter(categories => categories.nombre === 'Burger').map(categorie => (
                                            <Link key={categorie._id} className="dropdown-item" to={`/productos/burger/${categorie.categoria}`}>{categorie.categoria}</Link>
                                        ))
                                    ) : (null)}
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/productos/burger">Ver todas</Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos/papasysalsas">Papas y salsas</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Bebidas
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {loading ? (
                                        menuCategorie.filter(categories => categories.nombre === 'Bebidas').map(categorie => (
                                            <Link key={categorie._id} className="dropdown-item" to={`/productos/bebidas/${categorie.categoria}`}>{categorie.categoria}</Link>
                                        ))
                                    ) : (null)}
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="/productos/bebidas">Ver todas</Link>
                                </div>

                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Cuenta
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/ingresar">Mi cuenta</Link>
                                    <Link className="dropdown-item" to="/micarrito">Carrito</Link>
                                </div>
                            </li>
                        </ul>
                        <div className="cart-icon ml-4 my-2 my-lg-0">
                            0<i className="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
                            {
                                showCartList ? (
                                    <CartModal setShowCartList={setShowCartList} showCartList={showCartList} />
                                ) : (null)
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}
