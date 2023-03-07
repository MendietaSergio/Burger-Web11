import React from 'react'
import { Link } from 'react-router-dom'
import './OptionsSelection.css'
export const OptionsSelection = () => {
    return (
        <div className='row-optionsSelection'>
            <div className='container'>
                <div className='row '>
                    <div className="col-12 container-optionsSelection">
                        <div className='container-optionSelection my-3'>
                            <Link to="/productos/burger">

                                <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                            </Link>
                            <div className='container-titleOptions'>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/burger">Ver más <i className="fas fa-hamburger"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className='container-optionSelection my-3'>
                            <Link to="/productos/papas%20y%20salsas">
                                <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/papas_option_hcjilg.jpg" alt="Papas" />
                            </Link>
                            <div className='container-titleOptions'>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/papas%20y%20salsas">Ver más <i className="fas fa-utensils"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className='container-optionSelection my-3'>
                            <Link to="/productos/bebidas">
                                <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526370/burger_web/Agua-saborizada_option_fgxkt0.png" alt="Bebida" />
                            </Link>
                            <div className='container-titleOptions'>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/bebidas">Ver más <i className="fas fa-glass-whiskey"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}
