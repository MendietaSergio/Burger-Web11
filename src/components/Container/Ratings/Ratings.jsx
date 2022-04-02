import React from 'react'

export const Ratings = ({ setShowLine, showLine }) => {
  return (
    <div className="col-12">
      <h4>Valoraciones</h4>
      <small>No hay valoraciones</small>
      <div className='detail-warning'>
        <h5>Sé el primero en valorar "Burger ELYSÉE"</h5>
        <span>Debes <a href='/login'>acceder</a> para publicar una reseña</span>
      </div>
    </div>
  )
}
