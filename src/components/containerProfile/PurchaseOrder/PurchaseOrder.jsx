import React, { useState } from 'react'

export const PurchaseOrder = ({ estados, viewOrder }) => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  if (estados[1].option) {
    return (
      <>
        {orderList !== undefined ? (
          <div className='d-flex justify-content-center my-5'>
            <h4 className='text-center'>No se encontró alguna orden de compra</h4>
          </div>
        ) : (<span>false</span>)}
      </>
    )
  } else {
    return null
  }
}
