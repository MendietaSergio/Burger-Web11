import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { AuthContext } from '../../Auth/AuthContext'
import { useRegister } from '../../hooks/useRegister'
import { validations } from '../../utils/ValidationsRegister'
import { Message } from '../Message/Message'
import { Title } from '../Title/Title'
import './Register.css'

export const Register = ({ title = "Registrarse", admin = false, setNewRegister }) => {
  const { dispatch } = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const {
    sendNewUser,
    message,
    setMessage,
    viewMessage,
    setViewMessage,
    loading,
    success,
    changeClassName,
  } = useRegister()
  const submit = async (data) => {
    setViewMessage(false)
    setMessage('')
    if (admin) data.admin = admin
    sendNewUser({ admin, data, dispatch, setNewRegister, reset })
  }
  return (
    <>
      {admin ? (null) : (
        success && <Navigate to="/micuenta/datos-personales" />
      )}
      <div className="container-form">
        <div className="container-form-body">
          <Title title={title} bar={false} />
          {viewMessage ?
            (<Message
              message={message}
              viewMessage={viewMessage}
              setViewMessage={setViewMessage}
              className={`container-message-register ${changeClassName ? 'alert-success' : 'alert-danger'}`} />) : (null)
          }
        </div>
        <form onSubmit={handleSubmit(submit)} className="form-login">
          <div className='row'>
            <div className='col-12  col-md-6'>
              <label name="nombre">Nombre completo <small>*</small> </label>
              <input name="nombre" className={errors.nombre ? ("form-control is-invalid") : ("form-control")} type="text" {...register('nombre', validations.nombre)} />
              <div className={`container-errors`}>
                {errors.nombre ? <small className='text-danger'>{errors.nombre.message}</small> : null}
              </div>
            </div>
            <div className='col-12  col-md-6'>
              <label name="usuario">Usuario <small>*</small> </label>
              <input name="usuario" className={errors.usuario ? ("form-control is-invalid") : ("form-control")} type="text" {...register('usuario', validations.usuario)} />
              <div className={`container-errors`}>
                {errors.usuario ? <small className='text-danger'>{errors.usuario.message}</small> : null}
              </div>
            </div>
            <div className='col-12'>
              <label name="email">Email <small>*</small> </label>
              <input name="email" className={errors.email ? ("form-control is-invalid") : ("form-control")} type="email" {...register('email', validations.email)} />
              <div className={`container-errors`}>
                {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <label name="password">Contraseña <small>*</small></label>
              <input name="password" className={errors.password ? ("form-control is-invalid") : ("form-control")} type="password" {...register('password', validations.password)} />
              <div className={`container-errors`}>
                {errors.password ? <small className='text-danger'>{errors.password.message}</small> : null}
              </div>
            </div>
            {admin ? (
              <div className='col-12 col-md-6 mb-5'>
                <label name="roles">Rol <small>*</small></label>
                <select name="roles" className={errors.roles ? ('form-select form-control is-invalid') : ('form-select form-control')}
                  {...register('roles', validations.roles)}
                >
                  <option value="" >Seleccione el rol</option>
                  <option value="admin" >Admin</option>
                  <option value="user">Usuario</option>
                </select>
                <div className={`container-errors`}>
                  {errors.roles ? <small className='text-danger'>{errors.roles.message}</small> : null}
                </div>
              </div>
            ) : null}
          </div>
          {admin ? null : (
            <div className='d-flex justify-content-start align-items-baseline'>
              <input
                name="rememberMe"
                type="checkbox"
                className={errors.rememberMe ? ("is-invalid") : ("is-valid")}
                {...register('rememberMe', validations.rememberMe)} />
              <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Acepto termino y condiciones</label>
              <div className={`container-errors`}>
                {errors.rememberMe ? <small className='text-danger'>{errors.rememberMe.message}</small> : null}
              </div>
            </div>
          )}
          <div className='d-flex flex-row justify-content-around'>
            <div>
              <button type='submit' className='btn-toRegister' >{title}
                {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
              </button>
            </div>
            <div>
              {admin ? (
                <a className='btn-toCancel btn-toReset' type='submit' onClick={() => reset()} >Reiniciar</a>
              ) : (

                <button type='submit' className='btn-toCancel' ><Link className='link-toCancel' to={"/ingresar"}>
                  Cancelar
                </Link>
                </button>
              )}
            </div>
          </div>
          {admin ? null : (
            <div>
              <small >¿Tenes una cuenta? <Link className='info-register' to='/ingresar'>¡Logeate!</Link></small>
            </div>
          )}
        </form>
        <div className='container_info_register'>
          <div className='d-flex justify-content-center'>
            <span>La contraseña debe complir con la siguiente forma:</span>
            <ul>
              <li>Debe tener mas de 8 caracteres</li>
              <li>Debe contener al menos un numero</li>
              <li>Debe contener al menos un simbolo</li>
              <li>Debe contener al menos un miniscula</li>
              <li>Debe contener al menos una mayuscula</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
