import React from 'react'
import { Register } from '../../Register/Register'

export const CreateUser = ({ estados, viewNewUser, admin, setNewRegister }) => {

  if (estados[3].option) {
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
