import React from 'react'

export const ItemListProducts = () => {
    return (
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
    )
}
