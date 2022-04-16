import React from 'react'

export const Card = ({product}) => {
    const {nombre, precio, nombre_categoria, img_art } = product
    return (
        <div className='container-featuredProduct my-3'>
            <div className='container-img-featuredProduct'>
                <img className='img-featuredProduct' src={img_art} alt="Burger" height='255' />
                <div className='container-img-detail'>
                    <h5 className='viewDetail'>Ver Detalle</h5>
                </div>
            </div>
            <div className='container-info'>
                <span className='title-categorie'>{nombre_categoria.categoria}</span>
                <div className='container-info-name'>
                <h5 className='text-center'>{nombre}</h5>
                </div>
                <span className='price'>${precio},00</span>
                <div className='btn-link'>
                    <a className='optionsLink' href="#">Pedime Ahora <i className="fas fa-angle-right"></i></a>
                </div>
            </div>
        </div>
    )
}
