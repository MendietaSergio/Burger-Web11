import React from 'react'
import './ItemDetail.css'
import { Navigation } from '../../Navigation/Navigation'
import { Title } from '../../Title/Title'
export const ItemDetail = () => {
    return (
        <div className='my-5'>
            <div className='row'>

                <div className="col-12 col-md-6">
                    <img className='img-detail' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" title="producto" />
                </div>
                <div className="col-12 col-md-6">
                    <div className='detail-info'>

                        <Navigation />
                        <h5 className=''>Burger WHOPBURGER</h5>
                        <span className='price'>$890,00</span>
                        <div className='detail-list'>
                            <ul>
                                <li>mac cheese</li>
                                <li>panceta</li>
                                <li>salsa bbq</li>
                                <li>200g de carne</li>
                                <li>deep fried</li>
                            </ul>
                        </div>
                        <span className='detail-categorie'>papas rusticas caseras incluidas</span>
                        <div className='d-flex justify-content-center'>
                            <input type="number" className='form-control' />
                            <div className='btn-link'>
                                <a className='optionsLink' href="#">Pedime Ahora <i className="fas fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <span>Categoría: <span className='detail-subItem'>Sin Alcohol</span></span>
                </div>
            </div>
        </div>
    )
}
