import React from 'react'
import './Banner.css'
export const Banner = () => {
    return (
        <>
            <div className='container-fluid img-banner'>
                <div className='container'>
                    <div className='col-12 container-banner'>
                        <h4 className='text-banner'>
                            ¿Tenés hambre?
                        </h4>
                        <h1 className='text-banner'>¡Pedi ya tu burger!</h1>
                        <span className='text-banner'>Te la llevamos Rápido</span>
                        <div className='btn-banner'>
                            <a className='linkProducts' href="#">Hacé tu pedido <i className="fas fa-angle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div >

            </div>
        </>
    )
}
