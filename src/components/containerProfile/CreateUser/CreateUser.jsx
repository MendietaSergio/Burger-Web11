import React from 'react'
import { Register } from '../../Register/Register'

export const CreateUser = ({ viewNewUser, admin, setNewRegister }) => {

  if (viewNewUser) {
    return (
      <Register
        setNewRegister={setNewRegister}
        title={'Registrar empleado'}
        admin={admin}
      />
    )
  } else {
    return null
  }
}
