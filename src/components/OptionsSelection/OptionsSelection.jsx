import React from 'react'
import { Link } from 'react-router-dom'
import './OptionsSelection.css'
export const OptionsSelection = () => {
    return (
        <div className='row-optionsSelection'>
            <div className='container'>
                <div className='row '>
                    <div className="col-12 col-md-4">
                        <div className='container-optionSelection my-3'>
                            <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/burgers_option_jlzycs.jpg" alt="Burger" />
                            <div className='container-titleOptions'>
                                <h1 className='titleOptions'>Las mejores burgers</h1>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/burger">Ver más <i className="fas fa-hamburger"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className='container-optionSelection my-3'>
                            <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526368/burger_web/papas_option_hcjilg.jpg" alt="Papas" />
                            <div className='container-titleOptions'>
                                <h1 className='titleOptions'>acompaña tus papas con tu salsa favorita</h1>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/papasysalsas">Ver más <i className="fas fa-utensils"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className='container-optionSelection my-3'>
                            <img className='img-optionsSelection' src="https://res.cloudinary.com/freelance01/image/upload/v1648526370/burger_web/Agua-saborizada_option_fgxkt0.png" alt="Bebida" />
                            <div className='container-titleOptions'>
                                <h1 className='titleOptions'>bebidas para acompañar</h1>
                                <div className='container-optionsLink'>
                                    <Link className='optionsLink' to="/productos/bebidas">Ver más <i className="fas fa-glass-whiskey"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
