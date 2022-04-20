import React from 'react'
import { Title } from '../Title/Title'
import './Register.css'
export const Register = ({ setViewRegister }) => {
  return (
    <div className="container-form">
      <div className="container-form-body">
        <Title title={"Registro"} bar={false} />
      </div>
      <form action="" className="form-login">
        <div>
          <label name="nombre">Nombre <small>*</small> </label>
          <input name="nombre" className="form-control" type="text" />
        </div>
        <div>
          <label name="apellido">Apellido <small>*</small> </label>
          <input name="apellido" className="form-control" type="text" />
        </div>
        <div>
          <label name="password">Contraseña <small>*</small></label>
          <input name="password" className="form-control" type="text" />
        </div>
        <div>
          <label name="password2">Repita Contraseña <small>*</small></label>
          <input name="password2" className="form-control" type="text" />
        </div>
        <div className='d-flex justify-content-start align-items-baseline'>
          <input name="rememberMe" type="checkbox" />
          <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Acepto termino y condiciones</label>
        </div>
        <div className='d-flex flex-row justify-content-around'>
          <div>
            <button type='submit' className='btn-toRegister' >Registarme</button>
          </div>
          <div>
            <button type='submit' className='btn-toCancel' >Cancelar</button>
          </div>
        </div>
        <div>
          <small >¿Tenes una cuenta? <span className='info-register' onClick={() => setViewRegister(true)} >¡Logeate!</span></small>
        </div>
      </form>
    </div>
  )
}
