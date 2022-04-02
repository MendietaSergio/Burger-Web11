import React, { useState } from 'react'
import { ItemDetail } from '../components/Container/ItemDetail/ItemDetail'
import { RelatedProducts } from '../components/Container/RelatedProducts/RelatedProducts'
export const Detail = () => {
  const [showLine, setShowLine] = useState(true)
  return (
    <div className='container'>
      <div className='container-detail'>
        <div className="row">
          <ItemDetail />
        </div>
        <div className='row'>
          <hr />
          <div className="col-12 container-options">
            <div className='container-options-detail' onClick={() => setShowLine(true)}>
              <h6 className='view-options' >Descripción</h6>
              <span className={showLine ? 'active-line-red' : null}></span>
            </div>
            <div className='container-options-detail' onClick={() => setShowLine(false)}>
              <h6 className='view-options'>Valoraciones</h6>
              <span className={showLine ? null : 'active-line-red'} ></span>
            </div>
          </div>
        </div>
        <div className="row">
          {showLine ? (
            <div className="col-12">
              <span className='detail-categorie'>papas rusticas caseras incluidas</span>
              <div className='detail-list'>
                <ul>
                  <li>mac cheese</li>
                  <li>panceta</li>
                  <li>salsa bbq</li>
                  <li>200g de carne</li>
                  <li>deep fried</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="col-12">
              <h4>Valoraciones</h4>
              <small>No hay valoraciones</small>
              <div className='detail-warning'>
                <h5>Sé el primero en valorar "Burger ELYSÉE"</h5>
                <span>Debes <a href='/login'>acceder</a> para publicar una reseña</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <RelatedProducts/>
      </div>
    </div>
  )
}
