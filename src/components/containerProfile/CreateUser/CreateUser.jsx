import React from 'react'
import { Register } from '../../Register/Register'

export const CreateUser = ({ viewNewUser,admin }) => {

  if (viewNewUser) {
    return (
      <Register
        title='Registrar empleado'
        admin={admin}
        />
    )
  }else{
    return null
  }
}
