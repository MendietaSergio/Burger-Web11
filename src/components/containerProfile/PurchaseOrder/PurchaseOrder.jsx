import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const PurchaseOrder = ({ estados, viewOrder }) => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  return (
    <>
      {orderList !== undefined ? (
        <div className='d-flex justify-content-center my-5'>
          <h4 className='text-center'>No se encontró alguna orden de compra</h4>
        </div>
      ) : (<span>false</span>)}
    </>
  )
}
