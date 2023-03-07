import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Auth/AuthContext'
import starNone from '../../../Img/star.png'
import starFull from '../../../Img/starFull.png'
export const Ratings = ({ productDetail }) => {
  const [ratings, setRatings] = useState({})
  const { user, dispatch } = useContext(AuthContext)
  const [cantStar, setCantStar] = useState(-1)
  const handleStar = (index) => {
    if (index == cantStar) {
      setCantStar(-1)
    } else {
      setCantStar(index)
    }
  }

  return (
    <div className="col-12">
      {ratings.user === undefined ? (
        <>
          <div>
            <small>No hay valoraciones. Sé el primero en valorar {productDetail.nombre}</small>
          </div>
        </>
      ) : (
        <>
          <div className='box-comments my-3'>
            <span>"Muy ricas las Burgers y buena la atención en el local."</span>
            <span className='text-left'>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
            <div className='box-img'>
              <img className='float-left' src="https://parisburger.com.ar/wp-content/uploads/2021/07/client02-free-img.jpg" alt="foto perfil" />
              <span>Daiana Benencia</span>
            </div>
          </div>
        </>
      )}
      {user.logueado ? (
        <>
          {[... new Array(5)].map((star, index) => {
            return index <= cantStar ? (
              <img className='imgStar' src={starFull} title="starFull" width={'20px'} height={'20px'} onClick={() => handleStar(index)} />
            ) : (
              <img className='imgStar' src={starNone} width="20px" height={'20px'} onClick={() => handleStar(index)} />
            )
          })}
          <div className="col-12 col-md-12">
            <label name="descripcion">Describa:</label>
            <textarea
              name="descripcion"
              className={"form-control"}
              type="text"
              maxLength="500"
              minLength="20"
              placeholder="Deje detalles del producto..."
            />
          </div>
        </>) : (
        <div className='detail-raings-login'>
          <span className='text-center'>Debes <Link to={'/ingresar'}>acceder</Link> para publicar una reseña</span>
        </div>
      )}
    </div >
  )
}
