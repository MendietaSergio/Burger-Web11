import React, { useState } from 'react'
export const PurchaseOrder = () => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  return (
    <>
      {orderList !== undefined ? (
        <div className='d-flex justify-content-center container-purchase my-5'>
          <h4 className='text-center'>No se encontró alguna orden de compra</h4>
        </div>
      ) : (<span>false</span>)}
    </>
  )
}
