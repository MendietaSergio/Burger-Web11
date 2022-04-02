import React, { useState } from 'react'
import { Description } from '../components/Container/Description/Description'
import { ItemDetail } from '../components/Container/ItemDetail/ItemDetail'
import { Ratings } from '../components/Container/Ratings/Ratings'
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
            <Description />
          ) : (
            <Ratings />
          )}
        </div>
      </div>
      <div className="row">
        <RelatedProducts/>
      </div>
    </div>
  )
}
