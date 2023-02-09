import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const PurchaseHistory = ({ estados, viewHistory }) => {
  const [orderList, setOrderList] = useState({ id: "asd" })
  const { history } = useParams()
  if (history) {

    return (
      <div>
        {orderList !== undefined ? (
          <div className='d-flex justify-content-center'>
            <h4 className='text-ce nter'>No se encontró historial</h4>
          </div>
        ) : (<span>false</span>)}
      </div>
    )
  } else {
    return null
  }
}
