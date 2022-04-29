import React from 'react'

export const Message = ({message,setViewMessage,viewMessage}) => {

  return (
    <div className={`alert alert-danger d-flex justify-content-between`}>
        <strong>mensaje {message}</strong>
        <button type='buttton' onClick={() =>setViewMessage(false)}>x</button>
    </div>
  )
}
