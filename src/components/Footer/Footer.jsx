import React from 'react'
import './Footer.css'
export const Footer = () => {
    return (
        <footer className='container-fluid'>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className='text-center my-4'>Burgers</h1>
                        <ul className='social-list list-inline mb-0'>
                            <li className='list-inline-item'>
                                <a
                                    href="https://www.instagram.com/"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className='icon-social'
                                >
                                    <i className="fab fa-instagram" height='50px'></i>
                                </a>
                            </li>
                            <li className='list-inline-item'>
                                <a
                                    href="https://www.facebook.com/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className='icon-social'
                                >
                                    <i class="fab fa-facebook" height='50px'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-12'>
                        <h5 className='my-3'>Enlaces rápidos</h5>
                        <ul className='social-list list-inline mb-0'>
                            <li className='list-block-item py-1'>
                                Todos los productos
                            </li>
                            <li className='list-block-item py-1'>
                                Carrito
                            </li>
                            <li className='list-block-item py-1'>
                                Términos y condiciones
                            </li>
                            <li className='list-block-item py-1'>
                                Llámanos
                            </li>
                        </ul>
                    </div>
                    <div className="col-12">
                        <h5 className='my-3'>Horarios de atención</h5>
                        <ul className='social-list list-inline mb-0'>
                            <li className='list-block-item py-1'>
                                Retiro en local y Delivery
                            </li>
                            <li className='list-block-item py-1'>
                                Martes a Domingos de 19 a 23:30hs
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='info-container my-2'>
                        <small>Copyright © 2022</small>
                        <a className="footer-a"
                            href="http://linkedin.com/in/mendietasergio" target="_blank"
                            rel="noopener noreferrer">Mendieta Sergio</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
