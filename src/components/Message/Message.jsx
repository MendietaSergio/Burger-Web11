import React from 'react'

export const Message = ({message,setViewMessage,viewMessage}) => {

  return (
    <div className={`alert alert-danger`}>
        <button type='buttton' onClick={() =>setViewMessage(false)}>x</button>
        <strong>mensaje {message}</strong>
    </div>
  )
}
