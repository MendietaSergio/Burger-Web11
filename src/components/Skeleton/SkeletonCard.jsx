import React from 'react'
import './SkeletonCard.css'
export const SkeletonCard = ({
  loading,
  skeletonImg = false,
  product = false,
  skeletonDetail = false,
  className = "image",
  viewDescription = false,
  viewListProduct = false,
  viewListClients = false,
  featuredProduct = false,
  viewEnvio = false
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
            cant.map((list, index) => (
              <div key={index} className="list">

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
          <div className="col-6 col-md-3 my-2" key={index}>
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
  if (viewListProduct) {
    const cant = []

    for (let i = 1; i <= 6; i++) {
      cant.push(i)
    }
    return (
      <>
        <div className='mx-auto my-auto container-skeletonList '>
          <ul className='list-group'>
            {cant.map((card, index) => (
              <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" >
                <div className='card loading'>
                  <div className='imageList'>

                  </div>
                  <div className="contentList">
                    <h4></h4>
                    <h4></h4>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </>
    )
  }
  if (viewListClients) {
    const cant = []

    for (let i = 1; i <= 8; i++) {
      cant.push(i)
    }
    return (
      <>
        <div className={`container-listClients w-100 ${loading && 'my-5'}`}>
          <div className='row'>
            <table class="table-striped table-hover ">
              <thead>
                <tr>
                  <th className='columnId' scope="col">#</th>
                  <th className='columnUser' scope="col">Usuario</th>
                  <th className='columnName' scope="col">Nombre</th>
                  <th className='columnOptions' scope="col">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {cant.map((list, index) => (
                  <tr className='contianer-clients skeleton-clients' key={index} >
                    <th className='columnId'> </th>
                    <td className='columnUser'></td>
                    <td className='columnName'></td>
                    <td className='columnName'>
                      <div className='containerIconClients'>
                        <div className='optionIconClient' ></div>
                        <div className='optionIconClient' ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-center my-2">
              <div className=''>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  if (featuredProduct) {
    const cant = []

    for (let i = 1; i <= 6; i++) {
      cant.push(i)
    }

    return (
      <>
        {cant.map((card, index) => (
          <div className="col-6 col-md-3 my-2" key={index}>
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
  if (viewEnvio) {
    return (
      <div className="col-12 my-2">
        <div className='viewEnvio loading'>
          <div className="contentEnvio">
            <div className="detailsEnvio my-2">
            </div>
            <div className="detailsEnvio my-2">
            </div>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      null
    )
  }
  {/* <div className="col-12 container-itemcart-modal">
                            <span>Envío:</span>
                            <span>${data.envio ? data.valorEnvio : 'Sin cargo'}</span>
                        </div>
                        <div className="col-12 container-itemcart-modal">
                            <span>Total:</span>
                            {data.envio ? (
                                <span>${priceTotal + data.valorEnvio}</span>
                            ) : (
                                <span>${priceTotal}, 0</span>
                            )}
                        </div> */}

}
