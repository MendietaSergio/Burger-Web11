import React from 'react'
import './SkeletonCard.css'
export const SkeletonCard = ({
  loading,
  skeletonImg = false,
  product = false,
  skeletonDetail = false,
  className = "image",
  viewDescription = false
}) => {
  if (skeletonImg) {
    return (

      <div className='card loading margin my-1'>
        <div className={className}>

        </div>
      </div>
    )
  }
  if (skeletonDetail) {
    const cant = []
    for (let i = 1; i <= 5; i++) {
      cant.push(i)
    }
    return (
      <div className='card loading margin my-1'>
        <div className="content">
          {viewDescription ? (
            <>
              <h4></h4>
            </>
          ) : (
            <>
              <h1></h1>
              <h4></h4>
              <div className="price">

              </div>
            </>

          )
          }
          {
            cant.map(list => (
              <div className="list">

              </div>
            ))
          }
        </div >
      </div >
    )
  }
  if (product) {
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

}
