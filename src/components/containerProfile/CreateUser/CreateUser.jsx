import React from 'react'
import { useParams } from 'react-router-dom'
import { Register } from '../../Register/Register'

export const CreateUser = ({ estados, viewNewUser, admin, setNewRegister }) => {

  return (
    <Register
      setNewRegister={setNewRegister}
      title={'Registrar empleado'}
      admin={admin}
    />
  )
}
