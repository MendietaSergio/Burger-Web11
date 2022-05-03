import React,{useState} from 'react'

export const PurchaseHistory = ({ viewHistory }) => {
  const [orderList, setOrderList] = useState({ id: "asd" })

  if (viewHistory) {

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
