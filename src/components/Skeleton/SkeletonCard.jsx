import React from 'react'
import './SkeletonCard.css'
export const SkeletonCard = ({ loading }) => {
  const cant = []

  for (let i = 1; i <= 6; i++) {
    cant.push(i)
  }

  return (
    <>
      {cant.map((card, index) => (
        <div className="col-12 col-md-4 col-lg-3 my-2" key={index}>
          <div className='card loading'>
            <div className='image'>

            </div>
            <div className="content">
              <h4></h4>
              <div className="details">

              </div>
            </div>
          </div>
        </div>
      ))
      }
    </>
  )
}
