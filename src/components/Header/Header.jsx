import React, { useState } from 'react'
import { CartModal } from '../Cart/CartModal/CartModal'
import './Header.css'
export const Header = () => {
    const [showCartList, setShowCartList] = useState(false)

    return (
        <div className='row row-header'>
            <div className='container'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">Burger</a>

                    <div className="cart-icon-movil ml-4 my-2 my-lg-0">
                        0<i class="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
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
                                <a className="nav-link" href="/#">Inicio <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Productos</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Burger's
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Queso Cheddar</a>
                                    <a className="dropdown-item" href="#">Queso Francés</a>
                                    <a className="dropdown-item" href="#">New York</a>
                                    <a className="dropdown-item" href="#">Veggie</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Ver todas</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Papas y salsas</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#">Bebidas</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Cuenta
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Mi cuenta</a>
                                    <a className="dropdown-item" href="#">Carrito</a>
                                </div>
                            </li>
                        </ul>
                        <div className="cart-icon ml-4 my-2 my-lg-0">
                            0<i class="fas fa-shopping-cart" onClick={() => setShowCartList(!showCartList)}></i>
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
