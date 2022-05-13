import React from 'react'

export const CreateUser = ({ viewNewUser }) => {

  if (viewNewUser) {
    return (
      <div>CreateUser</div>
    )
  }else{
    return null
  }
}
