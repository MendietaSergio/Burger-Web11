import React, { useState, useEffect, useContext } from 'react'
import { CartModal } from '../Cart/CartModal/CartModal'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'
import { types } from '../../Types/Types'
import { CartContextUse } from '../../Context/CartContextProvider'
import { DetectSizeContextUse } from '../../Context/DetectSizeProvider'
import { useCategories } from '../../hooks/useCategories'

import './Header.css'
export const Header = ({ edit = false, viewImg, imgChange, dataConfig, viewTitleLogo, viewText }) => {
    const [showCartList, setShowCartList] = useState(false)
    const { user, dispatch } = useContext(AuthContext)
    const { widthImg } = DetectSizeContextUse()
    const [cantCart, setCantCart] = useState(0)
    const { nombre } = user;
    const { cart } = CartContextUse()
    const { menuCategorie, loading } = useCategories();
    useEffect(() => {
        setCantCart(cart.length)
    }, [cart])
    const handleLogout = () => {
        dispatch({
            type: types.logout,
            payload: null
        })
        JSON.parse(localStorage.getItem('userBurger')) || {
            logueado: false
        }
    }
    if (edit) {
        return (
            <div className='row row-header'>
                <div className='container'>
                    <nav className="navbar navbar-expand-md navbar-light bg-light">
                        {edit ? (
                            viewTitleLogo ? (<img className='imgLogo' src={viewImg} title="logo" />) : ((<Link className="navbar-brand" to="/">{viewText}</Link>))
                        ) : (null)}

                        <div className="cart-icon-movil2 ml-4 my-2 my-lg-0">
                            0<i className="fas fa-shopping-cart"></i>
                        </div>
                        <button className="navbar-toggler2" type="button">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse font-header-edit navbar-collapse2 " id="navbarSupportedContent">
                            <ul className="navbar-nav d-flex justify-content-end">
                                <li className="nav-item">
                                    <a className="nav-link" to="#" data-toggle="collapse"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">Inicio </a>

                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" to="#" data-toggle="collapse"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">Productos</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Burger's
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" to="#" data-toggle="collapse"
                                        aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">Papas y salsas</a>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Bebidas
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        {user.logueado ? (nombre) : ('Cuentas')}
                                    </a>
                                </li>
                            </ul>
                            <div className="cart-icon2 ml-4 my-2 my-lg-0">
                                0<i className="fas fa-shopping-cart" ></i>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )

    } else {
        return (
            <div className='row row-header'>
                <div className='container'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        {dataConfig.mostrarLogo ? (
                            <Link className="navbar-brand" to="/" ><img className='imgLogo' src={dataConfig.logo.img} title="logo" /></Link>
                        ) : (<Link className="navbar-brand" to="/">{dataConfig.titulo}</Link>)}
                        <div className="cart-icon-movil ml-4 my-2 my-lg-0">
                            {cantCart}<i className="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
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
                                <li className="nav-item">
                                    {widthImg > 992 ? (
                                        <Link className="nav-link" to="/" data-toggle="collapse"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Inicio </Link>
                                    ) : (
                                        <Link className="nav-link" to="/" data-toggle="collapse"
                                            data-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Inicio </Link>
                                    )}
                                </li>
                                <li className="nav-item">
                                    {widthImg > 992 ? (
                                        <Link className="nav-link" to="/productos" data-toggle="collapse"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Productos</Link>
                                    ) : (
                                        <Link className="nav-link" to="/productos" data-toggle="collapse"
                                            data-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Productos</Link>
                                    )}
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Burger's
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {loading ? (
                                            menuCategorie.filter(categories => categories.nombre === 'Burger').map(categorie => (
                                                widthImg > 992 ? (
                                                    <Link key={categorie._id} className="dropdown-item" to={`/productos/burger/${categorie.categoria}`} data-toggle="collapse"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">{categorie.categoria}</Link>
                                                ) : (
                                                    <Link key={categorie._id} className="dropdown-item" to={`/productos/burger/${categorie.categoria}`} data-toggle="collapse"
                                                        data-target="#navbarSupportedContent"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">{categorie.categoria}</Link>
                                                )
                                            ))
                                        ) : (null)}
                                        <div className="dropdown-divider"></div>
                                        {widthImg > 992 ? (
                                            <Link className="dropdown-item" to="/productos/burger" data-toggle="collapse"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Ver todas</Link>
                                        ) : (
                                            <Link className="dropdown-item" to="/productos/burger" data-toggle="collapse"
                                                data-target="#navbarSupportedContent"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Ver todas</Link>
                                        )}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    {widthImg > 992 ? (
                                        <Link className="nav-link" to="/productos/papas y salsas" data-toggle="collapse"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Papas y salsas</Link>
                                    ) : (
                                        <Link className="nav-link" to="/productos/papas y salsas" data-toggle="collapse"
                                            data-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">Papas y salsas</Link>
                                    )}
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Bebidas
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {loading ? (
                                            menuCategorie.filter(categories => categories.nombre === 'Bebidas').map(categorie => (
                                                widthImg > 992 ? (
                                                    <Link key={categorie._id} className="dropdown-item" to={`/productos/bebidas/${categorie.categoria}`} data-toggle="collapse"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">{categorie.categoria}</Link>
                                                ) : (
                                                    <Link key={categorie._id} className="dropdown-item" to={`/productos/bebidas/${categorie.categoria}`} data-toggle="collapse"
                                                        data-target="#navbarSupportedContent"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">{categorie.categoria}</Link>
                                                )
                                            ))
                                        ) : (null)}
                                        <div className="dropdown-divider"></div>
                                        {widthImg > 992 ? (
                                            <Link className="dropdown-item" to="/productos/bebidas" data-toggle="collapse"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Ver todas</Link>
                                        ) : (
                                            <Link className="dropdown-item" to="/productos/bebidas" data-toggle="collapse"
                                                data-target="#navbarSupportedContent"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Ver todas</Link>
                                        )}
                                    </div>

                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.logueado ? (nombre) : ('Cuentas')}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {user.logueado ? (
                                            widthImg > 992 ? (
                                                <Link className="dropdown-item" to="/micuenta/datos-personales" data-toggle="collapse"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">
                                                    Mi perfil
                                                </Link>
                                            ) : (
                                                <Link className="dropdown-item" to="/micuenta/datos-personales" data-toggle="collapse"
                                                    data-target="#navbarSupportedContent"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">
                                                    Mi perfil
                                                </Link>
                                            )
                                        ) : (
                                            widthImg > 992 ? (
                                                <Link className="dropdown-item" to="/ingresar" data-toggle="collapse"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">Ingresar</Link>
                                            ) : (
                                                <Link className="dropdown-item" to="/ingresar" data-toggle="collapse"
                                                    data-target="#navbarSupportedContent"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">Ingresar</Link>
                                            )

                                        )}
                                        {user.logueado ? (user.rol[0].name === "admin" ? null : (
                                            widthImg > 992 ? (
                                                <Link className="dropdown-item" to="/micarrito" data-toggle="collapse"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">Carrito</Link>
                                            ) : (
                                                <Link className="dropdown-item" to="/micarrito" data-toggle="collapse"
                                                    data-target="#navbarSupportedContent"
                                                    aria-controls="navbarSupportedContent"
                                                    aria-expanded="false" aria-label="Toggle navigation">Carrito</Link>
                                            )
                                        )) : (widthImg > 922 ? (
                                            <Link className="dropdown-item" to="/micarrito" data-toggle="collapse"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Carrito</Link>
                                        ) : (
                                            <Link className="dropdown-item" to="/micarrito" data-toggle="collapse"
                                                data-target="#navbarSupportedContent"
                                                aria-controls="navbarSupportedContent"
                                                aria-expanded="false" aria-label="Toggle navigation">Carrito</Link>
                                        ))}
                                        {user.logueado ?
                                            (
                                                widthImg > 992 ? (
                                                    <Link className="dropdown-item" to="/" onClick={handleLogout} data-toggle="collapse"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">Cerrar sesión</Link>
                                                ) : (
                                                    <Link className="dropdown-item" to="/" onClick={handleLogout} data-toggle="collapse"
                                                        data-target="#navbarSupportedContent"
                                                        aria-controls="navbarSupportedContent"
                                                        aria-expanded="false" aria-label="Toggle navigation">Cerrar sesión</Link>
                                                )
                                            )
                                            :
                                            (null)
                                        }
                                    </div>
                                </li>
                            </ul>
                            <div className="cart-icon ml-4 my-2 my-lg-0">
                                {cantCart}<i className="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
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
}

