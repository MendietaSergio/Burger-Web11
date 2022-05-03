import React, { useState } from 'react'

export const PurchaseOrder = ({ viewOrder }) => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  if (viewOrder) {
    return (
      <div>
        {orderList !== undefined ? (
          <div className='d-flex justify-content-center'>
            <h4 className='text-ce nter'>No se encontró alguna orden de compra</h4>
          </div>
        ) : (<span>false</span>)}
      </div>
    )
  }else{
    return null
}
}
