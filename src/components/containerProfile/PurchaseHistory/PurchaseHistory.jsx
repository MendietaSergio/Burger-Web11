import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const PurchaseHistory = () => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  return (
    <>
      {orderList !== undefined ? (
        <div className='d-flex justify-content-center container-purchase'>
          <h4 className='text-center'>No se encontró historial</h4>
        </div>
      ) : (<span>false</span>)}
    </>
  )

}
