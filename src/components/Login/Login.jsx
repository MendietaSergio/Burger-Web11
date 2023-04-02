import React, { useState, useContext } from 'react'
import { Title } from '../Title/Title'
import { useForm } from 'react-hook-form'
import './Login.css'
import { validations } from '../../utils/ValidationsLogin'
import { Link, Navigate } from 'react-router-dom'
import { Message } from '../Message/Message'
import { AuthContext } from '../../Auth/AuthContext'
import { ChangePassword } from '../ChangePassword/ChangePassword'
import { useLogin } from '../../hooks/useLogin'

export const Login = () => {
    const { dispatch } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [viewChangePass, setViewChangePass] = useState(false)
    const {
        sendLogin,
        success,
        loading,
        setLoading,
        changeClassName,
        viewMessage,
        setViewMessage,
        message,
    } = useLogin()
    const submit = async (data) => {
        sendLogin({ data, dispatch })
        setLoading(true)
    }
    return (
        <>
            {success && <Navigate to='/' />}
            <div className="container-message-login">
                {viewMessage ?
                    (<Message
                        message={message}
                        viewMessage={viewMessage}
                        setViewMessage={setViewMessage}
                        className={changeClassName ? 'alert-success' : 'alert-danger'}
                    />) : (null)
                }
            </div>
            <div className='container-form'>
                <div className='container-form-body'>
                    <Title title="Mi cuenta" bar={false} />
                    {viewChangePass ? (
                        <ChangePassword
                            setViewChangePass={setViewChangePass}
                        />
                    ) : (
                        <>
                            <div className='form-subTitle'>
                                <h5 className=''>Acceder</h5>
                            </div>
                            <form onSubmit={handleSubmit(submit)} className="form-login">
                                <div>
                                    <label name="email">Nombre de usuario o correo electrónico <small>*</small> </label>
                                    <input {...register('email', validations.email)} className={errors.email ? ("form-control is-invalid") : ("form-control")} type="text" />
                                    {errors.email ? <small className='text-danger'>{errors.email.message}</small> : null}
                                </div>
                                <div>
                                    <label name="password">Contraseña <small>*</small></label>
                                    <input {...register('password', validations.password)} className={errors.password ? ("form-control is-invalid") : ("form-control")} type="password" />
                                    {errors.password ? <small className='text-danger'>{errors.password.message}</small> : null}
                                </div>
                                {/* <div className='d-flex justify-content-start align-items-baseline'>
                                    <input name="rememberMe" type="checkbox" />
                                    <label htmlFor='rememberMe' name="rememberMe" className='px-2'>Recuérdame</label>
                                </div> */}
                                <div className='my-4'>
                                    <button type='submit' className='btn-toAccess' >Acceder
                                        {loading ? (<i className="fas fa-spinner fa-pulse"></i>) : null}
                                    </button>
                                </div>
                                <div>
                                    <a className='info-password' onClick={() => setViewChangePass(true)} >¿Olvidaste tu contraseña?</a>
                                </div>
                                <div>
                                    <small >¿Sos nuevo? <Link className='info-register' to='/registrarse' >¡Registrate!</Link></small>
                                </div>
                            </form>
                        </>
                    )}
                </div >
            </div >
        </>
    )
}
