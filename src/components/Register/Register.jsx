import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'
import { types } from '../../Types/Types'
import { validations } from '../../utils/ValidationsRegister'
import { Message } from '../Message/Message'
import { Title } from '../Title/Title'
import './Register.css'

export const Register = () => {
  const {dispatch} = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [viewMessage, setViewMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const submit = async (data) => {
    setViewMessage(false)
    setMessage('')
    const { nombre, usuario, email, password } = data;
    await axios.post('http://localhost:3001/api/auth/signup', {
      nombre,
      usuario,
      email,
      password
    })
      .then(res => {
        setLoading(!loading)
        if (res.data.ok) {
          // localStorage.setItem('userBurger', JSON.stringify(res.data.logeado, null))
          handleLogin(res.data.logeado)
          setTimeout(() => {
            setSucces(true)
            setLoading(false)
          }, 2000)

        } else {
          setLoading(!loading)
          setMessage(res.data.message)
          setTimeout(() => {
            setViewMessage(true)
            setLoading(false)
          }, 2000)
        }
      })
  }
  const handleLogin = (data) => {
    dispatch({
      type: types.login,
      payload: {
        ...data
      }
    })
  }
  return (
    <>
      {succes && <Navigate to="/micuenta" />}
      <div className="container-form">
        <div className="container-form-body">
          <Title title={"Registro"} bar={false} />
          {viewMessage ?
            (<Message message={message} viewMessage={viewMessage} setViewMessage={setViewMessage} />) : (null)
          }
        </div>
        <form onSubmit={handleSubmit(submit)} className="form-login">
          <div className='row'>
            <div className='col-12  col-md-6'>
              <label name="nombre">Nombre completo <small>*</small> </label>
              <input name="nombre" className={errors.nombre ? ("form-control is-invalid") : ("form-control")} type="text" {...register('nombre', validations.nombre)} />
              {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
            </div>
            <div className='col-12  col-md-6'>
              <label name="usuario">Usuario <small>*</small> </label>
              <input name="usuario" className={errors.usuario ? ("form-control is-invalid") : ("form-control")} type="text" {...register('usuario', validations.usuario)} />
              {errors.usuario ? <small className='text-danger'>{errors.usuario.message}</small> : null}
            </div>
            <div className='col-12'>
              <label name="email">Email <small>*</small> </label>
              <input name="email" className={errors.email ? ("form-control is-invalid") : ("form-control")} type="email" {...register('email', validations.email)} />
              {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <label name="password">Contraseña <small>*</small></label>
              <input name="password" className={errors.password ? ("form-control is-invalid") : ("form-control")} type="password" {...register('password', validations.password)} />
              {errors.password ? <small className='text-danger'>{errors.password.message}</small> : null}
            </div>
          </div>
          <div className='d-flex justify-content-start align-items-baseline'>
            <input name="rememberMe" type="checkbox" />
            <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Acepto termino y condiciones</label>
          </div>
          <div className='d-flex flex-row justify-content-around'>
            <div>
              <button type='submit' className='btn-toRegister' >Registarme
                {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
              </button>
            </div>
            <div>
              <button type='submit' className='btn-toCancel' >Cancelar</button>
            </div>
          </div>
          <div>
            <small >¿Tenes una cuenta? <Link className='info-register' to='/ingresar'>¡Logeate!</Link></small>
          </div>
        </form>
      </div>
    </>
  )
}
